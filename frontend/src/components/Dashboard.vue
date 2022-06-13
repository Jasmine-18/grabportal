<template>
    <div class=" h-screen bg-slate-300">
        <div class="dashboard p-4">
            <div class="mt-5 w-full">
                <h1 class="text-2xl text-black text-black font-medium">
                    Dashboard
                </h1>
            </div>

            <!-- Total Transactions Chart -->
            <div class="mt-2 lg:flex block lg:gap-2">
                <div class="mt-2 bg-white bg-gray-800 p-5 w-full rounded-md box-border shadow">
                    <h2 class="font-bold text-lg text-gray-800 text-gray-200">
                        Total Transactions
                    </h2>
                    <p class="text-gray-400 font-lexend font-normal">
                        description here (filter by number, amount, day, month, deno, status)
                    </p>
                    <span class="float-right mr-20">
                        <h2 class="text-red-500 -mt-12 flex">
                            <span class="mr-2"> 0.00% </span><span>
                                <Icon icon="akar-icons:arrow-down" />
                            </span>
                        </h2>
                    </span>
                    <span class="float-right">
                        <h2 class="text-green-500 -mt-12 flex">
                            <span class="mr-2"> 0.00% </span><span>
                                <Icon icon="akar-icons:arrow-up" />
                            </span>
                        </h2>
                    </span>
                    <br />
                    <apexchart width="100%" height="380" type="area" :options="optionsArea" :series="seriesArea"
                        :sparkline="{
                            enabled: true,
                        }"></apexchart>
                    <br />
                    <hr />
                </div>
            </div>

            <!-- grid wrapper card -->
            <div class="wrapper-card grid lg:grid-cols-3 grid-cols-1 md:gap-2 mt-5">

                <!-- Total payouts card  -->
                <div class="card bg-white bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            RM 12,345
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Payouts</h2>
                    </div>
                </div>
                <!-- end card -->

                <!-- Total sales card  -->
                <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            256
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Sales</h2>
                    </div>
                </div>
                <!-- end card -->

                <!-- Total customers card  -->
                <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            10,000
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">
                            Total Customers
                        </h2>
                    </div>
                </div>
                <!-- end card -->
            </div>
            <!-- end wrapper card -->
        </div>
    </div>
</template>


<script>
import { onMounted, ref } from "vue";
import DataService from "../services/DataService";
export default {
  setup() {
    const filter = ref({
      dateFilter: "2021-08-09",
      denoFIlter: "MYR",
      statusFilter: "SUCCESS",
    });
    const totalAmount = ref({});
    const totalTransaction = ref("null");
    const totalCustomer = ref("null");
    const totalPayout = ref("null");
    const todayTransaction = ref({});

    function getTotalAmount() {
      DataService.getTotalAmount(filter.value)
        .then((response) => {
          totalAmount.value = response.data;
          totalTransaction.value = totalAmount.value[0].totalTransaction;
          totalPayout.value = totalAmount.value[1].totalPayout;
          totalCustomer.value = totalAmount.value[2].totalCustomer;
        })
        .catch((e) => {
          console.warn(e);
        });
    }
    function getTodayTransaction() {
      DataService.getTodayTransaction()
        .then((response) => {
          todayTransaction.value = response.data;
          console.log(todayTransaction.value);
        })
        .catch((e) => {
          console.warn(e);
        });
    }
    onMounted(() => {
      getTotalAmount();
      getTodayTransaction();
    });
    return {
      filter,
      totalAmount,
      totalTransaction,
      totalCustomer,
      totalPayout,
      todayTransaction,
      getTotalAmount,
      getTodayTransaction,
    };
  },
};
</script>
