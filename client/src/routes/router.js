import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue"
import { store } from "../store/store"
const routes = [
    { path: "/", component: Home, name: "home", },
]




const router = new VueRouter({
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name == 'home' || store.state.user != {}) {
        if (store.state.selectedComponent == "appDashboard") {
            store.commit("setSelectedComponent", "appDashboard")
        }
    }
    // if the user is not authenticated, `next` is called twice
    next()
})


Vue.use(VueRouter);

export default router;