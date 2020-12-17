import Vuex from "vuex";
import Vue from "vue"

Vue.use(Vuex)

import BackendService from "../services/BackendService"

export const store = new Vuex.Store({
   state:{
    user:{},
    selectedComponent:"appLogin"
   },
   getters:{
    getUser(state){
        return state.user;
    },
    getSelectedComponent(state){
        return state.selectedComponent;
    }
   },
   mutations:{
    setUser(state,value){
        state.user=value;
    },
    setSelectedComponent(state,value){
        state.selectedComponent=value
    }
   },
   actions:{
    async postLogin({commit},data){
        const response=await BackendService.postLogin(data);
        console.log(response)
        if(response.user){
            commit("setUser",response.user);
        }
        return response;
    },
    async postRegister({commit},data){
        console.log(data)
        console.log(commit)
        const response=await BackendService.postRegister(data);
        return response;
    },
    async postLogout({commit}){
        const response=await BackendService.postLogout();
        commit("setUser",{})
        return response;
    }
   }
})