import type { UserInfo } from '/#/store';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string; // 用户名
  password: string; // 密码
  tenantId: string; // 租户ID
  type: string; // 账户类型
  grantType: string; // 授权类型（social 第三方、captcha 验证码、password 密码）
  // scope     : 'all', // 授权域
  code: string; // 验证码的值（header传值）
  key: string; // 验证码的索引（header传值）
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel extends UserInfo {
  userId: string | number;
  accessToken: string;
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
  userName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
export interface UpdatePasswordParmas {
  oldPassword: string;
  newPassword: string;
  newPassword1: string;
}
