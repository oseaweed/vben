export interface StationDataParmas {
  current: number;
  size: number;
  postName?: string;
}

export interface StationListResult {
  current: number;
  size: number;
  total?: string;
  records: StationInfo[];
}

export interface StationInfo {
  postName?: string; // 岗位名称
  id?: string;
  children?: StationInfo[];
  createTime?: string;
  sort?: number;
  remark?: string;
  parentId?: string;
  ids?: string;
}

export interface FundsInfo {
  fullName: string;
  fundCode: string;
  fundName: string; //产品简称
  manager: string;
}
