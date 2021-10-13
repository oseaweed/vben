<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑账号信息',
              disabled: record.status == 2,
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'mdi:lock-reset',
              disabled: record.status == 2,
              tooltip: '重置密码',
              popConfirm: {
                title: '是否重置密码',
                confirm: handleReset.bind(null, record),
              },
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              disabled: record.status == 2,
              tooltip: '删除账号',
              popConfirm: {
                title: '是否删除该账号',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AccountModal @register="registerDrawer" @success="reload" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList, removeAccountByIds, resetPasswordByIds } from '/@/api/system/account';
  import { useDrawer } from '/@/components/Drawer';
  import AccountModal from './components/AccountModal.vue';
  import { columns, searchFormSchema } from './account.data';
  import { AccountInfo } from '/@/api/system/model/accountModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getStationList } from '/@/api/system/station';

  export default defineComponent({
    name: 'AccountManagement',

    components: { BasicTable, TableAction, AccountModal },

    setup() {
      const { createMessage } = useMessage();

      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload, getForm }] = useTable({
        api: getAccountList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        showIndexColumn: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: AccountInfo) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: AccountInfo) {
        await removeAccountByIds({ ids: record.id });
        createMessage.success(`删除成功！`);
        reload();
      }

      async function handleReset(record: AccountInfo) {
        await resetPasswordByIds({ userIds: record.id });
        createMessage.success(`重置成功！`);
        reload();
      }

      onMounted(async () => {
        const treeData = await getStationList();
        getForm().updateSchema({
          field: 'postId',
          componentProps: { treeData },
        });
      });

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleReset,
        reload,
      };
    },
  });
</script>
