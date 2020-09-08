import VueRouter from "vue-router";

import editContact from "./pages/editContact.vue";
import contacts from "./pages/contacts.vue";

export default new VueRouter({
  routes: [
    {
      path: "",
      component: contacts
    },
    {
      path: "/edit/:id",
      component: editContact
    }
  ],
  mode: "history"
});
