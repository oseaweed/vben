export interface MenuInfo {
  action: number;
  actionName: string;
  alias: string; //菜单别名用作组件文件路径
  category: number;
  categoryName: string;
  code: string; // 菜单唯一标识
  hasChildren: boolean;
  id: string;
  isDeleted: number;
  isOpen: number;
  isOpenName: string;
  name: string;
  parentId: string;
  parentName: string;
  path: string; //路由地址
  remark: string; //用作重定向地址
  sort: number;
  source: string; //icon
  children: MenuInfo[];
}

export interface MenuDataParmas {
  name?: string;
  code?: string;
}

export interface MenuTreeInfo {
  hasChildren: boolean;
  id: string;
  key: string;
  parentId: string;
  title: string;
  value: string;
  children: MenuTreeInfo[];
}
