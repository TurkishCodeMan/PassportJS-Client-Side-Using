<template>
  <div class="container">
    <p class="text-success">Giriş Başarılı</p>
    {{ response }}
    <button class="btn btn-outline-primary" @click="logout">Çıkış Yap</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      response: "",
    };
  },
  methods: {
    ...mapGetters(["getSelectedComponent"]),
    ...mapActions(["postLogout"]),
    async logout() {
      let res = await this.postLogout();
      console.log(res);
      this.response = res.message;
      if (res.message != "") {
        this.selectedComponent = "appLogin";
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