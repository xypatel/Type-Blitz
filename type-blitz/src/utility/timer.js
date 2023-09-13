export class Timer {
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
      const changeInTime =
        this.elapsedTimeAtEachLevel[this.elapsedTimeAtEachLevel.length - 1] -
        this.elapsedTimeAtEachLevel[this.elapsedTimeAtEachLevel.length - 2];
      this.secondsPerLevel.push( changeInTime.toPrecision(3));
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

// TODO:  module.exports = Timer;  need this on server for node and unit tests, does not work by default on browser.
