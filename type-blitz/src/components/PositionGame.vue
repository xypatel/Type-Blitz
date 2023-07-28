<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    onKeyup(event) {
      this.input = event.key;
      console.log("game : " + event.key)
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
  <div id="inputDisplay">
    <p>{{ input }}</p>
  </div>
</template>

<style scoped>
#inputDisplay{
  width: fit-content;
  font-size: 2em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  position: absolute;
  top: 1em;
  right: 2em;
}
</style>