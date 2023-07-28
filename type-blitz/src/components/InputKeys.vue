<script>
export default {
  data() {
    return {
      items: "",
      input: "",
    };
  },
  methods: {
    onKeyup(event) {
      if (event.key === "Enter") {
        this.items = this.input + "";
        this.input = "";
      } else {
        this.input += event.key;
      }
    },
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup);
  },
};
</script>

<template>
  <div>
    <p>{{ items }}</p>
    <h1>Keyboard Input</h1>
    <p>{{ input }}</p>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  height: 50px;
  font-size: 2rem;
}
p {
  white-space: pre-wrap;
  inline-size: 15em;
  overflow-wrap: break-word;
  font-size: 1em;
}
</style>