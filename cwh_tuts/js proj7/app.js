let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = "";

for (item of buttons) {
  item.addEventListener('click', (e) => {
    let buttonText = e.target.innerText;
    console.log(buttonText);
    if (buttonText === 'C') {
      screenValue = '';
    } else if (buttonText === '=') {
      screenValue = eval(screenValue);
    } else if (buttonText === '⇐') {
      screenValue = screenValue.slice(0, -1);
    } else {
      screenValue += buttonText;
    }
    screen.value = screenValue;
  })
}