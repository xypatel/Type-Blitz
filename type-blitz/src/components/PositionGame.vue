<script>
import * as styleFunctions from "./common_functions/style_functions.js";
import * as gameFunctions from "./common_functions/game_functions.js";
export default {
  data() {
    return {
      startTime: null,
      resultMatched: false,
      gameFinished: false,
      inputKey: "",
      inputString:"",
      stringSubmitted: "",
      stringToType:"fj",
      level: -1,
      correctCount: 0,
      incorrectCount: 0,
      elapsedTime: 0,
      elapsedCorrectTimes: [],
      correctWordTimes: [],
      finishedGameTimes:[],
      wordCorrectPercentages: [],
      scores: []
    };
  },
  methods: {
    onKeyup(event) {
      this.inputKey = event.key;

      this.handleInputStringTooLong();

      if(event.key == "Backspace"){
        this.handleBackspaceKey();
      } else if(event.key == "Enter"){
        this.handleEnterKey();
      } else {
        this.handleValidInputKey();
      }
    },
    handleInputStringTooLong(){
      if(this.inputString.length >= this.stringToType.length && gameFunctions.isValidInputKey(event.key)){
        this.inputString = "";
        styleFunctions.glowKeysToTypeYellow(document.getElementsByClassName("toType")[0].children);
      }
    },
    handleBackspaceKey(){
      const lastKeyToTypeElement = document.getElementsByClassName("toType")[0].children[this.inputString.length - 1];
      styleFunctions.glowInputKeyYellow(lastKeyToTypeElement);
      this.inputString = this.inputString.slice(0, -1);
    },
    handleEnterKey(){
      this.stringSubmitted = this.inputString;
      this.updateElapsedTime();
      this.checkInput();
      this.inputString = "";
      styleFunctions.glowKeysToTypeYellow(document.getElementsByClassName("toType")[0].children);
    },
    handleValidInputKey(){
      if(gameFunctions.isValidInputKey(event.key)){
        this.inputString += event.key;
        if(this.stringToType.charAt(this.inputString.length - 1) == event.key){
          const lastKeyToTypeElement = document.getElementsByClassName("toType")[0].children[this.inputString.length - 1];
          styleFunctions.glowInputKeyGreen(lastKeyToTypeElement);
        } else {
          const lastKeyToTypeElement = document.getElementsByClassName("toType")[0].children[this.inputString.length - 1];
          styleFunctions.glowInputKeyRed(lastKeyToTypeElement);
        }
      }
    },
    checkInput(){
      if(this.stringSubmitted === this.stringToType){
        this.resultMatched = true;
        this.correctCount++;

        if(this.level == -1){
          this.startTime = new Date().getTime();
        }
        console.log("Correct!");
        this.level++;

        if(this.elapsedCorrectTimes.length > 0){
          this.elapsedCorrectTimes.push(this.elapsedTime);
          this.correctWordTimes.push(parseFloat(this.elapsedCorrectTimes[this.elapsedCorrectTimes.length - 1] - this.elapsedCorrectTimes[this.elapsedCorrectTimes.length - 2]).toFixed(3));
        } else {
          this.elapsedCorrectTimes.push(this.elapsedTime);
        }

        this.changeKeysToTypeByLevel();
      } else {
        this.resultMatched = false;
        this.incorrectCount++;
        console.log("Incorrect!");
      }
    },
    changeKeysToTypeByLevel(){
      const combos = gameFunctions.generateKeysToType();
      this.stringToType = combos[this.level];
      if(this.level == combos.length){
        this.resetGame();
      }
    },
    updateElapsedTime () {
      if(this.level > -1){
        const currentTime = new Date().getTime();
        this.elapsedTime = (currentTime - this.startTime) / 1000;
      }
    },
    resetGame(){
      this.gameFinished = true;
      this.finishedGameTimes.push(this.elapsedTime);
      this.wordCorrectPercentages.push(parseFloat((this.correctCount / (this.correctCount + this.incorrectCount)) * 100).toFixed(2));
      this.scores.push(this.elapsedTime + " seconds" + " : " + this.wordCorrectPercentages[this.wordCorrectPercentages.length - 1] + "% correct");
      this.elapsedCorrectTimes = [];
      this.correctWordTimes = [];
      setTimeout(() => {
        this.gameFinished = false;
        this.level = -1;
        this.stringToType = "fj";
        this.elapsedTime = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
      }, 5000);
    }
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup);
  },
  beforeUnmount() {
    document.removeEventListener("keyup", this.onKeyup);
  },
};
</script>

<template>
  <div class="time">
    <p>Time: {{ elapsedTime }} seconds</p>
  </div>

  <div class="finishedGameTimes" v-if="this.finishedGameTimes.length != 0">
    <h2>Score</h2>
    <p v-for="(score, index) in scores" :key="index"> {{ index + 1 }}) {{ score }}</p>
  </div>

  <div id="inputKeyDisplay">
    <p>{{ inputKey }}</p>
  </div>
  <div class="result">
    <h1 v-if="resultMatched">&#9989</h1>
    <h1 v-else-if="!resultMatched && stringSubmitted.length > 0">&#10060</h1>
    <p>{{stringSubmitted}}</p>
  </div>

  <div class="aboveBoard" >
    <div class="toType" v-if="!gameFinished">
      <p v-for="(char, index) in stringToType" :key="char" id="{{ index }}" class="">{{ char }}</p>
    </div>
    <p id="gameDone" v-if="gameFinished">
      Finished in {{ finishedGameTimes[finishedGameTimes.length - 1] }} Seconds.
      Correct:{{ correctCount }} Incorrect:{{ incorrectCount }}
    </p>
  </div>

  <div id="wordTime">
    <p> {{ correctWordTimes[correctWordTimes.length - 1] }}</p>
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

#gameDone {
  font-size: 2em;
  font-family: Lucida Console, Courier, monospace;
  color: white;
  text-shadow: 2px 2px 10px turquoise;
  position: absolute;
  text-align: center;
  bottom: 60%;
  left: 0;
  width: 20em;
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
  position: absolute;
  bottom: 1em;
  left: 48%;
}
.toType{
  display: flex;
  width: 1em;
  text-align: center;
  font-size: 5em;
  font-family: Lucida Console, Courier, monospace;
  color: white;
  position: absolute;
  left: 1em;
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
  position: absolute;
  right: 1em;
  bottom: 1em;
}

.result p{
  padding-top: 1em;
  letter-spacing: .5em;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color : rgba(255, 255, 255, 0.1);
}

.result h1{
  padding-top: 1em;
  padding-right: 1em;
  font-size: 1em;
}

.time{
  width: fit-content;
  font-size: 1em;
  color: white;
  position: absolute;
  top: 2em;
  left: 2em;
  height: fit-content;
}

.finishedGameTimes {
  width: fit-content;
  font-size: 1em;
  color: white;
  position: absolute;
  top: 4em;
  left: 2em;
  height: fit-content;
}

#wordTime {
  width: fit-content;
  font-size: 1em;
  color : rgba(255, 255, 255, 0.3);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: absolute;
  top: 2em;
  left: 13em;
  height: fit-content;
}
</style>