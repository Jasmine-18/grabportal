<template>
  <div class="h-screen bg-slate-300">
    <!-- Loading animation starts here -->
    <div
      v-if="loading"
      class="pt-10 text-center justify-center overflow-hidden"
    >
      <svg
        role="status"
        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
    <!-- Ends of oading animation -->
    <!-- <Navbar/> -->
    <div v-else class="dashboard p-4">
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
    const loading = ref(true);
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

    async function getDataOverall() {
      await DataService.getDataOverall()
        .then((response) => {
          totalAmount.value = response.data;
          totalTransaction.value = totalAmount.value[0].totalTransaction;
          totalPayout.value = totalAmount.value[1].totalPayout;
          totalCustomer.value = totalAmount.value[2].totalCustomer;
          loading.value = false;
        })
        .catch((e) => {
          console.warn(e);
        });
    }

    async function verifyUser() {
      let token = localStorage.getItem("token");
      await DataService.auth({ headers: { authorization: token } })
        .then((response) => {
          console.log(loading);
          console.log(response.data.message);
          getDataOverall();
        })
        .catch((e) => {
          router.push("/deniedAccess");
        });
    }
    onMounted(() => {
      verifyUser();
    });
    return {
      filter,
      totalAmount,
      totalTransaction,
      totalCustomer,
      totalPayout,
      todayTransaction,
      loading,
      verifyUser,
      getDataOverall,
    };
  },
  components: { TestBar }
};
</script>
