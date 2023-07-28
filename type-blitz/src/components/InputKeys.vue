<script>
import { ref } from 'vue'

export default {
  setup() {
    const input = ref('')
    const items = ref([])
    const add = () => {
      items.value.push(input.value)
      input.value = ''
    }

    return { input, items, add }
  },
}
</script>

<template>
  <div>
<!--    <p>{{ items }}</p>-->
    <h3>Keyboard Input</h3>
    <p>{{ input }}</p>
    <input type="text" v-model="input" @keyup="add">
  </div>
</template>

<style scoped>
input {
  width: 100%;
  height: 50px;
  font-size: 2rem;
}
</style>