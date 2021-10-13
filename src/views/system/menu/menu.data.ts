import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'source',
    customRender: ({ record }) => {
      return h(Icon, { icon: record.source });
    },
    width: 100,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '路由标识',
    dataIndex: 'code',
  },

  {
    title: '组件路径',
    dataIndex: 'alias',
  },
  {
    title: '重定向地址',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'category',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    show: false,
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '路由标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'Input',
    componentProps: {
      min: 0,
    },
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'alias',
    label: '组件路径',
    component: 'Input',
  },

  {
    field: 'source',
    label: '图标',
    component: 'IconPicker',
    componentProps: {
      allowInputClear: true,
    },
  },

  {
    field: 'remark',
    label: '重定向地址',
    component: 'Input',
  },

  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
];
