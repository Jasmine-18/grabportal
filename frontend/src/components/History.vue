<template>
  <div class="h-screen bg-slate-300">
    <div class="dashboard p-4">
      <div class="mt-5 w-full">
        <h1 class="text-2xl text-black font-medium">Transaction History</h1>
      </div>

      <!-- Transaction History Chart-->
      <div class="mt-2 lg:flex block lg:gap-2">
        <div class="mt-2 bg-gray-800 p-5 w-full rounded-md box-border shadow">
          <h2 class="font-bold text-lg text-white">Transaction History</h2>
          <p class="text-gray-400 font-lexend font-normal">
            Before expand: date, ID, username, user phone, user email, amount,
            status -- After expand: MI ID, MI status, mode of payment
          </p>
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
          <div class="flex flex-col">
            <h2 class="text-xl font-bold mb-4 text-stone-600">Data Filter</h2>

            <div class="bg-white p-6 rounded-xl shadow-lg">
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
              >
                <div class="flex flex-col">
                  <label
                    for="userEmailFilter"
                    class="font-medium text-sm text-stone-600"
                    >User Email</label
                  >
                  <input
                    v-model="filter.userEmail"
                    type="email"
                    id="userEmailFilter"
                    placeholder="raj@mail.com"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    for="userPhoneFilter"
                    class="font-medium text-sm text-stone-600"
                    >User Phone</label
                  >
                  <input
                    v-model="filter.userPhone"
                    type="text"
                    id="userPhoneFilter"
                    placeholder="6012345678"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    for="transactionDateFilter"
                    class="font-medium text-sm text-stone-600"
                    >Transction Date</label
                  >
                  <input
                    v-model="filter.transactionDate"
                    type="date"
                    id="transactionDateFilter"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    for="denoFilter"
                    class="font-medium text-sm text-stone-600"
                    >Deno</label
                  >
                  <input
                    v-model="filter.amount"
                    type="text"
                    id="denoFilter"
                    placeholder="30"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    for="statusFilter"
                    class="font-medium text-sm text-stone-600"
                    >Status</label
                  >

                  <select
                    v-model="filter.status"
                    id="statusFilter"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  >
                    <option value="SUCCESS">Success</option>
                    <option value="FAILED">Failed</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>

              <div
                class="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6"
              >
                <button
                  class="px-4 py-2 rounded-lg text-stone-50 bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10"
                >
                  Reset
                </button>

                <button
                  @click="filterFunction()"
                  class="px-4 py-2 rounded-lg text-orange-50 bg-orange-400 hover:bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition ease-in-out duration-200 translate-10"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div class="wrapping-table mt-10 overflow-x-scroll lg:overflow-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
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
          <!-- Pagination -->
          <!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
  <div class="flex-1 flex justify-between sm:hidden">
    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
  </div>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">1</span>
        to
        <span class="font-medium">10</span>
        of
        <span class="font-medium">97</span>
        results
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Previous</span>
          <!-- Heroicon name: solid/chevron-left -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a href="#" aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
        <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
        <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
        <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
        <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
        <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
        <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
        <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Next</span>
          <!-- Heroicon name: solid/chevron-right -->
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>

          <!-- End of Pagination -->
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
import router from "../routes/routes";
import DataService from "../services/DataService";
export default {
  setup() {
    // const exampleItems = ref(
    //   [...Array(150).keys()].map((i) => ({
    //     id: i + 1,
    //     name: "Item " + (i + 1),
    //   }))
    // );

    const exampleItems = ref();
    const pageOfItems = ref([]);
    function onChangePage(pageOfItems) {
      // update page of items
      pageOfItems.value = pageOfItems;
    }
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
    const filter = ref({
      transactionDate: "2021-10-03", //always required, should be set as today
      userPhone: null,
      userEmail: null,
      amount: null,
      status: null,
    });
    function validateUser() {
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
    function filterFunction() {
      if (!filter.value.transactionDate) {
        filter.value.transactionDate = "2021-10-03";
      }
      DataService.getFilteredDataList(filter.value)
        .then((response) => {
          todayTransaction.value = response.data;
        })
        .catch((e) => {
          console.warn(e);
        });
    }
    onMounted(() => {
      validateUser();
      getTodayTransaction();
    });
    return {
      dropDownShow,
      todayTransaction,
      columnsChecked,
      selectAll,
      filter,
      validateUser,
      filterFunction,
      getTodayTransaction,
      columnsSelectAll,
    };
  },
};
</script>
