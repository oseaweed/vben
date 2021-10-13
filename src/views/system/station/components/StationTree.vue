<template>
  <div class="overflow-hidden">
    <BasicTree
      style="height: calc(100vh - 190px)"
      v-model:value="checkedKeys"
      checkStrictly
      checkable
      title="岗位结构"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      defaultExpandAll
      :replaceFields="{ key: 'id', title: 'postName' }"
      :beforeRightClick="getRightMenuList"
      @select="handleSelect"
      :selectedKeys="selectedKeys"
    >
      <template #expandContent>
        <div class="pt-2 pr-2 text-right">
          <Button type="primary" class="mr-2" @click="assignmentStation" size="small">
            批量调整
          </Button>
          <Button type="primary" @click="openDrawer(true, { isAdd: true })" size="small">
            新增
          </Button>
        </div>
      </template>
    </BasicTree>
    <StationDrawer @register="registerDrawer" :treeData="treeData" @success="getTreeData" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, ContextMenuItem } from '/@/components/Tree/index';
  import { getStationList, removeStationById } from '/@/api/system/station';
  import { useDrawer } from '/@/components/Drawer';
  import StationDrawer from './StationDrawer.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Button } from '/@/components/Button';
  import { StationInfo } from '/@/api/system/model/stationModel';

  export default defineComponent({
    name: 'StationTree',

    components: { BasicTree, StationDrawer, Button },

    emits: ['select', 'check'],

    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const [registerDrawer, { openDrawer }] = useDrawer();

      const activeNode = ref();

      const treeData = ref<StationInfo[]>([]);

      const checkedKeys = ref<any>({ checked: [], halfChecked: [] });

      async function getTreeData() {
        checkedKeys.value.checked = [];

        treeData.value = await getStationList();
      }

      const selectedKeys = ref<string[]>();

      function handleSelect(_, e) {
        const { selectedNodes } = e;
        activeNode.value = selectedNodes[0] ? selectedNodes[0].props : activeNode.value;
        selectedKeys.value = [activeNode.value.id];
        emit('select', activeNode.value);
      }

      function getRightMenuList(node: any): ContextMenuItem[] {
        return node.eventKey == activeNode.value.id
          ? [
              {
                label: '添加下级',
                handler: () => {
                  openDrawer(true, { activeId: node.eventKey, isAppendChild: true });
                },
                icon: 'bi:plus',
              },
              {
                label: '编辑节点',
                handler: () => {
                  openDrawer(true, { activeId: node.eventKey, isUpdate: true });
                },
                icon: 'clarity:note-edit-line',
              },
              {
                label: '删除节点',
                disabled: activeNode.value.parentId === '0' || activeNode.value.userId > -1,
                handler: () => {
                  removeStation(node.eventKey);
                },
                icon: 'ant-design:delete-outlined',
              },
            ]
          : [];
      }

      async function removeStation(id: string) {
        await removeStationById({ ids: id });
        createMessage.success(`删除成功！`);
        await getTreeData();
        handleSelect('', { selectedNodes: [{ props: treeData.value[0] }] });
      }

      function assignmentStation() {
        const checked = checkedKeys.value.checked;
        if (!checked.length) {
          createMessage.error(`请选择要操作的岗位`);
          return;
        }
        openDrawer(true, { isMultipleUpdate: true, checkedKeys: checked });
      }

      onMounted(async () => {
        await getTreeData();
        handleSelect('', { selectedNodes: [{ props: treeData.value[0] }] });
      });

      return {
        treeData,
        handleSelect,
        registerDrawer,
        getRightMenuList,
        getTreeData,
        selectedKeys,
        openDrawer,
        checkedKeys,
        assignmentStation,
      };
    },
  });
</script>
