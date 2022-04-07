console.log("Running......");

const imgBox = document.querySelector('.imgBox');
const whiteBoxes = document.getElementsByClassName('whiteBox');

// handling the dragStart event of the imgBox element
imgBox.addEventListener('dragstart', (e) => {
  console.log("DragStart has been triggered");
  e.target.className += " hold";
  setTimeout(() => {
    e.target.className = 'hide';
  }, 0);
})

// handling the dragEnd event of the imgBox element
imgBox.addEventListener('dragend', (e) => {
  console.log("DragEnd has been triggered");
  e.target.className = "imgBox";
})

// hadling events for each of the whiteBox elements
for (whiteBox of whiteBoxes) {
  whiteBox.addEventListener('dragover', (e) => {
    console.log("DragOver has been triggered");
    e.preventDefault();
  })

  whiteBox.addEventListener('dragenter', (e) => {
    console.log("DragEnter has been triggered");
    e.target.classList.add('dashed');
  })

  whiteBox.addEventListener('dragleave', (e) => {
    console.log("DragLeave has been triggered");
    e.target.className = 'whiteBox';
  })

  whiteBox.addEventListener('drop', (e) => {
    console.log("Drop has been triggered");
    e.target.append(imgBox);
  })
}