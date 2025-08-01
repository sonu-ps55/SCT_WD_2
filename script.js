let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);

  return (
    (hrs < 10 ? "0" + hrs : hrs) + ":" +
    (mins < 10 ? "0" + mins : mins) + ":" +
    (secs < 10 ? "0" + secs : secs)
  );
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
    startStopBtn.textContent = "Pause";
    running = true;
  } else {
    stopTimer();
    startStopBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  running = false;
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (!running) return;
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.prepend(li);
});
