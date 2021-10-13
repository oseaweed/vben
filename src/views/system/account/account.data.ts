import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getRoleList } from '/@/api/system/role';
import { getAllPackList } from '/@/api/system/pack';

export const isGroup = (type: number) => type == 2;
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '姓名',
    dataIndex: 'realName',
  },

  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '角色',
    dataIndex: 'roleName',
  },
  {
    title: '岗位',
    dataIndex: 'postName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleId',
    label: '角色',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getRoleList,
      labelField: 'roleName',
      valueField: 'id',
    },
  },
  {
    label: '岗位',
    field: 'postId',
    component: 'TreeSelect',
    colProps: { span: 6 },
    componentProps: {
      showSearch: true,
      dropdownStyle: {
        maxHeight: '60vh',
      },
      treeNodeFilterProp: 'title',
      replaceFields: {
        title: 'postName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'realName',
    label: '姓名',
    component: 'Input',
    required: true,
  },

  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      labelField: 'roleName',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    rules: [
      {
        pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        message: '手机格式不正确',
      },
    ],
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    show: false,
    rules: [
      { required: false },
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '邮箱格式不正确',
      },
    ],
  },
  {
    label: '岗位类型',
    field: 'postType',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '岗位',
          value: 1,
        },
        {
          label: '岗位组合',
          value: 2,
        },
      ],
    },
  },
  {
    label: '岗位',
    field: 'postIds',
    component: 'TreeSelect',
    show: ({ values }) => !isGroup(values.postType),

    componentProps: {
      showSearch: true,
      dropdownStyle: {
        maxHeight: '60vh',
      },
      treeNodeFilterProp: 'title',
      multiple: true,
      replaceFields: {
        title: 'postName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    label: '岗位组合',
    field: 'postGroupIds',
    component: 'ApiSelect',
    show: ({ values }) => isGroup(values.postType),
    componentProps: {
      mode: 'multiple',
      api: getAllPackList,
      labelField: 'pgroupName',
      valueField: 'id',
    },
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
];
