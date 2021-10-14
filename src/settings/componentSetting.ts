// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
<<<<<<< HEAD
      pageField: 'current',
      // The number field name of each page displayed in the background
      sizeField: 'size',
      // Field name of the form data returned by the interface
      listField: 'records',
=======
      pageField: 'page',
      // The number field name of each page displayed in the background
      sizeField: 'pageSize',
      // Field name of the form data returned by the interface
      listField: 'items',
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
      // Total number of tables returned by the interface field name
      totalField: 'total',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    defaultPageSize: 10,
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      return {
        // The sort field passed to the backend you
        field,
        // Sorting method passed to the background asc/desc
        order,
      };
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
<<<<<<< HEAD
  // 登录设置
  login: {
    // 租户id
    tenantId: '666666',
  },
=======
>>>>>>> 5902886798cc51e7f32ca878d74efe4da2194ebb
};
