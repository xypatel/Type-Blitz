class Timer {
  constructor() {
    this.elapsedTime = 0;
    this.elapsedTimeAtEachLevel = [];
    this.secondsPerLevel = [];
  }

  startTimer() {
    this.startTime = new Date().getTime();
  }

  stopTimer() {
    this.endTime = new Date().getTime();
  }

  getElapsedTime() {
    return new Date().getTime() - this.startTime;
  }

  getElapsedTimeInSeconds() {
    return this.getElapsedTime() / 1000;
  }

  updateTimer() {
    this.elapsedTime = this.getElapsedTimeInSeconds();
    this.elapsedTimeAtEachLevel.push(this.elapsedTime);

    if (this.elapsedTimeAtEachLevel.length > 1) {
      this.secondsPerLevel.push(
        this.elapsedTimeAtEachLevel[this.elapsedTimeAtEachLevel.length - 1] -
          this.elapsedTimeAtEachLevel[this.elapsedTimeAtEachLevel.length - 2]
      );
    }
  }

  resetTimer() {
    this.elapsedTime = 0;
    this.elapsedTimeAtEachLevel = [];
    this.secondsPerLevel = [];
    this.startTime = null;
    this.endTime = null;
  }
}

module.exports = Timer;
