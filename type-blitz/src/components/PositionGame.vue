<script>
export default {
  data() {
    return {
      inputKey: "",
      inputString:"",
      keysToType:"fj",
      resultMatched: false,
      keysEntered: "",
      level: -1,
      startTime: null,
      elapsedTime: 0,
    };
  },
  methods: {
    onKeyup(event) {
      this.inputKey = event.key;

      if(this.inputString.length >= 5){
        this.inputString = this.inputString.slice(1);
      }

      if(event.key == "Backspace"){
        this.inputString = this.inputString.slice(0, -1);
      } else if(event.key == "Enter"){
        this.keysEntered = this.inputString;
        this.updateElapsedTime();
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
        this.level++;
        this.changeKeysToTypeByLevel();
      } else {
        this.resultMatched = false;
        console.log("Incorrect!");
      }
    },
    changeKeysToTypeRandomly(){
      const combos = ["asdf", "qwer", "zxcv", "jkl;", "uiop", "nm,.", "1234", "5678", "90", "-=", "[]\\"];
      const randomIndex = Math.floor(Math.random() * combos.length);
      this.keysToType = combos[randomIndex];
    },
    changeKeysToTypeByLevel(){
      const doublesHome = ["ff", "jj", "dd", "kk", "ss", "ll", "aa", ";;"];
      const foursHome = ["asdf", "jkl;", "fdsa", ";lkj"];
      const doublesTop = ["uu", "rr", "ii", "ee", "oo", "ww", "pp", "qq"];
      const foursTop = ["uiop",  "qwer", "poiu", "rewq"];
      const doublesBottom = ["mm", "vv", ",,", "cc", "..", "xx", "//", "zz"];
      const foursBottom = ["m,./", "zxcv", "/.,m", "vcxz"];
      const doublesNumbers = ["11", "22", "33", "44", "55", "66", "77", "88", "99", "00"];
      const foursNumbers = ["1234",  "2345", "6789", "7890"];

      const combos = [...doublesHome, ...foursHome, ...doublesTop, ...foursTop, ...doublesBottom, ...foursBottom, ...doublesNumbers, ...foursNumbers];

      this.keysToType = combos[this.level];
    },
    updateElapsedTime () {
      const currentTime = new Date().getTime();
      this.elapsedTime = (currentTime - this.startTime) / 1000;
    }
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup);
    this.startTime = new Date().getTime()
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup);
  },
};
</script>

<template>
  <div class="time">
    <p>Time: {{ elapsedTime }} seconds</p>
  </div>
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
  letter-spacing: .5em;
}
.toType{
  display: inline-block;
  text-align: center;
  font-size: 5em;
  font-family: Lucida Console, Courier, monospace;
  padding-left: .25em;
  color: white;
  position: absolute;
  top: 8em;
  left: 35%;
  inline-size: 6em;
  height: fit-content;
  overflow: hidden;
  letter-spacing: 1em;
  text-shadow: 1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod;
}

.result{
  display: inline-flex;
  width: fit-content;
  font-size: 2em;
  color: white;
  position: absolute;
  bottom: 35em;
  left: 45%;
  inline-size: 6em;
  height: fit-content;
}

.result p{
  padding-top: 1em;
  letter-spacing: 1em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color : rgba(255, 255, 255, 0.1);
}

.result h1{
  margin-left: 10%;
  padding-top: 1em;
  font-size: 1em;
}

.time{
  width: fit-content;
  font-size: 1em;
  color: white;
  position: absolute;
  top: 1em;
  left: 2em;
  height: fit-content;
}
</style>