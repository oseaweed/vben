<<<<<<< HEAD
import type { UserInfo } from '/#/store';

=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
<<<<<<< HEAD
  account: string; // 用户名
  password: string; // 密码
  tenantId: string; // 租户ID
  type: string; // 账户类型
  grantType: string; // 授权类型（social 第三方、captcha 验证码、password 密码）
  // scope     : 'all', // 授权域
  code: string; // 验证码的值（header传值）
  key: string; // 验证码的索引（header传值）
=======
  username: string;
  password: string;
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
<<<<<<< HEAD
export interface LoginResultModel extends UserInfo {
  userId: string | number;
  accessToken: string;
=======
export interface LoginResultModel {
  userId: string | number;
  token: string;
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
<<<<<<< HEAD
  userName: string;
=======
  username: string;
  // 真实名字
  realName: string;
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
<<<<<<< HEAD
export interface UpdatePasswordParmas {
  oldPassword: string;
  newPassword: string;
  newPassword1: string;
}
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
