<template>
    <div>
        <div class="dashboard p-4">
            <div class="mt-5 w-full">
                <h1 class="text-2xl text-black dark:text-black font-medium">
                    Dashboard
                </h1>
            </div>
            <!-- grid wrapper card -->
            <div class="wrapper-card grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-2 mt-5">
                <!-- card  -->
                <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            RM 12,345
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Payouts</h2>
                    </div>
                </div>
                <!-- end card -->
                <div class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 shadow flex">
                    <div class="block p-2 w-full">
                        <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            256
                        </p>
                        <h2 class="font-normal text-gray-400 text-md mt-1">Total Sales</h2>
                    </div>
                </div>
                <!-- end card -->
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
            <!-- Total Transactions Chart -->
            <div class="mt-2 lg:flex block lg:gap-2">
                <div class="bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow">
                    <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
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
                    <div class="wrapper-button mt-3">
                        <select name="" id=""
                            class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border max-w-lg px-4 py-3 block rounded-md text-gray-500 dark:text-gray-400">
                            <option value="">Last 7 days</option>
                            <option value="">Last 30 days</option>
                        </select>
                        <button class="uppercase float-right -mt-7 border-b border-red-600 text-red-600">
                            Transaction Report
                        </button>
                    </div>
                </div>
            </div>
            <!-- Transaction History Chart-->
            <div class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow">
                <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
                    Transaction History
                </h2>
                <p class="text-gray-400 font-lexend font-normal">
                    Before expand: date, ID, username, user phone, user email, amount, status --
                    After expand: MI ID, MI status, mode of payment
                </p>
                <div class="wrapping-table mt-10">
                    <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    </table>
                </div>
                <div class="wrapper-button mt-3">
                    <select name="" id=""
                        class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border max-w-lg px-4 py-3 block rounded-md text-gray-500 dark:text-gray-400">
                        <option value="">Last 7 days</option>
                        <option value="">Last 30 days</option>
                    </select>
                    <button class="uppercase float-right -mt-7 border-b border-red-600 text-red-600">
                        Transaction History
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
    setup() {

    }
};
</script>
