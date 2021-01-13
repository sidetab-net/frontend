import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // baseURL: 'http://localhost/sistemankalizi/api/api/',
    baseURL: 'http://sidetab.net/api/',
    blogs: [],
    notice: [],
  },
  mutations: {
    initBlogs(state, data){
      state.blogs = data;
    },
    initNotice(state, data){
      state.notice = data;
    }
  },
  actions: {
    fetchBlogs(context){
      Axios.get(this.state.baseURL).then(res => {
        context.commit('initBlogs', res.data);
      })
    },
    fetchNotice(context){
      Axios.get(this.state.baseURL + 'notice').then(res => {
        context.commit('initNotice', res.data);
      })
    }
  },
  getters: {
    getBlogs(state){
      return state.blogs;
    },
    getNotice(state){
      return state.notice;
    }
  }
})
