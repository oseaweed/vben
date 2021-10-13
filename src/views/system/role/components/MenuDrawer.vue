<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="菜单权限配置"
    width="30%"
    @ok="handleSubmit"
  >
    <BasicTree
      @check="handleSelect"
      v-model:value="formItem.menuIds"
      :treeData="treeData"
      :replaceFields="{ title: 'name', key: 'id' }"
      checkable
    />
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree } from '/@/components/Tree';
  import { grantMenu } from '/@/api/system/role';
  import { getMenuTree } from '/@/api/system/menu';
  import { GrantParmas } from '/@/api/system/model/roleModel';
  import { MenuTreeInfo } from '../../../../api/system/model/menuModel';
  import { cloneDeep, isEmpty } from 'lodash';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',

    components: { BasicDrawer, BasicTree },

    emits: ['success', 'register'],

    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const treeData = ref<MenuTreeInfo[]>([]);

      const formItem = reactive({
        roleIds: [],
        menuIds: [],
      } as GrantParmas);

      const checkedKeys: string[] = []; //不包含父级key

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        formItem.roleIds = [data.record.id];
        Object.assign(formItem, data.record);

        treeData.value = (await getMenuTree()) as MenuTreeInfo[];
      });

      async function handleSubmit() {
        if (isEmpty(checkedKeys)) {
          createMessage.error(`请选择菜单`);
          return;
        }

        try {
          const query = cloneDeep(formItem);
          query.menuIds = checkedKeys;

          setDrawerProps({ confirmLoading: true });

          await grantMenu(query);

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function handleSelect(_, { checkedNodes }) {
        checkedNodes.forEach(({ props }) => {
          if (isEmpty(props.children)) checkedKeys.push(props.key);
        });
      }

      return {
        registerDrawer,
        handleSubmit,
        treeData,
        handleSelect,
        checkedKeys,
        formItem,
      };
    },
  });
</script>
