<script>
export default {
  data() {
    return {
      inputKey: "",
      inputString:"",
      keysToType:"jkl;",
      resultMatched: false,
      keysEntered: "",
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
        this.keysEntered = this.inputString;
        this.checkInput();
        this.inputString = "";
      } else if(event.key != "Shift" && event.key != "Tab"){
        this.inputString += event.key;
      }

      console.log("PositionGame : " + event.key)
    },
    checkInput(){
      if(this.keysEntered === this.keysToType){
        this.resultMatched = true;
        console.log("Correct!");
        this.changeKeysToTypeRandomly()
      } else {
        this.resultMatched = false;
        console.log("Incorrect!");
      }
    },
    changeKeysToTypeRandomly(){
      const combos = ["asdf", "qwer", "zxcv", "jkl;", "uiop", "nm,.", "1234", "5678", "90", "-=", "[]\\"];
      const randomIndex = Math.floor(Math.random() * combos.length);
      this.keysToType = combos[randomIndex];
    }
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
  <div class="toType">
    <p>{{ keysToType }}</p>
  </div>
  <div class="result">
    <p>{{keysEntered}}</p>
    <h1 v-if="resultMatched">&#9989</h1>
    <h1 v-else-if="!resultMatched && keysEntered.length > 0">&#10060</h1>
  </div>
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
.toType{
  display: inline-block;
  text-align: center;
  font-size: 5em;
  font-family: Lucida Console, Courier, monospace;
  padding-left: .25em;
  color: deepskyblue;
  position: absolute;
  top: 8em;
  left: 35%;
  inline-size: 6em;
  height: fit-content;
  overflow: hidden;
  letter-spacing: 1em;
  border-style: dashed;
  border-width: 2px;
  border-radius: .5em;
  border-color: limegreen;
}

.result{
  display: flex;
  width: fit-content;
  font-size: 5em;
  color: white;
  position: absolute;
  top: 5em;
  left: 33%;
  inline-size: 6em;
  height: fit-content;
}

.result p{
  padding-top: 1em;
  letter-spacing: 1em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>