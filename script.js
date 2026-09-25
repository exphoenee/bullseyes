import Game from "./src/core/Game.js";
import ScreenManager from "./src/ui/ScreenManager.js";
import ControlsManager from "./src/ui/ControlsManager.js";

window.addEventListener("load", function () {
  const game = new Game();
  game.init();

  new ControlsManager(game);

  const screens = new ScreenManager(game);
  screens.hideLoadingScreen();
  screens.showPauseMenu("play");
});
