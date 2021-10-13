<template>
  <BasicDrawer
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
  import { accountFormSchema, isGroup } from '../account.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { submitAccountData, updateAccountData } from '/@/api/system/account';
  import { getStationList } from '/@/api/system/station';

  export default defineComponent({
    name: 'AccountDrawer',

    components: { BasicDrawer, BasicForm },

    emits: ['success', 'register'],

    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const postIds = data.record.postId && data.record.postId.split(',');
          isGroup(data.record.postType)
            ? (data.record.postGroupIds = postIds)
            : (data.record.postIds = postIds);

          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getStationList();
        updateSchema({
          field: 'postIds',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          values.postId = isGroup(values.postType)
            ? values.postGroupIds?.join(',')
            : values.postIds?.join(',');

          if (!unref(isUpdate)) {
            await submitAccountData(values);
          } else {
            await updateAccountData(values);
          }

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
