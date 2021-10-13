import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 150,
  },

  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    componentProps: {
      autoSize: { minRows: 6 },
    },
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
];
