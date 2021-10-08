export interface PackDataParmas {
  current: number;
  size: number;
  pgroupName?: string;
}

export interface PackResult {
  current: number;
  size: number;
  total?: string;
  records: PackInfo[];
}

export interface PackInfo {
  id: string;
  pgroupName: string;
  pgroupCode: string;
  postIds: string;
  remark: string;
  sort: string;
}
