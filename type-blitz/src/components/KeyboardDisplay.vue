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
      this.bumpKey(event);
    },
    bumpKey(event) {
      let keyPressed = this.getPressedKeyName(event);

      if(keyPressed == "Shift"){
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
      } else {
        const keyElement = document.getElementById(keyPressed);

        keyElement.classList.add("hit")
        keyElement.classList.add("selected")
        keyElement.addEventListener('animationend', () => {
          keyElement.classList.remove("hit")
        })
      }
      if(event.key == "Enter") {
        let selectedElements = document.getElementsByClassName("selected")
        while(selectedElements.length > 0){
          selectedElements[0].classList.remove("selected")
        }
      }
    },
    getPressedKeyName(event){
      let keyPressed;
      if (event.keyCode >= 48 && event.keyCode <= 90) {
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
</template>

<style scoped>

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
  margin: auto 10em auto auto;
}

.row {
  list-style: none;
  display: flex;
}

li {
  height: 3em;
  width: 3em;
  color: rgba(0,0,0,1);
  border-radius: 0.4em;
  line-height: 3em;
  letter-spacing: 1px;
  margin: 0.4em;
  transition: 0.3s;
  text-align: center;
  font-size: 1em;
  text-shadow: 2px 2px 5px goldenrod;
}

#Tab {
  width: 5em;
}

#CapsLock {
  width: 6em;
}

#Shift {
  width: 8em;
}

#Enter {
  width: 6em;
}

#Backspace {
  width: 5em;
}

.pinky {
  background-color: hsl(211, 100%, 50%);
  border-style: groove;
  border-color: hsl(211, 100%, 50%);
  box-shadow: 2px 2px 5px rgba(255,255,0,.7);
}

.pinky.selected {
  color: hsl(211, 100%, 50%);
}

.ring {
  background-color: hsl(190, 100%, 50%);
  border-style: groove;
  border-color: hsl(190, 100%, 50%);
  box-shadow: 2px 2px 5px rgba(255,255,0,.7);
}
.ring.selected {
  color: hsl(190, 100%, 50%);
}

.middle {
  background-color: hsl(171, 100%, 50%);
  border-style: groove;
  border-color: hsl(171, 100%, 50%);
  box-shadow: 2px 2px 5px rgba(255,255,0,.7);
}
.middle.selected {
  color: hsl(171, 100%, 50%);
}

.pointer1st {
  background-color: hsl(145, 100%, 50%);
  border-style: groove;
  border-color: hsl(145, 100%, 50%);
  box-shadow: 2px 2px 5px rgba(255,255,0,.7);
}
.pointer1st.selected {
  color: hsl(145, 100%, 50%);
}

.pointer2nd {
  background-color: hsl(100, 100%, 70%);
  border-style: groove;
  border-color: hsl(100, 100%, 70%);
  box-shadow: 2px 2px 5px rgba(255,255,0,.7);
}
.pointer2nd.selected {
  color: hsl(100, 100%, 70%);
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