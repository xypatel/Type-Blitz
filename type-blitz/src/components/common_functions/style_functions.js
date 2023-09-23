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

function setColorScheme(colorScheme) {
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

    const metal = {
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
        case "classic": return classic;
        case "aqua": return aqua;
        case "fire": return fire;
        case "metal": return metal;
        case "bubblegum": return bubblegum;
        case "desert": return desert;
        default: return classic;
    }

}


export { glowKeysToTypeYellow, glowInputKeyYellow, glowInputKeyGreen, glowInputKeyRed, setColorScheme };

