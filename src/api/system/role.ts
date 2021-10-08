import { defHttp } from '/@/utils/http/axios';
import { RoleTreeResult, RoleDataParmas, RoleInfo, GrantParmas } from './model/roleModel';
enum Api {
  GetRoleTree = '/blade-system/role/tree',
  GetRoleList = '/blade-system/role/list',
  GetRoleDetail = '/blade-system/role/detailById',
  SubmitRole = '/blade-system/role/submit',
  RemoveRoleByIds = '/blade-system/role/remove',
  GrantAllMenu = '/blade-system/role/grant',
  GrantRoleMenuById = '/blade-system/menu/role-tree-keys',
}

export const getRoleTree = () => {
  return defHttp.get<RoleTreeResult[]>({
    url: Api.GetRoleTree,
  });
};

export const getRoleList = (params: RoleDataParmas) => {
  return defHttp.get<RoleInfo[]>({
    url: Api.GetRoleList,
    params,
  });
};

export const getRoleDetail = (params: { roleId: string }) => {
  return defHttp.get<RoleInfo>({
    url: Api.GetRoleDetail,
    params,
  });
};

export const grantRoleMenuById = (params: { roleIds: string }) => {
  return defHttp.get<string[]>({
    url: Api.GrantRoleMenuById,
    params,
  });
};

export const grantMenu = (params: GrantParmas) => {
  return defHttp.post<string[]>({
    url: Api.GrantAllMenu,
    params,
  });
};

export const submitRole = (params: RoleInfo) => {
  return defHttp.post<string[]>({
    url: Api.SubmitRole,
    params,
  });
};

export const removeRoleByIds = (params: { ids: string }) => {
  return defHttp.post<string[]>(
    {
      url: Api.RemoveRoleByIds,
      params,
    },
    {
      joinParamsToUrl: true,
    }
  );
};
