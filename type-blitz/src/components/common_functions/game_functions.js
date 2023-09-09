function generateKeysToType(){
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
}

function isValidInputKey(key){
    if(key == "Enter" || key == "Backspace" || key == "Tab" || key == "Shift" || key == "CapsLock" || key == "Control" || key == "Alt" || key == "Meta" || key == "Escape"
        || key == "ArrowLeft" || key == "ArrowRight" || key == "ArrowUp" || key == "ArrowDown" || key == "Delete" || key == "Home" || key == "End" || key == "PageUp" || key == "PageDown" || key == "Insert"
        || key == "F1" || key == "F2" || key == "F3" || key == "F4" || key == "F5" || key == "F6" || key == "F7" || key == "F8" || key == "F9" || key == "F10"
        || key == "F11" || key == "F12" || key == "F13" || key == "F14" || key == "F15" || key == "F16" || key == "F17" || key == "F18" || key == "F19" || key == "F20"){
        return false;
    }
    return true;
}

function calculatePercentCorrect(correct, total){
    if(total == 0){
        return 0;
    }
    return Math.round((correct / total) * 100);
}

export { generateKeysToType, isValidInputKey, calculatePercentCorrect };