<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Count from "@/components/count.vue";
import InputKeys from "@/components/InputKeys.vue";
import KeyboardDisplay from "@/components/KeyboardDisplay.vue";
</script>

<template>
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->
<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
  <div class="inputKeys">
    <InputKeys />
  </div>

  <div class="keyboard">
  <KeyboardDisplay />
  </div>
</template>

<style scoped>

.inputKeys{
  position: fixed;
  bottom: 30em;
  left: 0;
  right: 0;
  margin-top: 1em;
  display: flex;
  justify-content: center;
}
.keyboard {
  position: fixed;
  bottom: 5em;
  left: 0;
  right: 0;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;

}

</style>
