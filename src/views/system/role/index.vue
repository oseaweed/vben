<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑角色',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'bx:bx-food-menu',
              tooltip: '配置权限',
              onClick: handleEditMenu.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除角色',
              popConfirm: {
                title: '是否删除该角色',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerRole" @success="reload" />
    <MenuDrawer @register="registerMenu" @success="reload" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleList, grantRoleMenuById, removeRoleByIds } from '/@/api/system/role';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './components/RoleDrawer.vue';
  import MenuDrawer from './components/MenuDrawer.vue';
  import { columns, searchFormSchema } from './role.data';
  import { RoleInfo } from '/@/api/system/model/roleModel';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction, MenuDrawer },
    setup() {
      const { createMessage } = useMessage();

      const [registerRole, { openDrawer: openRoleDrawer }] = useDrawer();

      const [registerMenu, { openDrawer: openMenuDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: getRoleList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openRoleDrawer(true, {
          isUpdate: false,
        });
      }

      async function handleEdit(record: RoleInfo) {
        openRoleDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: RoleInfo) {
        await removeRoleByIds({ ids: record.id });
        createMessage.success(`删除成功！`);
        reload();
      }

      async function handleEditMenu(record: RoleInfo) {
        record.menuIds = await grantRoleMenuById({ roleIds: record.id });
        openMenuDrawer(true, {
          record,
        });
      }

      return {
        registerTable,
        registerRole,
        handleCreate,
        handleEdit,
        handleDelete,
        reload,
        registerMenu,
        openMenuDrawer,
        handleEditMenu,
      };
    },
  });
</script>
