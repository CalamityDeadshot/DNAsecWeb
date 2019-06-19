const adenineBtn = document.querySelector('.btn-adenine');
const thymineBtn = document.querySelector('.btn-thymine');
const guanineBtn = document.querySelector('.btn-guanine');
const cytosineBtn = document.querySelector('.btn-cytosine');
const eraseBtn = document.querySelector('.btn-erase');
const clearBtn = document.querySelector('.btn-clear');
const sequenceContainer = document.querySelector('.input-sequence');
const beforeEnteringText = document.querySelector('.before_entering_text');
const spinner = document.querySelector('#sequence-type');
const firstResultField = document.querySelector('#result_1');
const secondResultField = document.querySelector('#result_2');
const thirdResultField = document.querySelector('#result_3');

const INCOMPLETE_SEQUENCE = "Attention: incomplete sequence"
const ID_DNA = 0;
const ID_mRNA = 1;
const ID_tRNA = 2;


const inputButtons = [
  adenineBtn,
  thymineBtn,
  guanineBtn,
  cytosineBtn
];

const allCodonTextFields = [
  sequenceContainer,
  firstResultField,
  secondResultField,
  thirdResultField
];

Waves.attach('.input-btn', ['waves-float']);
Waves.attach('.ripple');
Waves.init();

function performClick(element) {
  return function() {
    Waves.ripple(element);
  }
}

let count = 0;
let color_index = 0;
let codonSpan = "";

function removeFade() {
  allCodonTextFields.forEach( (element) => {
    element.classList.remove("text__faded");
  });
}

function handleInputs(button) { // Adds inputs to container and colors codons
  return function() {
    // console.log(sequenceContainer.innerHTML.length);
    removeFade();

    if (count < 3) {
      if (count == 0) {
        sequenceContainer.innerHTML += button.textContent;
        codonSpan = `<span class="colored_span">${button.textContent}`;
        beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
        beforeEnteringText.classList.remove("text__faded");
        count++;
      } else if (count == 1) {
        sequenceContainer.innerHTML += button.textContent;
        codonSpan += button.textContent;
        count++;
      } else if (count == 2) {
        sequenceContainer.innerHTML = sequenceContainer.innerHTML.substring(0, sequenceContainer.innerHTML.length - 2);
        codonSpan += `${button.textContent}</span>`;
        sequenceContainer.innerHTML += codonSpan;
        sequenceContainer.lastChild.classList.add(`colored_${color_index}`);
        beforeEnteringText.classList.add("text__faded");
        firstResultField.textContent += "UAC";
        // beforeEnteringText.textContent = " ";
        if (color_index < 3) {
          color_index++;
        } else {
          color_index = 0;
        }
        count = 0;
      }
    }
  }
}

let flag_transitionCleared;

function clearFields() {
  allCodonTextFields.forEach( (element) => {
    flag_transitionCleared = true;
    element.classList.add("text__faded");
    console.log(element);
  });

  beforeEnteringText.innerHTML = "Start typing sequence";
  beforeEnteringText.classList.remove("text__faded");
  count = 0;
  color_index = 0;
  codonSpan = "";
};

allCodonTextFields.forEach( (element) => {
  element.addEventListener("transitionend", function() {
    if (element == sequenceContainer) {
      if (flag_transitionCleared) {
        element.innerHTML = "";
        flag_transitionCleared = false;
      }
    } else {
        element.innerHTML = "";
    }
  });
});

inputButtons.forEach( (element) => {
  element.addEventListener('click', handleInputs(element));
});


// beforeEnteringText.addEventListener("transitionend", function() {
//     alert("beforeEnteringText Transition ended");
//   });

clearBtn.addEventListener('click', clearFields);

document.querySelector('.custom-checkbox-container').addEventListener('click', performClick(document.querySelector('.ripple')));

spinner.addEventListener('click', function(el){ // Colors spinner items
  let options = spinner.children;
  for (i = 0; i < spinner.childElementCount; i++) {
    options[i].style.backgroundColor = "#FAE0E0";
    options[i].style.color = "#000";
  }
  let selected = document.querySelector(`#spinner_item_${spinner.options[spinner.selectedIndex].value}`);
  selected.style.backgroundColor = "#E04F60";
  selected.style.color = "white";
});