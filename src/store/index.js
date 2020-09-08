import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: "Admin",
        email: "admin@mail.ru",
        id: 12341256621231512,
      },
    ],
  },
  getters: {
    CONTACTS: (state) => {
      return state.contacts;
    },
  },
  mutations: {
    create_contact: (state, data) => {
      state.contacts.push({
        name: data.name,
        email: data.email,
        id: new Date().getTime(),
      });
    },
    delete_contact: (state, data) => {
      state.contacts = state.contacts.filter((el) => el.id !== data.id);
    },
    update_contacts: (state, data) => {
      const a = state.contacts.map((el) => {
        if (el.id === data.id) {
          return data;
        }
        return el;
      });
      state.contacts = a;
    },
  },
});
