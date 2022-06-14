<template>
  <div class="h-screen bg-slate-300">
    <div class="dashboard p-4">
      <div class="mt-5 w-full">
        <h1 class="text-2xl text-black text-black font-medium">
          Transaction History
        </h1>
      </div>

      <!-- Transaction History -->
      <div class="mt-2 lg:flex block lg:gap-2">
        <div
          class="mt-2 bg-white bg-gray-800 p-5 w-full rounded-md box-border shadow"
        >
          <h2 class="font-bold text-lg text-gray-800 text-gray-200">
            Transaction History
          </h2>
          <p class="text-gray-400 font-lexend font-normal">
            Before expand: date, ID, username, user phone, user email, amount,
            status -- After expand: MI ID, MI status, mode of payment
          </p>
          <!-- Dropdown Colum Filter -->
          <div>
            <div class="relative">
              <!-- Dropdown toggle button -->
              <button
                @click="dropDownShow = !dropDownShow"
                class="flex items-center p-2 text-indigo-100 bg-indigo-600 rounded-md"
              >
                <span class="mr-4">Columns</span>
                <svg
                  class="w-5 h-5 text-indigo-100 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                v-show="dropDownShow"
                class="absolute left-0 py-2 mt-2 bg-indigo-500 rounded-md shadow-xl w-44"
              >
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="selectAll"
                      @click="columnsSelectAll()"
                    />
                    <span class="ml-2 text-sm">Select All</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.transactionDate"
                      @click="
                        columnsChecked.transactionDate =
                          !columnsChecked.transactionDate
                      "
                    />
                    <span class="ml-2 text-sm">Transaction Date</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.transactionID"
                      @click="
                        columnsChecked.transactionID =
                          !columnsChecked.transactionID
                      "
                    />
                    <span class="ml-2 text-sm">Transaction ID</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.userName"
                      @click="
                        columnsChecked.userName = !columnsChecked.userName
                      "
                    />
                    <span class="ml-2 text-sm">Username</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.userPhone"
                      @click="
                        columnsChecked.userPhone = !columnsChecked.userPhone
                      "
                    />
                    <span class="ml-2 text-sm">User Phone</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.userEmail"
                      @click="
                        columnsChecked.userEmail = !columnsChecked.userEmail
                      "
                    />
                    <span class="ml-2 text-sm">User Email</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.amount"
                      @click="columnsChecked.amount = !columnsChecked.amount"
                    />
                    <span class="ml-2 text-sm">Amount</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.status"
                      @click="columnsChecked.status = !columnsChecked.status"
                    />
                    <span class="ml-2 text-sm">Status</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.miTransactionID"
                      @click="
                        columnsChecked.miTransactionID =
                          !columnsChecked.miTransactionID
                      "
                    />
                    <span class="ml-2 text-sm">MI Transaction ID</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.miStatus"
                      @click="
                        columnsChecked.miStatus = !columnsChecked.miStatus
                      "
                    />
                    <span class="ml-2 text-sm">MI Status</span>
                  </label>
                </div>
                <div
                  class="flex block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100"
                >
                  <label class="flex items-center">
                    <input
                      class="flex item-center"
                      type="checkbox"
                      id="checkbox"
                      v-model="columnsChecked.modeOfPayment"
                      @click="
                        columnsChecked.modeOfPayment =
                          !columnsChecked.modeOfPayment
                      "
                    />
                    <span class="ml-2 text-sm">Mode of Payment</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Dropdown Colum Filter -->
          <!-- Transaction History Table -->
          <div class="wrapping-table mt-10">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th
                    v-if="columnsChecked.transactionDate"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Transaction Date
                  </th>
                  <th
                    v-if="columnsChecked.transactionID"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Transaction ID
                  </th>
                  <th
                    v-if="columnsChecked.userName"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Username
                  </th>
                  <th
                    v-if="columnsChecked.userPhone"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    User Phone
                  </th>
                  <th
                    v-if="columnsChecked.userEmail"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    User Email
                  </th>
                  <th
                    v-if="columnsChecked.amount"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Amount
                  </th>
                  <th
                    v-if="columnsChecked.status"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Status
                  </th>
                  <th
                    v-if="columnsChecked.miTransactionID"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    MI Transaction ID
                  </th>
                  <th
                    v-if="columnsChecked.miStatus"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    MI Status
                  </th>
                  <th
                    v-if="columnsChecked.modeOfPayment"
                    scope="col"
                    class="uppercase px-6 py-3"
                  >
                    Mode of Payment
                  </th>
                </tr>
              </thead>
              <tbody v-for="(data, index) in todayTransaction" :key="index">
                <tr>
                  <td v-if="columnsChecked.transactionDate">
                    {{ data.created_at }}
                  </td>
                  <td v-if="columnsChecked.transactionID">{{ data.id }}</td>
                  <td v-if="columnsChecked.userName">{{ data.user_name }}</td>
                  <td v-if="columnsChecked.userPhone">{{ data.user_phone }}</td>
                  <td v-if="columnsChecked.userEmail">{{ data.user_email }}</td>
                  <td v-if="columnsChecked.amount">{{ data.amount_total }}</td>
                  <td v-if="columnsChecked.status">{{ data.status }}</td>
                  <td v-if="columnsChecked.miTransactionID">
                    {{ data.agent_transaction_id }}
                  </td>
                  <td v-if="columnsChecked.miStatus">
                    {{ data.novati_status }}
                  </td>
                  <td v-if="columnsChecked.modeOfPayment">
                    {{ data.provider }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Transaction History Table -->
          <div class="wrapper-button mt-3">
            <button
              class="float-right mt-3 border-b border-red-600 text-red-600"
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
    const countColumnsShow = ref(0);
    const dropDownShow = ref(false);
    const todayTransaction = ref({});
    const selectAll = ref(false);
    const columnsChecked = ref({
      transactionDate: true,
      transactionID: true,
      userName: true,
      userPhone: true,
      userEmail: true,
      amount: true,
      status: true,
      miTransactionID: false,
      miStatus: false,
      modeOfPayment: false,
    });

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
    function columnsSelectAll() {
      selectAll.value = !selectAll.value;
      if (selectAll.value) {
        //Loop through each key of an columnsChecked and update each
        Object.keys(columnsChecked.value).forEach(
          (key) => (columnsChecked.value[key] = true)
        );
      } else {
        Object.keys(columnsChecked.value).forEach(
          (key) => (columnsChecked.value[key] = false)
        );
      }
    }
    onMounted(() => {
      getTodayTransaction();
    });
    return {
      dropDownShow,
      todayTransaction,
      columnsChecked,
      selectAll,
      getTodayTransaction,
      columnsSelectAll,
    };
  },
};
</script>
