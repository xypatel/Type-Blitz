function glowKeysToTypeYellow(lettersToGlow) {
    for(let i = 0; i < lettersToGlow.length; i++){
        lettersToGlow[i].style.textShadow = "1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod";
    }
}

function glowInputKeyYellow(letterToGlow) {
    letterToGlow.style.textShadow = "1px 1px 2px black, 0 0 25px yellow, 0 0 5px goldenrod";
}

function glowInputKeyGreen(letterToGlow) {
    letterToGlow.style.textShadow = "1px 1px 2px black, 0 0 25px green, 0 0 10px limegreen";
}

function glowInputKeyRed(letterToGlow) {
    letterToGlow.style.textShadow = "1px 1px 2px black, 0 0 25px red, 0 0 10px crimson";
}

export { glowKeysToTypeYellow, glowInputKeyYellow, glowInputKeyGreen, glowInputKeyRed };

