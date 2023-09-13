<script>
import * as styleFunctions from "./common_functions/style_functions.js";
import * as gameFunctions from "./common_functions/game_functions.js";
import {Timer} from "../utility/timer";
// const Timer = require("../utility/timer");
export default {
  data() {
    return {
      resultMatched: false,
      gameStarted: false,
      gameFinished: false,
      inputKey: "",
      inputString:"",
      stringSubmitted: "",
      stringToType:"fj",
      level: -1,
      correctCount: 0,
      incorrectCount: 0,
      correctPercent: 0,
      scoreboard: [],
      stringsToType : [],
      timer : new Timer(),
    };
  },
  methods: {
    onKeyup(event) {
      this.inputKey = event.key;

      if(event.key == "Backspace"){
        this.handleBackspaceKey();
      } else if(event.key == "Enter"){
        this.handleEnterKey();
      } else if(event.key == "Escape"){
        this.endGame();
      }  else {
        this.handleValidInputKey();
      }

    },
    handleInputStringTooLong(){
        this.inputString = "";
        styleFunctions.glowKeysToTypeYellow(document.getElementsByClassName("toType")[0].children);
    },
    handleBackspaceKey(){
      const lastKeyToTypeElement = document.getElementsByClassName("toType")[0].children[this.inputString.length - 1];
      styleFunctions.glowInputKeyYellow(lastKeyToTypeElement);
      this.inputString = this.inputString.slice(0, -1);
    },
    handleEnterKey(){
      this.stringSubmitted = this.inputString;
      this.checkSubmission();
      this.inputString = "";
      styleFunctions.glowKeysToTypeYellow(document.getElementsByClassName("toType")[0].children);
    },
    handleValidInputKey(){
      if(gameFunctions.isValidInputKey(event.key)){
        if(this.inputString.length >= this.stringToType.length){
          this.handleInputStringTooLong();
        }
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
    checkSubmission(){
      if(this.stringSubmitted === this.stringToType){
        this.resultMatched = true;
        if(this.gameStarted === false){
          this.startGame()
        }
        this.nextLevel();
      } else {
        this.resultMatched = false;
        this.updateScore();
      }
    },
    startGame(){
      this.gameStarted = true;
      this.timer.startTimer();
      this.stringsToType = gameFunctions.generateKeysToType();
      this.correctCount = -1;
    },
    nextLevel(){
      this.updateScore();
      this.level++;
      this.stringToType = this.stringsToType[this.level];
      if(this.level == this.stringsToType.length){
        this.endGame();
      }
    },
    updateScore(){
      if(this.gameStarted === true){
        if(this.resultMatched === true){
          this.correctCount++;
          this.timer.updateTimer();
        } else {
          this.incorrectCount++;
        }
        this.correctPercent = gameFunctions.calculatePercentCorrect(this.correctCount, this.incorrectCount + this.correctCount);

      }
    },
    endGame(){
      this.gameFinished = true;
      this.updateScoreboard();
      this.timer.stopTimer();
      this.resetGameVariables();
    },
    updateScoreboard(){
      this.scoreboard.push(
          {
            "correctCount": this.correctCount,
            "incorrectCount": this.incorrectCount,
            "correctPercent": this.correctPercent,
            "elapsedTime": this.timer.elapsedTime,
          }
      );
    },
    resetGameVariables(){
      setTimeout(() => {
        this.gameStarted = false;
        this.gameFinished = false;
        this.resultMatched = false;
        this.level = -1;
        this.stringToType = "fj";
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.correctPercent = 0;
        this.stringsToType = [];
        this.timer.resetTimer();
      }, 3000);
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

  <div id="score">
    <p>Time: {{ timer.elapsedTime }} seconds | +  {{ timer.secondsPerLevel[timer.secondsPerLevel.length - 1] }} | {{ correctCount }} / {{ incorrectCount + correctCount }} | {{ correctPercent }}%</p>
  </div>

  <div class="allScores" v-if="this.scoreboard.length != 0">
    <h2>Scoreboard</h2>
    <p v-for="(score, index) in scoreboard" :key="index"> {{ index + 1 }}) {{ score.elapsedTime }} seconds | {{ score.correctCount }} / {{ score.incorrectCount + score.correctCount }} | {{ score.correctPercent }}% </p>
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
      Finished in {{ timer.elapsedTime }} Seconds.
      Correct:{{ correctCount }} Incorrect:{{ incorrectCount }}
    </p>
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

#score {
  width: fit-content;
  font-size: 1.25em;
  color : rgba(255, 255, 255, 0.5);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: left;
  position: absolute;
  top: 1em;
  left: 1em;
  height: fit-content;
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

.allScores {
  width: fit-content;
  font-size: 1em;
  color: white;
  position: absolute;
  top: 4em;
  left: 2em;
  height: fit-content;
}
</style>