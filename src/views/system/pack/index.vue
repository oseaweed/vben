<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增岗位组合 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑岗位组合',
              onClick: handleEdit.bind(null, record),
            },

            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除岗位组合',
              popConfirm: {
                title: '是否删除该岗位组合',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerRole" @success="reload" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPackList, removePackByIds } from '/@/api/system/pack';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './components/PackDrawer.vue';
  import { columns, searchFormSchema } from './pack.data';
  import { RoleInfo } from '/@/api/system/model/roleModel';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'PackManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const { createMessage } = useMessage();

      const [registerRole, { openDrawer: openRoleDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '岗位组合列表',
        api: getPackList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
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
        await removePackByIds({ ids: record.id });
        createMessage.success(`删除成功！`);
        reload();
      }

      return {
        registerTable,
        registerRole,
        handleCreate,
        handleEdit,
        handleDelete,
        reload,
      };
    },
  });
</script>
