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

export { generateKeysToType };