import { defHttp } from '/@/utils/http/axios';
<<<<<<< HEAD
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  UpdatePasswordParmas,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/blade-auth/token',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  DomainLogin = '/risk-control/adToken', //域登录
  GetCaptcha = '/blade-auth/captcha',
  UpdatePassword = '/blade-user/update-password',
=======
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
}

/**
 * @description: user login api
 */
<<<<<<< HEAD
export function loginApi({ key, code, ...params }: LoginParams, mode: ErrorMessageMode = 'modal') {
=======
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
<<<<<<< HEAD
      headers: {
        'Captcha-Key': key,
        'Captcha-Code': code,
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}
/**
 * @description 域登录
 */
export function domainLoginApi(
  { key, code, ...params }: LoginParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.DomainLogin,
      params,
      headers: {
        'Captcha-Key': key,
        'Captcha-Code': code,
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
    },
    {
      errorMessageMode: mode,
    },
  );
}
<<<<<<< HEAD
=======

>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
<<<<<<< HEAD
/**
 * @description: 获取验证码
 */
export function getCaptchaCode() {
  return defHttp.get<{ key: string; image: string }>({
    url: Api.GetCaptcha,
  });
}
/**
 * @description 修改密码
 */
export function updatePassword(params: UpdatePasswordParmas) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.UpdatePassword,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
}
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
