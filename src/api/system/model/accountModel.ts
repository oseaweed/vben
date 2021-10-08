export interface AccountDataParmas {
  current: number;
  size: number;
  account?: string;
  realName?: string;
}

export interface AccountResult {
  current: number;
  size: number;
  total?: string;
  records: AccountInfo[];
}

export interface AccountInfo {
  id: string;
  account: string;
  email: string;
  name: string;
  phone: string | number;
  roleName: string;
  roleId: string;
  status: number;
  updateTime: string;
  createTime: string;
  password?: string;
  password2: string;
}
