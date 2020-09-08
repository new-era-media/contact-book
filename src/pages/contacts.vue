<template>
  <div class="contаcts">
    <!-- работа с компонентами -->
    <addContact v-if="modal_create" @modalClose="modalClose" />

    <deleteContact v-if="modal_delete">
      <div class="modal">
        <p>Вы действительно хотите удалить контакт</p>
        <button @click="deleteElement">Да</button>
        <button @click="modal_delete = false">Нет</button>
      </div>
    </deleteContact>

    <button class="contаcts__button" @click="modal_create = true">
      Добавить контакт
    </button>

    <ul v-if="CONTACTS.length !== 0">
      <!-- вывод полного списка контактов -->
      <li v-for="contact in CONTACTS" :key="contact.id">
        <p class="contаcts__title">{{ contact.name }}</p>
        <span>
          <!-- динамическая переадресация на страницу контакта -->
          <router-link tag="button" :to="`/edit/${contact.id}`"
            >Подробнее</router-link
          >
          <button @click="openDeleteModel(contact.id)">Удалить</button>
        </span>
      </li>
    </ul>
    <p class="absence-contacts" v-else>Контактов пока нет</p>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import addContact from "../components/addContactModal";
import deleteContact from "../components/confirmation";

export default {
  data() {
    return {
      modal_create: false,
      modal_delete: false,
      target_delete_id: ""
    };
  },
  components: {
    addContact,
    deleteContact
  },
  computed: mapGetters(["CONTACTS"]),
  methods: {
    ...mapMutations(["delete_contact"]),

    openDeleteModel(id) {
      // можно сделать без этой переменной на прямую, но в таком случае придется несколько раз рендерить компонент прдтверждения удаление контакта, это замедлит работу приложения
      this.target_delete_id = id;
      this.modal_delete = true;
    },
    //Удаление контакта
    deleteElement() {
      this.delete_contact({
        id: this.target_delete_id
      });
      this.modal_delete = false;
    },
    //Передача функции закрытия модалки
    modalClose() {
      this.$emit("modalClose", {
        satus: false
      });
      this.modal_create = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_variablex.scss";

.contаcts {
  @include main-block;
  &__title {
    margin: 10px;
    font-size: 18px;
    color: white;
  }
  &__button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
ul {
  width: 100%;
  max-width: 400px;
  list-style: none;
  & li {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    @include color-block;
    background-color: $block-color;
  }
}

.absence-contacts {
  color: white;
  margin: 10px;
}
</style>