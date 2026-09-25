// Coordinates the loading screen, pause menu and mobile orientation warning
// around the Game instance's start/pause/resume lifecycle.
class ScreenManager {
  constructor(game) {
    this.game = game;

    this.loadingScreen = document.getElementById("loading-screen");
    this.pauseMenu = document.getElementById("pause-menu");
    this.playButton = document.getElementById("play-btn");
    this.restartButton = document.getElementById("restart-btn");
    this.pauseButton = document.getElementById("pause-btn");
    this.orientationWarning = document.getElementById("orientation-warning");

    this.playButton.addEventListener("click", () => this.handlePlay());
    this.restartButton.addEventListener("click", () => this.handleRestart());
    this.pauseButton.addEventListener("click", () => this.openPauseMenu());

    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !this.game.hasStarted || this.game.gameOver)
        return;
      this.pauseMenu.classList.contains("hidden")
        ? this.openPauseMenu()
        : this.handlePlay();
    });

    // pointer:coarse keeps this from firing on a resized desktop browser window
    this.orientationQuery = window.matchMedia(
      "(orientation: portrait) and (pointer: coarse)"
    );
    this.wasPausedBeforeOrientation = true;
    this.orientationQuery.addEventListener("change", (e) =>
      this.handleOrientationChange(e.matches)
    );
    this.handleOrientationChange(this.orientationQuery.matches);
  }

  hideLoadingScreen() {
    this.loadingScreen.classList.add("hidden");
  }

  showPauseMenu(mode) {
    this.playButton.textContent = mode === "resume" ? "Resume" : "Play";
    this.restartButton.classList.toggle("hidden", mode !== "resume");
    this.pauseMenu.classList.remove("hidden");
    this.pauseButton.classList.add("hidden");
  }

  hidePauseMenu() {
    this.pauseMenu.classList.add("hidden");
  }

  openPauseMenu() {
    this.game.pause();
    this.showPauseMenu("resume");
  }

  handlePlay() {
    this.hidePauseMenu();
    this.pauseButton.classList.remove("hidden");
    this.game.hasStarted ? this.game.resume() : this.game.start();
  }

  handleRestart() {
    this.game.restart();
    this.hidePauseMenu();
    this.pauseButton.classList.remove("hidden");
  }

  handleOrientationChange(isPortraitMobile) {
    this.orientationWarning.classList.toggle("hidden", !isPortraitMobile);

    if (isPortraitMobile) {
      this.wasPausedBeforeOrientation = this.game.paused;
      this.game.pause();
      return;
    }

    if (
      !this.wasPausedBeforeOrientation &&
      this.game.hasStarted &&
      !this.game.gameOver
    ) {
      this.game.resume();
    }
  }
}

export default ScreenManager;
