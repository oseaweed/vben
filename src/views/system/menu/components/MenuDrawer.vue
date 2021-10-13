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
  import { formSchema } from '../menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getMenuList, submitMenuData } from '/@/api/system/menu';

  export default defineComponent({
    name: 'MenuDrawer',

    components: { BasicDrawer, BasicForm },

    emits: ['success', 'register'],

    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          data.record.parentId == '0' && (data.record.parentId = null);
          await setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getMenuList({});
        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();

          setDrawerProps({ confirmLoading: true });

          !values.parentId && (values.parentId = '0');

          await submitMenuData(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
