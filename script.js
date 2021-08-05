document.addEventListener("DOMContentLoaded", () => {
  
  const min = document.querySelector("#minute");
  const sec = document.querySelector("#second");
  const container = document.querySelector(".container")
  const bell = document.querySelector("audio")
  let initTime = (+min.textContent * 60) + +sec.textContent;
  let nInterval;
  let settingTime = "";

  function zeroPadding(num) {
    return num >= 10 ? num : "0" + num;
  }

  function sixtyRadix(time) {
    min.textContent = zeroPadding(parseInt(time / 60));
    sec.textContent = zeroPadding(parseInt(time % 60));
  }  

  function resetInterval() {
    clearInterval(nInterval);
    nInterval = 0;
  }

  function startCountDown(duration) {
    nInterval = setInterval(() => { 
      duration--;
      sixtyRadix(duration);
      if (duration === 0) {
        clearInterval(nInterval)
        bell.play()
      };
      container.style.cssText = `background: linear-gradient(90deg, pink ${100 - (duration / initTime * 100)}%, transparent 0%)`;
    }, 1000);
  };

  function pause() {
    let pauseTime = (+min.textContent * 60) + +sec.textContent;   
    if (nInterval) {
      resetInterval();
    } else { 
      startCountDown(pauseTime);
    }; 
  };

  function adjustTime(event) {
    sixtyRadix(event);  
    resetInterval();
    startCountDown(event);
  }

  function rewindTime() {
    let rewind = (+min.textContent * 60) + +sec.textContent + 5;
    if (rewind > initTime) {rewind = initTime};
    adjustTime(rewind);    
  }

  function fastForwardTime() {
    let fastForward = (+min.textContent * 60) + +sec.textContent - 5;
    if (fastForward < 0) {fastForward = 0};
    adjustTime(fastForward);     
  }

  function defaultTime() {
    adjustTime(initTime); 
  }

  function setTime(e) {
    settingTime += e.key;
    newTimer = Number(settingTime)
    if (newTimer >= 60) {
      alert("您輸入的數值超過上限(60)，請重新輸入");
      settingTime = "";
    } else if (newTimer) {
      initTime = newTimer * 60;
    } else {
      alert("您輸入的數值有誤，請重新輸入");
      settingTime = "";
    }
  }

  window.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !nInterval) {
      startCountDown(initTime);
    };

    if (e.key === " ") {
      pause();
    };

    if (e.key === "ArrowLeft" && nInterval) {
      rewindTime();
    };

    if (e.key === "ArrowRight" && nInterval) {
      fastForwardTime();
    }

    if (e.key === "ArrowUp" && nInterval) {
      defaultTime();
    }

    if (+e.key || e.key === ".") {
      setTime(e)
    }

  });
});