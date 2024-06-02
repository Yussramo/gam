let gamename = "Guess the Word";
document.title = gamename;
document.querySelector("h1").innerHTML = gamename;
document.querySelector("footer").innerHTML = `${gamename} &copy; Created  by yussra jarboua`;

let numbersOftries = 6;
let numbersOfLetterrs = 6;
let currentTry = 1;
let hintsOfNumber = 2;

let messege = document.querySelector(".messeg")
let wordToGeuss = "";
let wordarray = ["create", "Banane" , "wissen","zählen","wörter","Bundes","endung", "anfang" ,"rätsel" , "frucht", "gemuse",
  "kinder", "mensch", "länder", "geräte", "falsch", "händys" , "endung" , "quitung", "qualität" , "buch" ,"heft", "schule", "menge",
  "numbers" , "Abendbrot"];
wordToGeuss = wordarray[Math.floor(Math.random() * wordarray.length)].toLowerCase();

console.log(wordToGeuss);
console.log(wordToGeuss.length);

function generatInput() {
  let inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numbersOftries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.innerHTML = `<span> Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add(`disabeld`)
    for (let j = 1; j <= wordToGeuss.length; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = (`guess${i}-letter-${j}`);
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputContainer.appendChild(tryDiv);
  }
  inputContainer.children[0].children[1].focus();

  let inputInDisebelddiv = document.querySelectorAll(".disabeld input");
  inputInDisebelddiv.forEach((input) => input.disabled = true);
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {

    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      let count = inputs[index + 1];
      if (count) count.focus();
    })

    input.addEventListener("keydown", function (event) {
      let currentEle = Array.from(inputs).indexOf(event.target);// this 
      if (event.target === "guess1-letter-1") {
        let next = currentEle + 1;
        if (next < inputs.length) inputs[next].focus();
      }
      // event.target === "guess1-letter-6";
      // if(event.target === "guess1-letter-6") {
      //     let currentEle =  Array.from(inputs).indexOf(event.target);
      //     let previousEle = currentEle - 1; 
      //         if (previousEle >= 0) {
      //         inputs[previousEle].focus();
      //}
      // }
    });
  })
}
window.onload = function () {
  generatInput();
}

let checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handelGeuss);

function handelGeuss() {
  let success = true;

  for (let i = 1; i <= numbersOfLetterrs; i++) {
    let inputField = document.querySelector(`#guess${currentTry}-letter-${i}`);
    let letter = inputField.value.toLowerCase();
    let actuelLetter = wordToGeuss[i - 1];

    if (letter === actuelLetter) {
      inputField.classList.add("yes-inplace");
      success === true
    } else if (wordToGeuss.includes(letter) && letter !== "") {
      inputField.classList.add("not-place");
      success = false;
    } else {
      inputField.classList.add("wrong");
      success = false;
    }
  }

  if (success) {
    messege.innerHTML = `you win the word is <span>${wordToGeuss}</span>`;
    checkButton.classList.add("disabled")
    document.querySelector(".hint").classList.add("disabled");
    let alltries = document.querySelectorAll(".inputs > div");
    alltries.forEach((input) => {
      input.classList.add("disabled");
    })
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled");
    let curenttryinputs = document.querySelectorAll(`.try-${currentTry} input`);
    curenttryinputs.forEach((input) => input.classList.add("disabled"));
    currentTry++;
    const nexttryinput = document.querySelectorAll(`.try-${currentTry} input`);
    nexttryinput.forEach((input) => (input.disabled = false));
    let element = document.querySelector(`.try-${currentTry}`);
    if (element) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled");
      element.children[1].focus();
    }
    else {
      checkButton.classList.add("disabled");
      document.querySelector(".hint").classList.add("disabled");
      messege.innerHTML = `you lose the word is <span>${wordToGeuss}</span>`;
    }

  }
}

document.querySelector(".hint span").innerHTML = hintsOfNumber;
let hintInput = document.querySelector(".hint");
hintInput.addEventListener("click", gethints);
function gethints() { 

  let enabledInput = document.querySelectorAll("input:not(:disabled)");
  let emptyEnabledInput = Array.from(enabledInput).filter((input)=> input.value.trim() === "") ;// empty element
  if (hintsOfNumber > 0 && emptyEnabledInput.length > 0) {
      hintsOfNumber--;
      document.querySelector(".hint span").innerHTML = hintsOfNumber;
    }

  if (hintsOfNumber === 0 ) (hintInput.classList.add("disabled")); 
  
  if (emptyEnabledInput.length > 0) {
    let Randomindex = Math.floor(Math.random() * emptyEnabledInput.length); // number from random 
    let randomInput = emptyEnabledInput[Randomindex] ; // place to fill  nuumbr index element 
    let indexTofill = Array.from(enabledInput).indexOf(randomInput); //letter to add index number
    console.log(Randomindex);
    console.log(randomInput);
    console.log(indexTofill);

    if(randomInput !== -1)  {
        randomInput.value = wordToGeuss[indexTofill].toUpperCase();
    }

  }
  } 

function handelbackspace(event) {
if(event.key === "Backspace") {
let allinputs = document.querySelectorAll(`input:not([disabled])`) ;
let currentele = Array.from(allinputs).indexOf(document.activeElement);

if(currentele > 0){
  let currentinput = allinputs[currentele] ;
  let pervtinput = allinputs[currentele - 1] ; 
  currentinput.value = "";
  pervtinput.value = "";
  pervtinput.focus();
}

}
}
document.addEventListener("keydown", handelbackspace)   ;
     
