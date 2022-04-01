console.log("This is clock.js")

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function updateClock() {
  // Get the current date
  let currentTime = new Date();

  // todays date: 
  let currentDay = days[currentTime.getDay()];
  let currentDate = currentTime.getDate();
  let currentMonth = months[currentTime.getMonth()];
  let currentYear = currentTime.getFullYear();

  // Extract hour, minute and seconds from the date
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentSeconds = currentTime.getSeconds();

  // Pad 0 if minute or second is less than 10 (single digit)
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // Convert railway clock to AM/PM clock
  currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
  currentHour = (currentHour == 0) ? 12 : currentHour;
  currentHour = (currentHour < 10 ? "0" : "") + currentHour;

  // Choose AM/PM as per the time of the day
  let timeOfDay = (currentHour < 12) ? "AM" : "PM";

  // Prepare the time string from hours, minutes and seconds
  let currentTimeStr = currentHour + ":" + currentMinutes
    + ":" + currentSeconds + " " + timeOfDay;

  // Insert the time string inside the DOM
  document.getElementById("clock").innerHTML = currentDay + ", " + currentDate + " " + currentMonth + " " + currentYear + " | " + currentTimeStr;
}