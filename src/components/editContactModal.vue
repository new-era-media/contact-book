<template>
  <div class="contact__modal-add">
    <div class="modal">
      <div class="modal-close" @click="modalClose">X</div>
      <deleteModel v-if="modal_delete" :slotName="slotName">
        <template name="delete" v-if="slotName === 'delete'">
          <div class="modal">
            <p>Вы действительно хотите удалить контакт</p>
            <button @click="deleteField">Да</button>
            <button @click="modal_delete = false">Нет</button>
          </div>
        </template>
        <template name="delete" v-if="slotName === 'cancel'">
          <div class="modal" name="cancel">
            <p>Вы действительно хотите отменить изменения</p>
            <button @click="modalClose">Да</button>
            <button @click="modal_delete = false">Нет</button>
          </div>
        </template>
      </deleteModel>
      <form @submit.prevent>
        <label v-for="(contact, name) in buferObj" :key="contact.id">
          <input
            type="text"
            v-model="buferObj[name]"
            v-if="contact != buferObj['id']"
          />
          <div
            class="delete-field"
            @click="[openModelDelete(name), (slotName = 'delete')]"
            v-if="contact != buferObj['id']"
          >X</div>
        </label>

        <button @click="editContact">Редактировать</button>
        <button @click="update_contacts(oldObj)">Шаг назад</button>
        <button @click="[cancel(), (slotName = 'cancel')]">Отмена</button>
        <hr />
        <div class="addField">
          <input type="text" placeholder="Имя поля" v-model="field_name" />
          <input type="text" placeholder="Значение" v-model="field_data" />
          <button @click="addField(field_name, field_data)">
            Добавить поле
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

import deleteModel from "../components/confirmation";

export default {
  components: { deleteModel },
  data() {
    return {
      field_name: "",
      field_data: "",
      modal_delete: false,
      nameEl: "",
      oldObj: ""
    };
  },
  props: ["contactObj"],
  computed: {
    //Копируем объект, для дальнейшего изменения состояний без затрагивания первоначального объекта + для создания возможностио тмены действий
    buferObj() {
      return Object.assign({}, this.contactObj);
    }
  },
  methods: {
    ...mapMutations(["update_contacts"]),
    modalClose() {
      this.modal_delete = false;
      this.$emit("modalClose", {
        satus: false
      });
    },
    //Кнопка Редактирования
    editContact() {
      this.oldObj = Object.assign({}, this.contactObj);
      this.update_contacts(this.buferObj);
      // this.modalClose();
    },
    //Добавление полей
    addField(key, text) {
      if (this.field_name !== "" && this.field_data !== "") {
        this.oldObj = Object.assign({}, this.buferObj);
        this.buferObj[`${key}`] = text;
        this.field_name = this.field_data = "";
      }
    },
    openModelDelete(name) {
      this.nameEl = name;
      this.modal_delete = true;
    },
    //Удаление поля
    deleteField() {
      this.oldObj = Object.assign({}, this.buferObj);
      this.$delete(this.buferObj, this.nameEl);
      this.modal_delete = false;
    },
    //Шаг назад
    cancel() {
      if (JSON.stringify(this.buferObj) === JSON.stringify(this.contactObj)) {
        this.modalClose();
      } else {
        this.modal_delete = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/_mixins.scss";
@import "../styles/_variablex.scss";

.contact__modal-add {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.205);
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    width: 100%;
    max-width: 480px;
    border-radius: 10px;
    @include color-block;
    background-color: $block-color;
    position: relative;
    .modal-close {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $block-color;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
form {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  label {
    display: flex;
    margin: 0 10px;
    input {
      width: 100%;
      height: 30px;
      outline: none;
      padding: 10px;
    }
    .delete-field {
      width: 30px;
      height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }

  .addField {
    margin-top: 2rem;
    background-color: $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    input {
      width: 100%;
      height: 30px;
      outline: none;
      padding: 10px;
    }
  }
}
</style>