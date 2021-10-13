import { defHttp } from '/@/utils/http/axios';
import { MenuInfo, MenuDataParmas, MenuTreeInfo } from './model/menuModel';

enum Api {
  GetMenuList = '/blade-system/menu/riskMenuList',
  SubmitMenuData = '/blade-system/menu/riskSubmit',
  GetMenuDetail = '/blade-system/menu/detail',
  RemoveMenuByIds = '/blade-system/menu/remove',
  GetMenuTree = '/blade-system/menu/riskMenuList',
  GetMenuListById = '/blade-system/menu/routes',
}

export const getMenuList = (params: MenuDataParmas) => {
  return defHttp.get<MenuInfo[]>({
    url: Api.GetMenuList,
    params,
  });
};

export const getMenuTree = () => {
  return defHttp.get<MenuTreeInfo[]>({
    url: Api.GetMenuTree,
  });
};

export const submitMenuData = (params: MenuInfo) => {
  return defHttp.post<string>({
    url: Api.SubmitMenuData,
    params,
  });
};

export const getMenuDetail = (params: { id: string }) => {
  return defHttp.get<MenuInfo>({
    url: Api.GetMenuDetail,
    params,
  });
};

export const removeMenuByIds = (params: { ids: string }) => {
  return defHttp.post<string>(
    {
      url: Api.RemoveMenuByIds,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
};

export const getMenuListById = () => {
  return defHttp.get<MenuInfo[]>({ url: Api.GetMenuListById });
};
