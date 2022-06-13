<template>
    <div class=" h-screen bg-slate-300">
        <div class="dashboard p-4">
            <div class="mt-5 w-full">
                <h1 class="text-2xl text-black font-medium">
                    Dashboard
                </h1>
            </div>

            <!-- grid wrapper card -->
            <div class="wrapper-card grid lg:grid-cols-3 grid-cols-1 md:gap-2 mt-5">

                <!-- Total payouts card  -->
                <div class="card bg-white bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-white text-xl">
                            {{ totalPayout }}
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Payouts</h2>
                    </div>
                </div>
                <!-- end card -->

                <!-- Total sales card  -->
                <div class="card bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-white text-xl">
                            {{ totalTransaction }}
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Transactions</h2>
                    </div>
                </div>
                <!-- end card -->

                <!-- Total customers card  -->
                <div class="card bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-white text-xl">
                            {{ totalCustomer }}
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">
                            Total Customers
                        </h2>
                    </div>
                </div>
                <!-- end card -->
            </div>
            <!-- end wrapper card -->

            <!-- Total Transactions Chart -->
            <div class="mt-2 lg:flex block lg:gap-2">
                <div class="mt-2 bg-gray-800 p-5 w-full rounded-md box-border shadow">
                    <h2 class="font-bold text-lg text-white">
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
