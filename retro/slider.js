//-- GENERAL VARS
let currentPosition = 0;
const sliderContainer = document.getElementById('slider_container');

sliderContainer.style.left = 0;

//ARROWS
const arrow_left = document.getElementById('arrow_left');
const arrow_rigth = document.getElementById('arrow_rigth');

// RIGHT ARROW
arrow_right.addEventListener('click', () => {
  if (!(currentPosition / -100 == buttons.length - 1)) {
    currentPosition -= 100;
    sliderContainer.style.left = currentPosition + '%';
    lastTime = 0; //---- RESET LAST TIME VAR
    changeButtonToRight();
  }
});

function changeButtonToRight() {
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('active')) {
      buttons[i].classList.remove('active');
      buttons[i + 1].classList.add('active');
      break;
    }
  }
}

// LEFT ARROW
arrow_left.addEventListener('click', () => {
  if (!currentPosition == 0) {
    currentPosition += 100;
    sliderContainer.style.left = currentPosition + '%';
    lastTime = 0; //---- RESET LAST TIME VAR

    changeButtonToLeft();
  }
});

function changeButtonToLeft() {
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('active')) {
      buttons[i].classList.remove('active');
      buttons[i - 1].classList.add('active');
      break;
    }
  }
}

// BOTTON BUTTONS
//------ GETS ALL BOTTON BUTTONS
const buttons = document.querySelectorAll('[data-element-button]');
//------- GETS ALL SLIDER'S ELEMENTS
const img_n = document.querySelectorAll('[data-element]');

for (i = 0; i < buttons.length; i++) {
  let currentButton = buttons[i];
  for (j = 0; j < img_n.length; j++) {
    if (
      img_n[j].getAttribute('data-element').toLowerCase() ==
      currentButton.getAttribute('data-element-button').toLowerCase()
    ) {
      let position = j * -100;
      buttons[i].addEventListener('click', () => {
        //----- REMOVE LAST ACTIVE CLASS -----//
        if (document.getElementsByClassName('active').length != 0) {
          document
            .getElementsByClassName('active')[0]
            .classList.remove('active');
        }
        currentButton.classList.add('active');
        sliderContainer.style.left = position + '%';
        currentPosition = position;
        lastTime = 0; //---- RESET LAST TIME VAR
      });
      // SELECT ACTIVE BUTTON
      if (currentButton.classList.contains('active')) {
        currentPosition = j * -100;
        sliderContainer.style.left = currentPosition + '%';
      }
    }
  }
}

// AUTO CHANGE SLIDER
let lastTime = 0;
let changeDirection = 'right';

setInterval(() => {
  //---- CHANGES DIRECTION WHEN THE BORDER'S IMAGES ARE DISPLAYED
  if (currentPosition / -100 == buttons.length - 1) changeDirection = 'left';
  else if (currentPosition == 0) changeDirection = 'right';

  if (lastTime == 2) {
    if (changeDirection == 'right') {
      currentPosition -= 100;
      sliderContainer.style.left = currentPosition + '%';
      changeButtonToRight();
    } else if (changeDirection == 'left') {
      currentPosition += 100;
      sliderContainer.style.left = currentPosition + '%';
      changeButtonToLeft();
    }
    lastTime = 0;
  } else lastTime++;
}, 2000);

// IF THERES NO BUTTON WITH ACTIVE CLASS IT PUTS THE FIRST BUTTON AS THE ACTIVE CLASS
if (document.getElementsByClassName('active').length == 0)
  buttons[0].classList.add('active');
