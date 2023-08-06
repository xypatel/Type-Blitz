<script>
export default {
  data() {
    return {
      pinkyColor: "hsl(210, 100%, 50%)",
      ringColor: "hsl(190, 100%, 50%)",
      middleColor: "hsl(171, 100%, 50%)",
      pointer1stColor: "hsl(155, 100%, 50%)",
      pointer2ndColor: "hsl(145, 100%, 50%)",
    };
  },
  methods: {
    setColors(colorScheme) {
      const classic = {
        pinkyColor: "hsl(210, 100%, 50%)",
        ringColor: "hsl(190, 100%, 50%)",
        middleColor: "hsl(171, 100%, 50%)",
        pointer1stColor: "hsl(155, 100%, 50%)",
        pointer2ndColor: "hsl(145, 100%, 50%)",
      }

      const aqua = {
        pinkyColor: "hsl(220, 100%, 50%)",
        ringColor: "hsl(220, 100%, 60%)",
        middleColor: "hsl(200, 100%, 50%)",
        pointer1stColor: "hsl(180, 100%, 60%)",
        pointer2ndColor: "hsl(160, 100%, 60%)",
      }

      const fire = {
        pinkyColor: "hsl(5, 100%, 50%)",
        ringColor: "hsl(20, 100%, 50%)",
        middleColor: "hsl(30, 100%, 50%)",
        pointer1stColor: "hsl(35, 100%, 50%)",
        pointer2ndColor: "hsl(40, 100%, 50%)",
      }

      const steel = {
        pinkyColor: "hsl(0, 0%, 30%)",
        ringColor: "hsl(0, 0%, 40%)",
        middleColor: "hsl(0, 0%, 50%)",
        pointer1stColor: "hsl(0, 0%, 60%)",
        pointer2ndColor: "hsl(0, 0%, 80%)",
      }

      const bubblegum = {
        pinkyColor: "hsl(330, 100%, 60%)",
        ringColor: "hsl(330, 100%, 70%)",
        middleColor: "hsl(330, 100%, 80%)",
        pointer1stColor: "hsl(330, 100%, 85%)",
        pointer2ndColor: "hsl(330, 100%, 90%)",
      }

      const desert = {
        pinkyColor: "hsl(30, 90%, 60%)",
        ringColor: "hsl(35, 80%, 60%)",
        middleColor: "hsl(40, 90%, 60%)",
        pointer1stColor: "hsl(45, 100%, 70%)",
        pointer2ndColor: "hsl(45, 90%, 75%)",
      }

      switch (colorScheme) {
        case "classic": colorScheme = classic; break;
        case "aqua": colorScheme = aqua; break;
        case "fire": colorScheme = fire; break;
        case "steel": colorScheme = steel; break;
        case "bubblegum": colorScheme = bubblegum; break;
        case "desert": colorScheme = desert; break;
        default: colorScheme = aqua; break;
      }

      this.pinkyColor = colorScheme.pinkyColor;
      this.ringColor = colorScheme.ringColor;
      this.middleColor = colorScheme.middleColor;
      this.pointer1stColor = colorScheme.pointer1stColor;
      this.pointer2ndColor = colorScheme.pointer2ndColor;
    },
    onKeyup(event) {
      this.bumpKey(event);
    },
    bumpKey(event) {
      let keyPressed = this.getPressedKeyName(event);

      if(keyPressed == "Shift"){
        this.animateBothShiftKeys();
      } else {
        this.animateKeyPressed(keyPressed);
      }
      if(event.key == "Enter") {
        this.removeSelectedAnimations();
      }
    },
    getPressedKeyName(event){
      let keyPressed;
      let isNumberOrLetter = event.keyCode >= 48 && event.keyCode <= 90;
      if (isNumberOrLetter) {
        keyPressed = String.fromCharCode(event.keyCode);
      } else {
        keyPressed = event.key;
        switch (keyPressed) {
          case '\-' : keyPressed = "Minus"; break;
          case '\=' : keyPressed = "Equal"; break;
          case '\\' : keyPressed = "Backslash"; break;
          case '\]' : keyPressed = "CloseBracket"; break;
          case '\[' : keyPressed = "OpenBracket"; break;
          case '\;' : keyPressed = "SemiColon"; break;
          case '\'' : keyPressed = "Quote"; break;
          case '\,' : keyPressed = "Comma"; break;
          case '\.' : keyPressed = "Period"; break;
          case '\/' : keyPressed = "Forwardslash"; break;
        }
      }
      return keyPressed;
    },
    animateBothShiftKeys(){
      const keyElement = document.getElementsByClassName("Shift");
      keyElement[0].classList.add("hit")
      keyElement[0].classList.add("selected");
      keyElement[1].classList.add("hit")
      keyElement[1].classList.add("selected");
      keyElement[0].addEventListener('animationend', () => {
        keyElement[0].classList.remove("hit")
      })
      keyElement[1].addEventListener('animationend', () => {
        keyElement[1].classList.remove("hit")
      })
      setTimeout(() => {
        keyElement[0].classList.remove("selected")
        keyElement[1].classList.remove("selected")
      }, 1000)
    },
    animateKeyPressed(keyPressed){
      const keyElement = document.getElementById(keyPressed);

      keyElement.classList.add("hit")
      keyElement.classList.add("selected")
      keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit")
      })
    },
    removeSelectedAnimations(){
      let selectedElements = document.getElementsByClassName("selected")
      while(selectedElements.length > 0){
        selectedElements[0].classList.remove("selected")
      }
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
  <div class="keyboard">
    <ul class="row row-0">
      <li class="pinky" id="Escape" >ESC</li>
      <li class="pinky" id="1">1</li>
      <li class="ring" id="2">2</li>
      <li class="middle" id="3">3</li>
      <li class="pointer1st" id="4">4</li>
      <li class="pointer2nd" id="5">5</li>
      <li class="pointer2nd" id="6">6</li>
      <li class="pointer1st" id="7">7</li>
      <li class="middle" id="8">8</li>
      <li class="ring" id="9">9</li>
      <li class="pinky" id="0">0</li>
      <li class="pinky" id="Minus" >-</li>
      <li class="pinky" id="Equal">=</li>
      <li class="pinky" id="Backspace">BACK</li>
    </ul>
    <ul class="row row-1">
      <li class="pinky" id="Tab">TAB</li>
      <li class="pinky" id="Q">Q</li>
      <li class="ring" id="W">W</li>
      <li class="middle" id="E">E</li>
      <li class="pointer1st" id="R">R</li>
      <li class="pointer2nd" id="T">T</li>
      <li class="pointer2nd" id="Y">Y</li>
      <li class="pointer1st" id="U">U</li>
      <li class="middle" id="I">I</li>
      <li class="ring" id="O">O</li>
      <li class="pinky" id="P">P</li>
      <li class="pinky" id="OpenBracket">[</li>
      <li class="pinky" id="CloseBracket">]</li>
      <li class="pinky" id="Backslash">\</li>
    </ul>
    <ul class="row row-2">
      <li class="pinky" id="CapsLock">CAPS</li>
      <li class="pinky" id="A">A</li>
      <li class="ring" id="S">S</li>
      <li class="middle" id="D">D</li>
      <li class="pointer1st" id="F">F</li>
      <li class="pointer2nd" id="G">G</li>
      <li class="pointer2nd" id="H">H</li>
      <li class="pointer1st" id="J">J</li>
      <li class="middle" id="K">K</li>
      <li class="ring" id="L">L</li>
      <li class="pinky" id="SemiColon">;</li>
      <li class="pinky" id="Quote">'</li>
      <li class="pinky" id="Enter">ENTER</li>
    </ul>
    <ul class="row row-3">
      <li class="pinky Shift" id="Shift">SHIFT</li>
      <li class="pinky" id="Z">Z</li>
      <li class="ring" id="X">X</li>
      <li class="middle" id="C">C</li>
      <li class="pointer1st" id="V">V</li>
      <li class="pointer2nd" id="B">B</li>
      <li class="pointer2nd" id="N">N</li>
      <li class="pointer1st" id="M">M</li>
      <li class="middle" id="Comma">,</li>
      <li class="ring" id="Period">.</li>
      <li class="pinky" id="Forwardslash">/</li>
      <li class="pinky Shift" id="Shift">SHIFT</li>
    </ul>
  </div>
<div class="dropdown">
  <button class="dropbtn">Colors</button>
    <div class="dropdown-content">
      <a href="#" @click="setColors('classic')" style="color: mediumspringgreen">Classic 🏝️</a>
      <a href="#" @click="setColors('steel')" style="color: grey">Steel 🪙</a>
      <a href="#" @click="setColors('aqua')" style="color: deepskyblue">Aqua 💧</a>
      <a href="#" @click="setColors('fire')" style="color: orangered">Fire 🔥</a>
      <a href="#" @click="setColors('bubblegum')" style="color: hotpink">BubbleGum 🍬</a>
      <a href="#" @click="setColors('desert')" style="color: sandybrown">Desert 🏜️</a>
    </div>
  </div>
</template>

<style scoped>

.dropdown {
  position: relative;
  left: 40%;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.dropdown-content {
  display: none;
  position: absolute;
  text-align: center;
  padding-left: 1.8em;
  border-radius: 1em;
  font-size: 1.5em;
}

.dropdown:hover .dropdown-content {
  display: flex;
  flex-direction: column;
}

.dropbtn {
  background-color: transparent;
  width: 10em;
  color: darkgray;
  border-radius: 1em;
  font-size: 1.25em;
  cursor: pointer;
}

body {
  background-color: black;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.keyboard {
  display: flex;
  flex-direction: column;
}

.row {
  list-style: none;
  display: flex;
}

li {
  height: 4em;
  width: 4em;
  color: rgba(0,0,0,1);
  border-radius: .75em;
  line-height: 4em;
  letter-spacing: 1px;
  margin: 0.5em;
  transition: 0.3s;
  text-align: center;
  font-size: 1em;
  text-shadow: 1px 1px 2px black;
}

#Tab {
  width: 6em;
}

#CapsLock {
  width: 7em;
}

#Shift {
  width: 10em;
}

