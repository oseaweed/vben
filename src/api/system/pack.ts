import { defHttp } from '/@/utils/http/axios';
import { PackDataParmas, PackResult, PackInfo } from './model/packModel';

enum Api {
  GetPackList = '/blade-system/postGroup/page',
  GetAllPackList = '/blade-system/postGroup/list',
  UpdatePackData = '/blade-system/postGroup/submit',
  RemovePackByIds = '/blade-system/postGroup/remove',
}

export const getPackList = (params: PackDataParmas) => {
  return defHttp.get<PackResult[]>({
    url: Api.GetPackList,
    params,
  });
};

export const getAllPackList = () => {
  return defHttp.get<PackResult[]>({
    url: Api.GetAllPackList,
  });
};

export const updatePackData = (params: PackInfo) => {
  return defHttp.post<string>({
    url: Api.UpdatePackData,
    params,
  });
};

export const removePackByIds = (params: { ids: string }) => {
  return defHttp.post<string>(
    {
      url: Api.RemovePackByIds,
      params: params,
    },
    {
      joinParamsToUrl: true,
    }
  );
};
