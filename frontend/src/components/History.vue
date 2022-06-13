<template>
    <div class="h-screen bg-slate-300">
        <div class="dashboard p-4">
            <div class="mt-5 w-full">
                <h1 class="text-2xl text-black text-black font-medium">
                    Transaction History
                </h1>
            </div>

            <!-- Transaction History Chart-->
            <div class="mt-2 lg:flex block lg:gap-2">
                <div class=" mt-2 bg-white bg-gray-800 p-5 w-full rounded-md box-border shadow">
                    <h2 class="font-bold text-lg text-gray-800 text-gray-200">
                        Transaction History
                    </h2>
                    <p class="text-gray-400 font-lexend font-normal">
                        Before expand: date, ID, username, user phone, user email, amount, status --
                        After expand: MI ID, MI status, mode of payment
                    </p>
                    <div class="wrapping-table mt-10">
                        <table
                            class="w-full text-sm text-left text-gray-500 text-gray-400 lg:overflow-auto overflow-x-scroll">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-700 text-gray-400">
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
                        <button class="float-right mt-3 border-b border-red-600 text-red-600">
                            download with icon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default ({
    setup() {

    },
})
</script>
