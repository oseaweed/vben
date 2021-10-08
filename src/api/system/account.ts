import { defHttp } from '/@/utils/http/axios';
import { AccountDataParmas, AccountResult, AccountInfo } from './model/accountModel';

enum Api {
  GetAccountList = '/blade-user/riskList',
  SubmitAccountData = '/blade-user/submitNotEmpty',
  UpdateAccountData = '/blade-user/updateRisk',
  GetAccountDetail = '/blade-user/detail',
  RemoveAccountByIds = '/blade-user/remove',
  ResetPasswordByIds = '/blade-user/reset-password',
}

export const getAccountList = (params: AccountDataParmas) => {
  return defHttp.get<AccountResult[]>({
    url: Api.GetAccountList,
    params,
  });
};

export const submitAccountData = (params: AccountInfo) => {
  return defHttp.post<string>({
    url: Api.SubmitAccountData,
    params,
  });
};

export const updateAccountData = (params: AccountInfo) => {
  return defHttp.post<string>({
    url: Api.UpdateAccountData,
    params,
  });
};

export const getAccountDetail = (params: { id: string }) => {
  return defHttp.get<AccountInfo>({
    url: Api.GetAccountDetail,
    params,
  });
};

export const removeAccountByIds = (params: { ids: string }) => {
  return defHttp.post<string>(
    {
      url: Api.RemoveAccountByIds,
      params: params,
    },
    {
      joinParamsToUrl: true,
    }
  );
};

export const resetPasswordByIds = (params: { userIds: string }) => {
  return defHttp.post<string>(
    {
      url: Api.ResetPasswordByIds,
      params,
    },
    {
      joinParamsToUrl: true,
    }
  );
};
