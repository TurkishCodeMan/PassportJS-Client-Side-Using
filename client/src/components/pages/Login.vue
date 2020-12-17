<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3">
          <i class="fas fa-sign-in-alt"></i> Login
        </h1>

        <div
          class="response btn btn-warning text-center position-relative"
          v-if="response != ''"
        >
          <p>{{ response }}</p>
          <i class="fas fa-times position-absolute" @click="response = ''"></i>
        </div>
        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="user.email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="user.password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click.prevent="login"
          >
            Login
          </button>
        </form>
        <p class="lead mt-4">No Account? <a>Register</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      response: "",
    };
  },

  methods: {
    ...mapGetters(["getSelectedComponent"]),
    ...mapActions(["postLogin"]),
    ...mapMutations(["setUser"]),
    async login() {
      console.log("Login");
      let res = await this.postLogin(this.user);

      if (!res.error) {
        this.setUser(res.user);
        this.selectedComponent = "appDashboard";
      } else {
        this.response = res.error.message;
        console.log(res);
      }
    },
  },

  computed: {
    selectedComponent: {
      get: function () {
        return this.getSelectedComponent();
      },
      set: function (value) {
        this.$store.commit("setSelectedComponent", value);
      },
    },
  },
};
</script>

<style>
</style>