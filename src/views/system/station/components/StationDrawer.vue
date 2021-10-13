<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { submitStation, getStationDetailById, updateParent } from '/@/api/system/station';
  import { StationInfo } from '/@/api/system/model/stationModel';
  import { propTypes } from '/@/utils/propTypes';
  import { cloneDeep } from 'lodash-es';
  import { recursiveHandle } from '/@/utils/index';

  export default defineComponent({
    components: { BasicDrawer, BasicForm },

    emits: ['success', 'register'],

    props: {
      treeData: propTypes.object.def({}),
    },

    name: 'StationDrawer',

    setup(_, { emit }) {
      const isUpdate = ref(true);

      const isMultipleUpdate = ref(false);

      const getTitle = computed(() =>
        unref(isMultipleUpdate) ? '批量调整' : !unref(isUpdate) ? '新增岗位' : '编辑岗位',
      );

      const detail = ref<StationInfo>({});

      const [registerForm, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: [
          {
            field: 'postName',
            label: '岗位名称',
            required: true,
            component: 'Input',
            show: () => {
              return !isMultipleUpdate.value;
            },
          },
          {
            field: 'parentId',
            label: '上级岗位',
            show: () => {
              return detail.value.parentId != '0';
            },
            component: 'TreeSelect',
            componentProps: {
              showSearch: true,
              dropdownStyle: {
                maxHeight: '60vh',
              },
              treeNodeFilterProp: 'title',
              replaceFields: {
                title: 'postName',
                value: 'id',
                key: 'id',
              },
              getPopupContainer: () => document.body,
            },
          },
          {
            field: 'id',
            label: 'ID',
            component: 'Input',
            show: false,
          },
          {
            field: 'ids',
            label: 'ID',
            component: 'Select',
            show: false,
          },
        ],
        showActionButtonGroup: false,
      });

      const [registerDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
        resetFields();

        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        isMultipleUpdate.value = data.isMultipleUpdate;

        if (data.isMultipleUpdate) {
          detail.value = {
            ids: data.checkedKeys,
          };
        }

        if (data.isUpdate) {
          detail.value = await getStationDetailById({ id: data.activeId });
        }

        if (data.isAppendChild) {
          detail.value = {
            parentId: data.activeId,
          };
        }

        setFieldsValue({
          ...detail.value,
        });

        const treeData = cloneDeep(_.treeData);

        recursiveHandle(treeData, 'children', (item: any) => {
          if (item.id == detail.value.id) {
            Object.assign(item, { disabled: true });
          }
        });

        updateSchema({
          field: 'parentId',
          componentProps: { treeData: treeData },
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (!values.parentId) {
            values.parentId = 0; // 默认添加至根节点
          }
          isMultipleUpdate.value ? await updateParent(values) : await submitStation(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        handleSubmit,
        registerForm,
        getTitle,
      };
    },
  });
</script>
