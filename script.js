import { wordlist } from "./wordlist.js";

let startTime;
let wordCount = 0;

function init() {
  var word = wordlist[Math.floor(Math.random() * wordlist.length)];

  // https://github.com/aharen/thaana-keyboard/blob/master/ThaanaKeyboard.js - thanks to aharen
  var keyMap = {
    q: "ް",
    w: "އ",
    e: "ެ",
    r: "ރ",
    t: "ތ",
    y: "ޔ",
    u: "ު",
    i: "ި",
    o: "ޮ",
    p: "ޕ",
    a: "ަ",
    s: "ސ",
    d: "ދ",
    f: "ފ",
    g: "ގ",
    h: "ހ",
    j: "ޖ",
    k: "ކ",
    l: "ލ",
    z: "ޒ",
    x: "×",
    c: "ޗ",
    v: "ވ",
    b: "ބ",
    n: "ނ",
    m: "މ",
    Q: "ޤ",
    W: "ޢ",
    E: "ޭ",
    R: "ޜ",
    T: "ޓ",
    Y: "ޠ",
    U: "ޫ",
    I: "ީ",
    O: "ޯ",
    P: "÷",
    A: "ާ",
    S: "ށ",
    D: "ޑ",
    F: "ﷲ",
    G: "ޣ",
    H: "ޙ",
    J: "ޛ",
    K: "ޚ",
    L: "ޅ",
    Z: "ޡ",
    X: "ޘ",
    C: "ޝ",
    V: "ޥ",
    B: "ޞ",
    N: "ޏ",
    M: "ޟ",
    ",": "،",
    ";": "؛",
    "?": "؟",
    "<": ">",
    ">": "<",
    "[": "]",
    "]": "[",
    "(": ")",
    ")": "(",
    "{": "}",
    "}": "{",
  };

  function convertToDhivehi(word) {
    return word
      .split("")
      .map((letter) => {
        return keyMap[letter] || letter;
      })
      .join("");
  }

  const word_element = document.getElementById("worddisplay");
  const mistakecount_element = document.getElementById("mistakecount");

  word_element.innerHTML = convertToDhivehi(word);
  var iteration = 0;
  var mistakes = 0;

  function accuracyupdater() {
    var accuracy = (mistakes / iteration) * 100;
    accuracy = accuracy - 1;
    accuracy = accuracy.toFixed(2);
    document.getElementById("accuracy").innerHTML =
      "ނުބައިކޮށް ލިޔެވޭ ރޭޓް:" + "%" + accuracy;
  }

  document.addEventListener("keypress", (event) => {
    if (!startTime) {
      startTime = new Date();
    }

    iteration += 1;
    if (event.key === word[0]) {
      word = word.slice(1);
      word_element.innerHTML = convertToDhivehi(word);
      accuracyupdater();
      mistakecount_element.innerHTML = "";

      if (word.length === 0) {
        word = wordlist[Math.floor(Math.random() * wordlist.length)];
        word_element.innerHTML = convertToDhivehi(word);
        wordCount++;
      }
    } else {
      mistakes += 1;
      var correct_key = "<span>" + convertToDhivehi(word[0]) + "</span>";
      var wrong_key = "<span>" + convertToDhivehi(event.key) + "</span>";
      mistakecount_element.innerHTML =
        correct_key + "ލިޔަންވީތަނަށް ތިލިޔުނީ " + wrong_key + "<br>";
      accuracyupdater();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

function calculateWPM() {
  // todo: improve wpm calculation
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000 / 60;
  const wpm = wordCount / timeTaken;
  console.log("މިނިޓެއްތެރޭ ލޔެވުން ބަސް:", wpm);
  document.getElementById("wpm").innerHTML =
    "މިނިޓެއްތެރޭ ލިޔެވުން ބަސް: " + wpm.toFixed(2);
  setTimeout(calculateWPM, 6000);
}

setTimeout(calculateWPM, 6000);
