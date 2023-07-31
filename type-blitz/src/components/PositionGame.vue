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

      if(this.inputString.length >= 4 && event.key != "Backspace" && event.key != "Enter"){
        this.inputString = "";
        const charToType = document.getElementsByClassName("toType")[0].children;
        for(let i = 0; i < charToType.length; i++){
          charToType[i].style.textShadow = "1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod";
        }
      }

      if(event.key == "Backspace"){
        const charToRemove = this.inputString.charAt(this.inputString.length - 1);
        if(this.keysToType.charAt(this.inputString.length - 1) == charToRemove){
          const correct = this.inputString.length - 1;
          const correctChar = document.getElementsByClassName("toType")[0].children[correct];
          correctChar.style.textShadow = "1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod";
        }
        this.inputString = this.inputString.slice(0, -1);
      } else if(event.key == "Enter"){
        this.keysEntered = this.inputString;
        this.updateElapsedTime();
        this.checkInput();
        this.inputString = "";
        const charToType = document.getElementsByClassName("toType")[0].children;
        for(let i = 0; i < charToType.length; i++){
          charToType[i].style.textShadow = "1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod";
        }
      } else if(event.key != "Shift" && event.key != "Tab"){
        this.inputString += event.key;
        if(this.keysToType.charAt(this.inputString.length - 1) == event.key){
          const correct = this.inputString.length - 1;
          const correctChar = document.getElementsByClassName("toType")[0].children[correct];
          correctChar.style.textShadow = "1px 1px 2px black, 0 0 25px green, 0 0 10px limegreen";
        } else {
          const incorrect = this.inputString.length - 1;
          const incorrectChar = document.getElementsByClassName("toType")[0].children[incorrect];
          incorrectChar.style.textShadow = "1px 1px 2px black, 0 0 25px red, 0 0 10px crimson";
        }
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
      const randomIndex = Math.floor(Math.random() * combos.length);
      this.keysToType = combos[randomIndex];
    },
    changeKeysToTypeByLevel(){
      const combos = this.createKeyCombos();
      this.keysToType = combos[this.level];
    },
    createKeyCombos(){
      const doublesHome = ["ff", "jj", "dd", "kk", "ss", "ll", "aa", ";;", "gg", "hh"];
      const foursHome = ["asdf", "jkl;", "sdfg", "hjkl"];
      const doublesTop = ["uu", "rr", "ii", "ee", "oo", "ww", "pp", "qq", "yy", "tt"];
      const foursTop = ["uiop",  "qwer", "yuio", "wert"];
      const doublesBottom = ["mm", "vv", ",,", "cc", "..", "xx", "//", "zz", "nn", "bb"];
      const foursBottom = ["m,./", "zxcv", "nm,.", "xcvb"];
      const doublesNumbers = ["11", "22", "33", "44", "55", "66", "77", "88", "99", "00"];
      const foursNumbers = ["1234",  "2345", "6789", "7890"];

      const combos = [
          ...doublesHome, ...foursHome, ...doublesTop, ...foursTop, ...doublesBottom,
          ...foursBottom, ...doublesNumbers, ...foursNumbers
      ];

      const combosReversed = [];
      for(let i = 0; i < combos.length; i++){
        if(combos[i].length == 4){
          combosReversed.push(combos[i].split("").reverse().join(""));
        }
      }
      return [...combos, ...combosReversed];
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

  <div id="inputKeyDisplay">
    <p>{{ inputKey }}</p>
  </div>

  <div class="aboveBoard">
    <div class="toType">
      <p v-for="(char, index) in keysToType" :key="char" id="{{ index }}" class="">{{ char }}</p>
    </div>

    <div class="result">
      <p>{{keysEntered}}</p>
      <h1 v-if="resultMatched">&#9989</h1>
      <h1 v-else-if="!resultMatched && keysEntered.length > 0">&#10060</h1>
    </div>
  </div>
  <div id="inputString">
    <p>{{ inputString }}</p>
  </div>
</template>

<style scoped>
.aboveBoard{
  position: relative;
  bottom: 10em;
  left: 25em;
}
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
  width: fit-content;
  font-size: 2em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  inline-size: 6em;
  height: 2em;
  letter-spacing: .5em;
  position: relative;
  top: 10em;
  right: 17em;
}
.toType{
  display: flex;
  width: 1em;
  text-align: center;
  font-size: 5em;
  font-family: Lucida Console, Courier, monospace;
  color: white;
  position: absolute;
  right: 8em;
  inline-size: 6em;
  height: fit-content;
  letter-spacing: 1em;
}

.toType p{
  margin: auto;
  padding-left: .1em;
  text-shadow: 1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod;
}

.result{
  display: inline-flex;
  width: fit-content;
  font-size: 2em;
  color: white;
  inline-size: 6em;
  height: fit-content;
  position: relative;
  top: 5em;
  left: 4em;
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
  top: 3em;
  left: 2em;
  height: fit-content;
}
</style>