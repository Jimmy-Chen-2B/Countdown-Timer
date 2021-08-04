document.addEventListener("DOMContentLoaded", () => {
  
  let min = document.querySelector("#minute");
  let sec = document.querySelector("#second");
  let initSec = (+min.textContent * 60) + +sec.textContent;
  let nInterval;
 
  function zeroPadding(num) {
    return num >= 10 ? num : "0" + num;
  }

  function sixtyRadix(time) {
    min.textContent = zeroPadding(parseInt(time / 60));
    sec.textContent = zeroPadding(parseInt(time % 60));
  }  

  function startCountDown(duration) {
      nInterval = setInterval(() => { 
      duration--;
      sixtyRadix(duration);
      if (duration === 0) {clearInterval(nInterval)};
    }, 1000);
  };

  function pause() {
    let pauseTime = (+min.textContent * 60) + +sec.textContent;   
    if (nInterval) {
      clearInterval(nInterval);
      nInterval = 0;
    } else { 
      startCountDown(pauseTime);
    }; 
  };

  function rewindTime() {
    let rewind = (+min.textContent * 60) + +sec.textContent + 5;
    if (rewind > initSec) {rewind = initSec};
    clearInterval(nInterval);
    nInterval = 0;
    sixtyRadix(rewind);
    rewind--;
    sixtyRadix(rewind);
    startCountDown(rewind);    
  }

  function fastForwardTime() {
    let fastForward = (+min.textContent * 60) + +sec.textContent - 5;
    if (fastForward <= 0) {fastForward = 0};
    clearInterval(nInterval);
    nInterval = 0; 
    sixtyRadix(fastForward);
    fastForward--;
    sixtyRadix(fastForward);
    startCountDown(fastForward);     
  }

  window.addEventListener("keydown", (e) => {
    // console.log(e.key);

    if (e.key === "Enter" && !nInterval) {
      startCountDown(initSec);
    };

    if (e.key === " ") {
      pause();
    };

    if (e.key === "ArrowLeft" && nInterval) {
      rewindTime(e)
    };

    if (e.key === "ArrowRight" && nInterval) {
      fastForwardTime()
    }



  });
});