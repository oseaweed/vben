<template>
  <div class="bg-white px-4 py-1.5" v-loading="loading">
    <a-transfer
      @change="onChange"
      :dataSource="allfundsList"
      :locale="{ searchPlaceholder: '请输入基金名称或产品经理' }"
      :rowKey="(record) => record.key"
      :targetKeys="selectedStationFunds"
      showSearch
      :disabled="disabled"
      :filterOption="
        (inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.description.indexOf(inputValue) !== -1
      "
      :titles="['未绑定基金', '已绑定基金']"
    >
      <template
        #children="{ filteredItems, onItemSelectAll, onItemSelect, selectedKeys, disabled }"
      >
        <BasicTable
          :scroll="{ y: 650 }"
          :data-source="filteredItems"
          @register="registerTable"
          :row-selection="
            getRowSelection({
              disabled,
              selectedKeys,
              onItemSelectAll,
              onItemSelect,
            })
          "
        />
      </template>
    </a-transfer>
  </div>
</template>

<script lang="ts">
  import { difference } from 'lodash-es';
  import { defineComponent, ref, onMounted, computed, watch } from 'vue';
  import { BasicColumn } from '/@/components/Table';
  import { getFundsByStation, bindFundsToStation } from '/@/api/system/station';
  import { propTypes } from '/@/utils/propTypes';
  import { BasicTable, useTable } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: '产品经理',
      dataIndex: 'description',
    },
    {
      title: '基金名称',
      dataIndex: 'title',
    },
  ];
  interface TransferItem {
    key: string;
    title: string;
    description: string;
  }

  export default defineComponent({
    props: {
      stationInfo: propTypes.object.def({}),
    },

    components: { BasicTable },

    setup(_) {
      const [registerTable] = useTable({
        columns,
        size: 'small',
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        pagination: false,
        showIndexColumn: false,
        canResize: true,
      });

      const allfundsList = ref<TransferItem[]>([]);

      const selectedStationFunds = ref<string[]>([]);

      const loading = ref(false);

      const disabled = computed(() => {
        return !_.stationInfo.id || _.stationInfo.userId > -1;
      });

      watch(
        () => _.stationInfo.id,
        () => {
          if (_.stationInfo.id) {
            getSelectedFunds();
            return;
          }
          selectedStationFunds.value = [];
        },
      );

      async function getAllFunds() {
        allfundsList.value = (await getFundsByStation()).map((item) => {
          return {
            key: item.fullName,
            title: item.fundName,
            description: item.manager,
          };
        });
      }

      async function getSelectedFunds() {
        loading.value = true;
        selectedStationFunds.value = (await getFundsByStation({ id: _.stationInfo.id })).map(
          ({ fullName }) => fullName,
        );
        loading.value = false;
      }

      async function upDateStation(fundNames: string) {
        await bindFundsToStation({
          id: _.stationInfo.id,
          fundNames: fundNames,
        });
        getSelectedFunds();
      }

      const getRowSelection = ({
        disabled,
        selectedKeys,
        onItemSelectAll,
        onItemSelect,
      }: Record<string, any>) => {
        return {
          getCheckboxProps: () => ({
            disabled: disabled,
          }),

          onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },

          onSelect({ key }: Record<string, string>, selected: boolean) {
            onItemSelect(key, selected);
          },

          selectedRowKeys: selectedKeys,
        };
      };

      onMounted(() => {
        getAllFunds();
      });

      const onChange = (nextTargetKeys: string[]) => {
        upDateStation(nextTargetKeys.join(','));
      };

      return {
        registerTable,
        selectedStationFunds,
        onChange,
        getAllFunds,
        allfundsList,
        columns,
        getSelectedFunds,
        getRowSelection,
        disabled,
        loading,
      };
    },
  });
</script>
