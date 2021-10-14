<<<<<<< HEAD
import type { Menu, MenuModule, AppRouteModule } from '/@/router/types';
=======
import type { Menu, MenuModule } from '/@/router/types';
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
import type { RouteRecordNormalized } from 'vue-router';

import { useAppStoreWithOut } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { transformMenuModule, getAllParentPath } from '/@/router/helper/menuHelper';
import { filter } from '/@/utils/helper/treeHelper';
import { isUrl } from '/@/utils/is';
import { router } from '/@/router';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { pathToRegexp } from 'path-to-regexp';

<<<<<<< HEAD
// const modules = import.meta.globEager('./modules/**/*.ts');
const modules = import.meta.globEager('../routes/modules/**/*.ts');

const menuModules: MenuModule[] = [];
const menuFactory = (sourceChildren: Menu[], routes: AppRouteModule[]) => {
  routes.forEach((item) => {
    if (item.hide) return;
    const menuItem: Menu = {
      name: item.meta?.title,
      path: item.path,
    };
    if (item.children) {
      const children: Menu[] = [];
      menuFactory(children, item.children);
      menuItem.children = children;
    }
    sourceChildren.push(menuItem);
  });
};

// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   menuModules.push(...modList);
// });
Object.keys(modules).forEach((key) => {
  const mod: AppRouteModule = modules[key].default || {};
  if (mod.hide) return;
  const menuItem: Menu = {
    name: mod.meta?.title,
    path: mod.path,
  };
  if (mod.children) {
    if (mod.children.length === 1 && mod.children[0].path === 'index') {
      menuItem.path += `/${mod.children[0].path}`;
      menuItem.name = mod.children[0].meta?.title;
    } else {
      const children: Menu[] = [];
      menuFactory(children, mod.children);
      menuItem.children = children;
    }
  }
  const menuModuleItme: MenuModule = {
    orderNo: mod.orderNo,
    menu: menuItem,
  };
  menuModules.push(menuModuleItme);
=======
const modules = import.meta.globEager('./modules/**/*.ts');

const menuModules: MenuModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
});

// ===========================
// ==========Helper===========
// ===========================

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
};
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE;
};

const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu));
  }
})();

async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  if (isBackMode()) {
<<<<<<< HEAD
    // return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
    return permissionStore.getBackMenuList;
=======
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu);
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
  }
  return staticMenus;
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  if (isRoleMode()) {
    const routes = router.getRoutes();
    return filter(menus, basicFilter(routes));
  }
  return menus;
};

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  if (isRoleMode()) {
    const routes = router.getRoutes();
    return shallowMenuList.filter(basicFilter(routes));
  }
  return shallowMenuList;
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[];
  }
  if (isRoleMode()) {
    const routes = router.getRoutes();
    return filter(parent.children, basicFilter(routes));
  }
  return parent.children;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;

      return isSame || pathToRegexp(route.path).test(menu.path);
    });

    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
