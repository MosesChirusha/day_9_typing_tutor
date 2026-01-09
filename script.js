const text =
    "Learning how to type is an important digital skill that helps students work faster and more confidently on computers.";

  const textDisplay = document.getElementById("textDisplay");
  const input = document.getElementById("input");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const timeEl = document.getElementById("time");

  let startTime = null;
  let timerInterval = null;

  // Render text
  function renderText(value = "") {
    textDisplay.innerHTML = "";
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;

      if (value[index] === char) {
        span.classList.add("correct");
      } else if (value[index]) {
        span.classList.add("incorrect");
      }

      textDisplay.appendChild(span);
    });
  }

  renderText();

  input.addEventListener("input", () => {
    if (!startTime) {
      startTime = new Date();
      timerInterval = setInterval(updateTime, 1000);
    }

    const value = input.value;
    renderText(value);
    updateStats(value);

    if (value.length === text.length) {
      clearInterval(timerInterval);
      input.disabled = true;
    }
  });

  function updateStats(value) {
    const elapsedMinutes = (new Date() - startTime) / 60000;
    const wordsTyped = value.length / 5;
    const wpm = Math.round(wordsTyped / elapsedMinutes) || 0;

    let correct = 0;
    value.split("").forEach((char, i) => {
      if (char === text[i]) correct++;
    });

    const accuracy = Math.round((correct / value.length) * 100) || 100;

    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy + "%";
  }

  function updateTime() {
    const seconds = Math.floor((new Date() - startTime) / 1000);
    timeEl.textContent = seconds;
  }

  function resetTest() {
    input.value = "";
    input.disabled = false;
    startTime = null;
    clearInterval(timerInterval);
    timeEl.textContent = "0";
    wpmEl.textContent = "0";
    accuracyEl.textContent = "100%";
    renderText();
  }