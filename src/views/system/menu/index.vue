<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑菜单信息',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除菜单',
              popConfirm: {
                title: '是否删除该条信息',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="reload" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuList, removeMenuByIds } from '/@/api/system/menu';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './components/MenuDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';
  import { MenuInfo } from '/@/api/system/model/menuModel';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuManagement',

    components: { BasicTable, MenuDrawer, TableAction },

    setup() {
      const { createMessage } = useMessage();

      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '菜单列表',
        api: getMenuList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: MenuInfo) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: MenuInfo) {
        await removeMenuByIds({ ids: record.id });
        createMessage.success(`删除成功！`);
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        reload,
      };
    },
  });
</script>
