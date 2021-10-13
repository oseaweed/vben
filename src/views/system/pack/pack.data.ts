import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '岗位组合名称',
    dataIndex: 'pgroupName',
    width: 120,
  },
  {
    title: '岗位',
    dataIndex: 'postNames',
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
    field: 'pgroupName',
    label: '岗位组合名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'pgroupName',
    label: '岗位组合名称',
    required: true,
    component: 'Input',
  },
  {
    label: '岗位',
    field: 'postIdFiled',
    component: 'TreeSelect',
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
