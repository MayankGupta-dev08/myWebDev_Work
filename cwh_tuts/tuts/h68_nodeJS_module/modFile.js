console.log("this is modFile.js");

function avg(arr) {
  let sum = 0;
  arr.forEach(function (ele) {
    sum += ele;
  });
  return sum / arr.length;
}

// module.exports.name = "main"

module.exports = {
  avg: avg,
  name: "avgFunc",
  repo: "git"
}