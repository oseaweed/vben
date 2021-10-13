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
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../pack.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree } from '/@/components/Tree';
  import { updatePackData } from '/@/api/system/pack';
  import { getStationList } from '/@/api/system/station';

  export default defineComponent({
    name: 'RoleDrawer',

    components: { BasicDrawer, BasicForm, BasicTree },

    emits: ['success', 'register'],

    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();

        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          data.record.postIdFiled = data.record.postIds ? data.record.postIds.split(',') : null;
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getStationList();
        updateSchema({
          field: 'postIdFiled',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增岗位组合' : '编辑岗位组合'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          values.postIds = values.postIdFiled?.join(',');

          await updatePackData(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
