import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
<<<<<<< HEAD
  GetMenuListById = '/blade-system/menu/routes',
=======
  GetMenuList = '/getMenuList',
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
}

/**
 * @description: Get user menu based on id
 */

<<<<<<< HEAD
export const getMenuListById = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuListById });
=======
export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
};
