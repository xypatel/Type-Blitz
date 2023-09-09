<script>
import * as styleFunctions from "./common_functions/style_functions.js";
import * as gameFunctions from "./common_functions/game_functions.js";
export default {
  data() {
    return {
      startTime: null,
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
      elapsedTime: 0,
      correctPercent: 0,
      elapsedTimesAtEachCorrectSubmission: [],
      secondsPerCorrectSubmissions: [],
      scoreboard: []
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
      this.correctPercent = gameFunctions.calculatePercentCorrect(this.correctCount, this.incorrectCount + this.correctCount);
      this.updateElapsedTime();
      this.checkSubmission();
      this.updateResultCounts();
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
        if(this.level == -1){
          this.startGame()
        }
        this.level++;

        if(this.elapsedTimesAtEachCorrectSubmission.length > 0){
          this.elapsedTimesAtEachCorrectSubmission.push(this.elapsedTime);
          this.secondsPerCorrectSubmissions.push(parseFloat(this.elapsedTimesAtEachCorrectSubmission[this.elapsedTimesAtEachCorrectSubmission.length - 1] - this.elapsedTimesAtEachCorrectSubmission[this.elapsedTimesAtEachCorrectSubmission.length - 2]).toFixed(3));
        } else {
          this.elapsedTimesAtEachCorrectSubmission.push(this.elapsedTime);
        }

        this.changeKeysToTypeByLevel();
      } else {
        this.resultMatched = false;
      }
    },
    startGame(){
      this.gameStarted = true;
      this.startTime = new Date().getTime();
    },
    changeKeysToTypeByLevel(){
      const combos = gameFunctions.generateKeysToType();
      this.stringToType = combos[this.level];
      if(this.level == combos.length){
        this.endGame();
      }
    },
    updateResultCounts(){
      if(this.gameStarted){
        if(this.resultMatched){
          this.correctCount++;
        } else {
          this.incorrectCount++;
        }
      }
    },
    updateElapsedTime () {
      if(this.level > -1){
        const currentTime = new Date().getTime();
        this.elapsedTime = (currentTime - this.startTime) / 1000;
      }
    },
    endGame(){
      this.gameFinished = true;
      this.updateScoreboard();
      this.resetGameVariables();
    },
    updateScoreboard(){
      this.scoreboard.push(
          {
            "correctCount": this.correctCount,
            "incorrectCount": this.incorrectCount,
            "correctPercent": this.correctPercent,
            "elapsedTime": this.elapsedTime,
          }
      );
    },
    resetGameVariables(){
      setTimeout(() => {
        this.gameStarted = false;
        this.gameFinished = false;
        this.resultMatched = false;
        this.startTime = null;
        this.level = -1;
        this.stringToType = "fj";
        this.elapsedTime = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.correctPercent = 0;
        this.elapsedTimesAtEachCorrectSubmission = [];
        this.secondsPerCorrectSubmissions = [];
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

  <div class="allScores" v-if="this.scoreboard.length != 0">
    <h2>Score</h2>
    <p v-for="(score, index) in scoreboard" :key="index"> {{ index + 1 }}) {{ score.elapsedTime }} seconds | Correct: {{ score.correctCount }}  Incorrect:{{ score.incorrectCount }} | {{ score.correctPercent }}% </p>
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
      Finished in {{ elapsedTime }} Seconds.
      Correct:{{ correctCount }} Incorrect:{{ incorrectCount }}
    </p>
  </div>

  <div id="wordTime">
    <p> {{ secondsPerCorrectSubmissions[secondsPerCorrectSubmissions.length - 1] }}</p>
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

.allScores {
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