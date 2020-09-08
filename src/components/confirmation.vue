<template>
  <!-- компонент запроса подтверждения -->
  <div class="contact__modal-add">
    <slot />
  </div>
</template>
<script>
export default {
  props: ["slotName"]
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
    padding: 15px;
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
</style>