<template>
  <div>
    <div class="grid place-items-center bg-gray-200">
      <!-- Placing the Grab and PayHub images at the top of the Login page -->
      <div class="flex flex-wrap justify-center m-20">
        <img alt="Grab logo" src="../assets/grab.png" class="h-10 w-auto" />
        <img alt="PayHub logo" src="../assets/payhub.png" class="h-11 w-auto" />
      </div>

      <!-- The title/main text right under the images -->
      <h1 class="text-xl m-10 font-bold">
        Login to Grab Reload Reporting Portal
      </h1>

      <!-- The username input box -->
      <div>
        <input v-model="user.username" type="text" placeholder="Enter your username"
          class="px-5 py-1 border-solid border-2 rounded-lg" />
      </div>

      <!-- The password input box -->
      <div class="m-5">
        <input v-model="user.password" type="password" placeholder="Enter your password"
          class="px-5 py-1 border-solid border-2 rounded-lg" />
      </div>
      <div v-if="user.error">{{ user.errorMsg }}</div>

      <!-- The Login button -->
      <div class="m-5">
        <button @click="login()" class="px-3 py-1.5 btn ml-2 border-green-500 bg-green-500 rounded-lg">
          LOGIN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import DataService from "../services/DataService";
export default {
  name: "Login",
  setup() {
    const user = ref({
      username: "",
      password: "",
      error: false,
      errorMsg: "",
    });

    function login() {
      DataService.login(user.value)
        .then((response) => {
          // this.$router.push(this.$route.query.redirect || '/dashboard')
          user.value.error = false;
          console.log(response.data);
        })
        .catch((e) => {
          user.value.error = true;
          user.value.errorMsg = e.response.data.message;
          console.warn(e.response.data.message);
        });
    }
    return {
      user,
      login,
    };
  },
};
</script>
