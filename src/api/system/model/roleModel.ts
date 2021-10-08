export interface RoleTreeResult {
  id: string;
  key: string;
  parentId: string;
  title: string;
  value: string;
  children?: RoleTreeResult[];
}

export interface RoleDataParmas {
  roleName: string;
}

export interface RoleInfo {
  id: string;
  isDeleted: number;
  parentId: string | number;
  parentName: string;
  roleAlias: string;
  roleName: string;
  sort: string;
  tenantId: string;
  menuIds?: string[];
}

export interface GrantParmas {
  menuIds?: string[];
  roleIds?: string[];
}
