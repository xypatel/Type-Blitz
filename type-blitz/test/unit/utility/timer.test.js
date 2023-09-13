const Timer = require("../../../src/utility/timer");
describe("When new Timer is created", () => {
  let timer;
  beforeEach(() => {
    timer = new Timer();
  });

  afterEach(() => {
    timer.resetTimer()
  });

  it("Then should initialize with no errors", () => {
    expect(timer).toBeTruthy();
  });

  describe("And Timer is started", () => {
    let mockStartTime;
    it("Then should have a start time of current time", () => {
      // Arrange
      mockStartTime = new Date().getTime();

      // Act
      timer.startTimer();

      // Assert
      expect(timer.startTime).toBe(mockStartTime);
    });

    describe("And when getElapsedTime is called", () => {
      it("Then should return time elapsed since start time", async () => {
        // Arrange
        timer.startTimer();
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockElapsedTime = new Date().getTime() - timer.startTime;

        // Act
        const elapsedTime = timer.getElapsedTime();

        // Assert
        expect(elapsedTime).toBeCloseTo(mockElapsedTime, 1);
      });
    });

    describe("And when getElapsedTimeInSeconds is called", () => {
      it("Then should return time elapsed in seconds since start time", async () => {
        // Arrange
        timer.startTimer();
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockElapsedTime = new Date().getTime() - timer.startTime;
        const mockElapsedTimeInSeconds = mockElapsedTime / 1000;

        // Act
        const elapsedTimeInSeconds = timer.getElapsedTimeInSeconds();

        // Assert
        expect(elapsedTimeInSeconds).toBeCloseTo(mockElapsedTimeInSeconds, 1);
      });
    });

    describe("And when updateTimer is called once", () => {
      it("Then should add elapsed time to elapsedTimeAtEachLevel and secondsPerLevel should be empty", async () => {
        // Arrange
        timer.startTimer();
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockElapsedTime = new Date().getTime() - timer.startTime;
        const mockElapsedTimeInSeconds = mockElapsedTime / 1000;

        // Act
        timer.updateTimer();

        // Assert
        expect(timer.elapsedTimeAtEachLevel[0]).toBe(mockElapsedTimeInSeconds);
        expect(timer.secondsPerLevel.length).toBe(0);
      });

      describe("And when updateTimer is called again", () => {
        it("Then should add elapsed time to elapsedTimeAtEachLevel and secondsPerLevel should have change in seconds", async () => {
          // Arrange
          timer.startTimer();
          await new Promise((resolve) => setTimeout(resolve, 500));
          const mockElapsedTime = new Date().getTime() - timer.startTime;
          const mockElapsedTimeInSeconds = mockElapsedTime / 1000;

          // Act
          timer.updateTimer();
          await new Promise((resolve) => setTimeout(resolve, 1000));
          timer.updateTimer();

          // Assert
          expect(timer.elapsedTimeAtEachLevel[0]).toBe(mockElapsedTimeInSeconds);
          expect(timer.secondsPerLevel[0]).toBeCloseTo(1, 1);
        });
      });
    });

    describe("And when stopTimer is called", () => {
      it("Then should set endTime to current time", async () => {
        // Arrange
        const mockEndTime = new Date().getTime();

        // Act
        timer.stopTimer();

        // Assert
        expect(timer.endTime).toBe(mockEndTime);
      });
    });
  });
});
