console.log('The file is tutorial 51');
// Iterators

function fruitsIterator(arr) {
  let nextIndex = 0;
  // we will return an object
  return {
    next: function () {
      if (nextIndex < arr.length) {
        // We will return below object
        return {
          value: arr[nextIndex++],
          done: false
        }
      }
      else {
        // We will return below object with only done
        return {
          done: true
        }
      }
    }
  }
}


const myArray = ['Apples', 'Grapes', 'Oranges', 'Bhindi'];
console.log("My array is ", myArray)

// Using the iterator
const fruits = fruitsIterator(myArray);
console.log(fruits.next().value, fruits.next())
console.log(fruits.next().value, fruits.next())
console.log(fruits.next().value, fruits.next())
console.log(fruits.next().value, fruits.next())
console.log(fruits.next().value, fruits.next())