<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// @import '~normalize.css';
// @import '~reset-css/_reset.scss';
* {
    box-sizing: border-box;
}
html, body{
  padding: 0;
  margin: 0;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  font-size: 24px;
  overflow: hidden;
}
body{
  background: linear-gradient(270deg, #ffffff, #9f9f9f);
background-size: 400% 400%;

-webkit-animation: AnimationName 50s ease infinite;
-moz-animation: AnimationName 50s ease infinite;
animation: AnimationName 50s ease infinite;

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
}
</style>
