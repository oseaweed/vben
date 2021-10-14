<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
<<<<<<< HEAD
    <FormItem name="code" class="relative enter-x enter-code">
      <Input size="large" v-model:value="formData.code" placeholder="请输入验证码" />
      <img
        style="position: absolute; top: 1px; right: 1px; height: 36px"
        :src="captchaInfo.image"
        @click="handleVerificationCode"
      />
    </FormItem>
    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem v-show="showRadioGroup">
          <a-radio-group name="radioGroup" v-model:value="loginType">
            <a-radio value="1">系统登录</a-radio>
            <a-radio value="2">域登陆</a-radio>
          </a-radio-group>
          <!-- No logic, you need to deal with it yourself -->
          <!-- <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox> -->
=======

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
<<<<<<< HEAD
          <!-- <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button> -->
=======
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
<<<<<<< HEAD
    <!-- <ARow class="enter-x">
=======
    <ARow class="enter-x">
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
<<<<<<< HEAD
    </ARow> -->

    <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider> -->
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, toRaw, unref, computed, onMounted } from 'vue';

  import { Form, Input, Row, Col, Button } from 'ant-design-vue';

=======
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';
<<<<<<< HEAD
  import { useGlobSetting } from '/@/hooks/setting';
  const { loginConfig } = useGlobSetting();
  import componentSetting from '/@/settings/componentSetting';
  import { getCaptchaCode } from '/@/api/sys/user';
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
<<<<<<< HEAD
  // const rememberMe = ref(false);
  const captchaInfo = ref({ image: '', key: '' }); // 验证码

  const formData = reactive({
    account: '',
    password: '',
    code: '',
=======
  const rememberMe = ref(false);

  const formData = reactive({
    account: 'vben',
    password: '123456',
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
<<<<<<< HEAD
  const { login } = componentSetting;
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
<<<<<<< HEAD
      const userInfo = await userStore.login(
        toRaw({
          isDomainLogin: loginType.value == '2' || loginConfig == 2, //域登录
          tenantId: login.tenantId,
          type: 'account',
          grantType: 'captcha',
          password: data.password,
          account: data.account,
          key: captchaInfo.value.key, // 验证码key
          code: data.code, // 验证码code
          mode: 'none', //不要默认的错误提示
        }),
      );
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.userName}`,
          duration: 3,
        });
      }
    } catch (error: any) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: error.message || t('sys.api.networkExceptionMsg'),
=======
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
<<<<<<< HEAD

  // 获取验证码
  async function handleVerificationCode() {
    captchaInfo.value = await getCaptchaCode();
  }

  const showRadioGroup = loginConfig == 3;
  console.log(loginConfig);
  const loginType = ref(showRadioGroup ? '2' : '1');
  onMounted(() => {
    handleVerificationCode();
  });
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
</script>
