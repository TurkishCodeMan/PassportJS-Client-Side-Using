<template>
  <div class="container text-center">
    <div class="card text-center w-100">
      <div class="card-header">
        <i class="fas fa-unlock-alt fa-3x"></i>
        <div class="card-body">
          <button
            class="btn btn-primary mr-5"
            @click="store.state.user!={}?'appLogin':selectedComponent "
          >
            Register
          </button>
          <button
            class="btn btn-outline-warning"
            @click="store.state.user!={}?'appLogin':selectedComponent "
          >
            Login
          </button>
        </div>
      </div>
    </div>
    <component :is="selectedComponent"> </component>
  </div>
</template>

<script>
import BackendService from "../services/BackendService";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Dashboard from "../components/pages/Dashboard"
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      data: "",
    };
  },

  components: {
    appLogin: Login,
    appRegister: Register,
    appDashboard:Dashboard
  },

  methods: {
    ...mapGetters(["getSelectedComponent"]),

    ...mapMutations(["setSelectedComponent"]),
  },
  computed: {
    selectedComponent: {
      get: function () {
        return this.getSelectedComponent();
      },
      set: function (value) {
        this.$store.commit("setSelectedComponent",value)
      },
    },
  },
  async created() {
    let data = await BackendService.getIndex();
    this.data = data;
  },
};
</script>

<style>
</style>