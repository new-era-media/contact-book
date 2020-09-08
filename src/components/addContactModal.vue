<template>
  <div class="contact__modal-add">
    <div class="modal">
      <div class="modal-close" @click="modalClose">X</div>
      <form @submit.prevent="addContact">
        <input type="text" placeholder="Имя" v-model="name" />
        <input type="text" placeholder="Почта" v-model="email" />
        <p v-if="error" class="error">Заполнены не все поля</p>
        <button type="submit">Добавить</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      error: false
    };
  },
  methods: {
    ...mapMutations(["create_contact"]),
    modalClose() {
      this.$emit("modalClose", {
        satus: false
      });
    },
    // Добавление контакта
    addContact() {
      if (this.name !== "" && this.email !== "") {
        this.create_contact({
          name: this.name,
          email: this.email
        });
        this.modalClose();
        this.error = false;
      } else {
        this.error = true;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  input {
    margin: 10px;
    height: 30px;
    outline: none;
    padding: 10px;
  }
}
.error {
  font-size: 10px;
  color: red;
  margin-left: 15px;
}
</style>