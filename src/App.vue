<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

@import "../src/styles/_variablex.scss";
@import "../src/styles/_mixins.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Playfair Display", serif;
}

body {
  background-color: $main-color;
}

button {
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  @include color-block;
  background-color: #272727;
  margin: 10px;
  outline: none;
  &:hover {
    background-color: #383838;
  }
}
</style>