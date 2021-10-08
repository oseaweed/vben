<template>
  <BasicModal :footer="null" title="修改当前用户密码">
    <div class="py-4 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="registerForm" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { FormSchema } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { updatePassword } from '/@/api/sys/user';
  import { useUserStore } from '/@/store/modules/user';

  const formSchema: FormSchema[] = [
    {
      field: 'oldPassword',
      label: '当前密码',
      component: 'InputPassword',
      required: true,
    },
    {
      field: 'newPassword',
      label: '新密码',
      component: 'StrengthMeter',
      componentProps: {
        placeholder: '新密码',
      },
      rules: [
        {
          required: true,
          message: '请输入新密码',
        },
      ],
    },
    {
      field: 'newPassword1',
      label: '确认密码',
      component: 'InputPassword',
      dynamicRules: ({ values }) => {
        return [
          {
            required: true,
            validator: (_, value) => {
              if (!value) {
                return Promise.reject('不能为空');
              }
              if (value !== values.newPassword) {
                return Promise.reject('两次输入的密码不一致!');
              }
              return Promise.resolve();
            },
          },
        ];
      },
    },
  ];

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, BasicModal },
    setup() {
      const [register, { closeModal }] = useModalInner();

      const [registerForm, { validateFields, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      const userStore = useUserStore();

      async function handleSubmit() {
        try {
          const values = await validateFields();
          await updatePassword(values);
          userStore.logout(true);
          closeModal();
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit, registerForm };
    },
  });
</script>
