import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuListById = '/blade-system/menu/routes',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuListById = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuListById });
};
