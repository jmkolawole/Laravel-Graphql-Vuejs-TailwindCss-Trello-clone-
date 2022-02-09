<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container sm:mt-10 flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">Laravello</div>

      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        <div
          v-if="errors.length"
          class="
            p-2
            bg-red-600
            text-gray-100
            rounded-sm
            mb-6
            text-sm text-center
          "
        >
          <div v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </div>
        </div>
        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Sign up a Laravello Account
        </div>
        <form action="" @submit.prevent="register">
          <div class="w-full mb-4">
            <input
              type="text"
              class="
                rounded-sm
                px-4
                py-2
                outline-none
                focus:outline-none
                border-gray-400
                bg-gray-100
                border-solid border-2
                w-full
                text-sm
              "
              placeholder="Full Name"
              v-model="name"
            />
          </div>

          <div class="w-full mb-4">
            <input
              type="text"
              class="
                rounded-sm
                px-4
                py-2
                outline-none
                focus:outline-none
                border-gray-400
                bg-gray-100
                border-solid border-2
                w-full
                text-sm
              "
              placeholder="Enter Email"
              v-model="email"
            />
          </div>

          <div class="w-full mb-4">
            <input
              type="password"
              class="
                rounded-sm
                px-4
                py-2
                outline-none
                focus:outline-none
                border-gray-400
                bg-gray-100
                border-solid border-2
                w-full
                text-sm
              "
              placeholder="Enter Password"
              v-model="password"
            />
          </div>

          <div class="w-full mb-4">
            <input
              type="password"
              class="
                rounded-sm
                px-4
                py-2
                outline-none
                focus:outline-none
                border-gray-400
                bg-gray-100
                border-solid border-2
                w-full
                text-sm
              "
              placeholder="Enter Password"
            />
          </div>

          <div class="w-full mb-6">
            <button
              type="submit"
              class="
                rounded-sm
                px-4
                py-2
                text-sm
                bg-green-500
                w-full
                font-bold
                outline-none
                focus:outline-none
                hover:bg-opacity-75
                disabled:opacity-25
              "
            >
              Register
            </button>
          </div>
        </form>
        <div class="bg bg-gray-400 h-px w-full mb-6"></div>
        <div class="text-center text-sm">
          <router-link
            :to="{ name: 'login' }"
            class="text-blue-600 hover:underline"
            >Already have an account, login to your account
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { gqlErrors } from "./utils";
import Register from "./graphql/Register.gql";
export default {
  data() {
    return {
      email: null,
      password: null,
      name: null,
      errors: [],
    };
  },
  methods: {
    async register() {
      this.errors = [];
      try {
        const response = await this.$apollo.mutate({
          mutation: Register,
          variables: {
            email: this.email,
            password: this.password,
            name: this.name,
          },
        });

        const user = response.data?.register;
        if (user) {
          this.$store.dispatch("setLoggedIn", true);
          this.$store.commit("setUser", user);
          this.$router.push({ name: "board" });
        }
      } catch (err) {
        this.errors = gqlErrors(err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 300px;
  max-width: 300px;
}

@media (min-width: 640px) {
  .container {
    width: 400px;
    max-width: 400px;
  }
}
</style>