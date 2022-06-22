<template>
  <div>
    <apexchart type="bar" width="100%" height="200%" :options="options" :series="series"></apexchart>
  </div>
  <div class="bg-white p-6 rounded-xl shadow-lg mt-5">
    <div class="grid grid-cols-2 gap-6">
      <div class="flex flex-col">
        <label for="transactionDateFilter" class="font-medium text-sm text-stone-600">Transaction Date
          Start</label>
        <input v-model="dateFilter.transactionDate" type="date" id="transactionDateFilter"
          class="mt-2 w-full px-1 py-1 border-solid border-2 rounded-lg text-black" />
      </div>

      <div class="flex flex-col">
        <label for="transactionDateFilter" class="font-medium text-sm text-stone-600">Transaction Date
          End</label>
        <input v-model="dateFilter.transactionDate" type="date" id="transactionDateFilter"
          class="mt-2 w-full px-1 py-1 border-solid border-2 rounded-lg text-black" />
      </div>
    </div>

    <div class="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
      <button @click="filterFunction()"
        class="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 font-bold text-white shadow-lg shadow-gray-200 transition ease-in-out duration-200 translate-10">
        Last 30 days
      </button>

      <button @click="filterFunction()"
        class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-bold text-white shadow-lg shadow-green-200 transition ease-in-out duration-200 translate-10">
        Apply
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DataService from "../services/DataService";
export default {

  setup() {
    onMounted(() => {
      getAmountChart();
    })

    const dateFilter = ref({
      isDefault: false,
      startDate: "2021-01-10",
      endDate: "2021-05-30"
    });

    const options = ref({
      chart: {
        id: 'transaction-deno'
      },
      xaxis: {
        categories: ['30', '50', '100']
      }
    });

    const series = ref([{
      name: 'series',
      data: [0, 0, 0]
    }]);

    async function getAmountChart() {
      await DataService.getAmountChart(dateFilter.value)
        .then((res) => {
          console.log(res.data[30])
          if (res.data[30]) {
            series.value[0].data[0] = res.data[30].count
          }
          if (res.data[50]) {
            series.value[0].data[1] = res.data[50].count
          }
          if (res.data[100]) {
            series.value[0].data[2] = res.data[100].count
          }
        })
        .catch((e) => {
          console.warn(e)
        })
    };

    return {
      dateFilter, options, series
    };
  }
}
</script>