<template>
  <div class="h-screen bg-slate-300">
    <div class="dashboard p-4">
      <div class="mt-5 w-full">
        <h1 class="text-2xl text-black font-medium">
          Transaction History
        </h1>
      </div>

      <!-- Transaction History Chart-->
      <div class="mt-2 lg:flex block lg:gap-2">
        <div
          class="mt-2 bg-gray-800 p-5 w-full rounded-md box-border shadow"
        >
          <h2 class="font-bold text-lg text-white">
            Transaction History
          </h2>
          <p class="text-gray-400 font-lexend font-normal">
            Before expand: date, ID, username, user phone, user email, amount,
            status -- After expand: MI ID, MI status, mode of payment
          </p>
          <div class="wrapping-table mt-10">
            <table
              class="w-full text-sm text-left text-gray-500 lg:overflow-auto overflow-x-scroll"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50"
              >
                <tr>
                  <th scope="col" class="uppercase px-6 py-3">Transaction Date</th>
                  <th scope="col" class="uppercase px-6 py-3">Transaction ID</th>
                  <th scope="col" class="uppercase px-6 py-3">Username</th>
                  <th scope="col" class="uppercase px-6 py-3">User Phone</th>
                  <th scope="col" class="uppercase px-6 py-3">User Email</th>
                  <th scope="col" class="uppercase px-6 py-3">Amount</th>
                  <th scope="col" class="uppercase px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody v-for="(data, index) in todayTransaction" :key="index">
                <tr>
                  <td>{{ data.created_at }}</td>
                  <td>{{ data.id }}</td>
                  <td>{{ data.user_name }}</td>
                  <td>{{ data.user_phone }}</td>
                  <td>{{ data.user_email }}</td>
                  <td>{{ data.amount_total }}</td>
                  <td>{{ data.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="wrapper-button mt-3 flex">
            <button
              class="float-right mt-3 border-b border-green-600 text-green-600"
            >
              download with icon
            </button>
          </div>
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
    
    const todayTransaction = ref({});
    
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
      getTodayTransaction();
    });
    return {
      todayTransaction,
      getTodayTransaction,
    };
  },
};
</script>
