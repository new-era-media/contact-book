<template>
  <div class="contactPersone">
    <router-link class="contactPersone__title" to="/" tag="h2"
      >Контакты</router-link
    >
    <editModal
      v-if="modal_edit"
      :contactObj="contactObj"
      @modalClose="modalClose"
    />
    <button @click="edit">Редактировать</button>
    <ul>
      <li
        style="margin:20px"
        v-for="(item, name) in CONTACTS[0]"
        :key="item.id"
      >
        <p v-if="name !== 'id'">{{ name }} - {{ item }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import editModal from "../components/editContactModal";

export default {
  components: { editModal },
  data() {
    return {
      modal_edit: false
    };
  },
  computed: {
    ...mapGetters(["CONTACTS"]),
    contactObj() {
      return this.CONTACTS.find(el => el.id == this.$route.params.id);
    }
  },
  methods: {
    modalClose(data) {
      this.modal_edit = data.status;
    },
    edit() {
      this.modal_edit = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_variablex.scss";

.contactPersone {
  @include main-block;
  color: white;
  &__title {
    color: white;
    cursor: pointer;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    width: 100%;
    max-width: 400px;
    list-style: none;
    margin-top: 10px;
    @include color-block;
    background-color: $block-color;
    padding: 10px;
    border-radius: 10px;
    li {
      margin: 5px !important;
      padding: 10px;
    }
  }
  button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>