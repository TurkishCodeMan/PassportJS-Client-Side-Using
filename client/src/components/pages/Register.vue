<template>
  <div class="row mt-5">
    <div class="col-md-6 m-auto">
      <div class="card card-body">
        <h1 class="text-center mb-3">
          <i class="fas fa-user-plus"></i> Register
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
            <label for="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              class="form-control"
              placeholder="Enter Name"
              v-model="user.name"
            />
          </div>
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
              placeholder="Create Password"
              v-model="user.password"
            />
          </div>
          <div class="form-group">
            <label for="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              class="form-control"
              placeholder="Confirm Password"
              v-model="user.password2"
            />
          </div>
          <button
            @click.prevent="register"
            type="submit"
            class="btn btn-primary btn-block"
          >
            Register
          </button>
        </form>
        <p class="lead mt-4">Have An Account?</p>
        <a href="/">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      response: "",
    };
  },

  methods: {
    ...mapActions(["postRegister"]),
    ...mapGetters(["getSelectedComponent"]),

    async register() {
      if (this.user.name != "" && this.user.email != "") {
        let res = await this.postRegister(this.user);

        if (!res.error) {
 
          this.selectedComponent = "appLogin";
        } else {
          this.response = res.error[0].msg;
          console.log(res);
        }
      } else {
        this.response = "Lütfen Tüm Alanları Doldurunuz";
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