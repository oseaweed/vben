<template>
  <div class="p-4 pb-0 grid grid-cols-10 gap-x-4">
    <StationTree class="col-span-2" @select="handleSelect" />
    <FundsTable class="col-span-8" :stationInfo="stationInfo" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import StationTree from './components/StationTree.vue';
  import FundsTable from './components/FundsTable.vue';

  export default defineComponent({
    name: 'StationManagement',

    components: { PageWrapper, StationTree, FundsTable },

    setup() {
      const stationInfo = ref<string>();

      function handleSelect(info = '') {
        stationInfo.value = info;
      }

      return {
        handleSelect,
        stationInfo,
      };
    },
  });
</script>
