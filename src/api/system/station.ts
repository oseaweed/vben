import { defHttp } from '/@/utils/http/axios';
import { StationInfo, FundsInfo } from './model/stationModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  GetStationList = '/blade-system/riskPost/treeList',
  SubmitStation = '/blade-system/riskPost/submit',
  GetStationDetailById = '/blade-system/riskPost/detail',
  GetFundsByStation = '/blade-system/riskPost/funds',
  BindFundsToStation = '/blade-system/riskPost/funds',
  RemoveStationById = '/blade-system/riskPost/remove',
  UpdateParent = '/blade-system/riskPost/updateParent',
}

export const getStationList = () => {
  return defHttp.get<StationInfo[]>({
    url: Api.GetStationList,
  });
};

export const submitStation = (params: StationInfo) => {
  return defHttp.post<string>({
    url: Api.SubmitStation,
    params,
  });
};

export const getStationDetailById = (params: { id: string }) => {
  return defHttp.get<StationInfo>({
    url: Api.GetStationDetailById,
    params,
  });
};

export const getFundsByStation = async (params?: { id: string }) => {
  return defHttp.get<FundsInfo[]>({ url: Api.GetFundsByStation, params });
};

export const bindFundsToStation = (params: { id: string; fundNames: string }) => {
  return defHttp.post<FundsInfo[]>({
    url: Api.BindFundsToStation,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
};

export const removeStationById = (params: { ids: string }) => {
  return defHttp.post<FundsInfo[]>(
    {
      url: Api.RemoveStationById,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
};

export const updateParent = (params: { parentId: string; ids: string }) => {
  return defHttp.post<string>(
    {
      url: Api.UpdateParent,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
};
