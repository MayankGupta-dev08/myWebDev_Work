console.log("this is tutorial 53");
// Generators in JavaScript
// 1 - 1B

function* numbersGen() {
  let i = 0;

  // yield 1;
  // yield 2;
  // yield 3;
  // yield 4;
  while (i <= 100) {
    yield i++;
    // yield (i++).toString();
  }
}

const gen = numbersGen();
console.log(gen.next(), gen.next().value);
console.log(gen.next(), gen.next().value);
console.log(gen.next(), gen.next().value);
console.log(gen.next(), gen.next().value);