#Enter {
  width: 8em;
}

#Backspace {
  width: 6em;
}

.pinky {
  background-color: v-bind(pinkyColor);
  border-style: groove;
  border-color: v-bind(pinkyColor);
  box-shadow: 2px 2px 2px slategray;
}

.pinky.selected {
  color: v-bind(pinkyColor);
}

.ring {
  background-color: v-bind(ringColor);
  border-style: groove;
  border-color: v-bind(ringColor);
  box-shadow: 2px 2px 2px slategray;
}
.ring.selected {
  color: v-bind(ringColor);
}

.middle {
  background-color: v-bind(middleColor);
  border-style: groove;
  border-color: v-bind(middleColor);
  box-shadow: 2px 2px 2px slategray;
}
.middle.selected {
  color: v-bind(middleColor);
}

.pointer1st {
  background-color: v-bind(pointer1stColor);
  border-style: groove;
  border-color: v-bind(pointer1stColor);
  box-shadow: 2px 2px 2px slategray;
}
.pointer1st.selected {
  color: v-bind(pointer1stColor);
}

.pointer2nd {
  background-color: v-bind(pointer2ndColor);
  border-style: groove;
  border-color: v-bind(pointer2ndColor);
  box-shadow: 2px 2px 2px slategray;
}
.pointer2nd.selected {
  color: v-bind(pointer2ndColor);
}

.selected {
  background-color: transparent;
  -webkit-animation: vibrate-1 0.3s linear infinite both;
  animation: vibrate-1 0.3s linear infinite both;
}

.hit {
  -webkit-animation: hit 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: hit 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  background-color: rgb(255, 0, 255, 100%);
}

@-webkit-keyframes hit {
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes hit {
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@-webkit-keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
</style>