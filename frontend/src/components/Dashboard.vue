<template>
  <div class="h-screen-full bg-slate-300">
    <!-- <Navbar/> -->
    <div class="dashboard p-4">
      <div class="mt-5 w-full">
        <h1 class="text-2xl text-black font-medium">Dashboard</h1>
      </div>

      <!-- grid wrapper card -->
      <div class="wrapper-card grid lg:grid-cols-3 grid-cols-1 md:gap-2 mt-5">
        <!-- Total payouts card  -->
        <div class="card bg-white bg-gray-800 w-full rounded-md p-5 shadow flex">
          <div class="block p-2 w-full">
            <p class="font-semibold text-white text-xl">
              {{ totalPayout }}
            </p>
            <h2 class="font-normal text-gray-400 text-md mt-1">
              Total Payouts
            </h2>
          </div>
        </div>
        <!-- end card -->

        <!-- Total sales card  -->
        <div class="card bg-gray-800 w-full rounded-md p-5 shadow flex">
          <div class="block p-2 w-full">
            <p class="font-semibold text-white text-xl">
              {{ totalTransaction }}
            </p>
            <h2 class="font-normal text-gray-400 text-md mt-1">
              Total Transactions
            </h2>
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

      <!-- Four Main Charts -->
      <div class="wrapper-card grid lg:grid-cols-2 grid-cols-2 md:gap-2 mt-5">
        <!-- First chart -->
        <div class="card bg-gray-800 w-full h-fit rounded-md p-5 shadow">
          <TestBar />
        </div>
        <!-- Second chart -->
        <div class="card bg-gray-800 w-full h-fit rounded-md p-5 shadow">
          <TestBar />
        </div>
        <!-- Third chart -->
        <div class="card bg-gray-800 w-full h-fit rounded-md p-5 shadow">
          <TestBar />
        </div>
        <!-- Fourth chart -->
        <div class="card bg-gray-800 w-full h-fit rounded-md p-5 shadow">
          <TestBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import router from "../routes/routes";
import DataService from "../services/DataService";
import TestBar from "./TestBar.vue"
undefined

export default {
  setup() {
    const filter = ref({
      dateFilter: "2021-08-09",
      denoFilter: "30",
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
    function verifyUser() {
      let token = localStorage.getItem("token");
      DataService.auth({ headers: { authorization: token } })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          router.push("/deniedAccess");
        });
    }
    function getTodayTransaction() {
      DataService.getTodayTransaction()
        .then((response) => {
          todayTransaction.value = response.data;
        })
        .catch((e) => {
          console.warn(e);
        });
    }
    onMounted(() => {
      verifyUser();
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
      verifyUser,
      getTotalAmount,
      getTodayTransaction
    };
  },
  components: { TestBar }
};
</script>
