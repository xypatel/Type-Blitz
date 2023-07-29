<script>
export default {
  data() {
    return {
      inputKey: "",
      inputString:"",
    };
  },
  methods: {
    onKeyup(event) {
      this.inputKey = event.key;

      if(this.inputString.length > 5){
        this.inputString = "";
      }

      if(event.key == "Backspace"){
        this.inputString = this.inputString.slice(0, -1);
      } else if(event.key == "Enter"){
        this.inputString = "";
      } else {
        this.inputString += event.key;
      }


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
  <div id="inputKeyDisplay">
    <p>{{ inputKey }}</p>
  </div>
  <div id="inputString">
    <p>{{ inputString }}</p>
  </div>
</template>

<style scoped>
#inputKeyDisplay{
  width: fit-content;
  font-size: 2em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  position: absolute;
  top: 1em;
  right: 2em;
}
#inputString{
display: inline-block;
  width: fit-content;
  font-size: 2em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  position: absolute;
  top: 35em;
  left: 47%;
  inline-size: 6em;
  height: 5em;
  overflow: hidden;
  letter-spacing: .5em;
}
</style>