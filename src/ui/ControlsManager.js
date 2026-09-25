import TouchControls from "./TouchControls.js";

const STORAGE_KEY = "bullseye-control-mode";

// A touchscreen laptop reports a coarse (touch) *primary* pointer in most
// browsers, same as a phone - but unlike a phone it also has a trackpad or
// mouse available, which "any-pointer: fine" picks up. Only devices with no
// fine pointer at all (phones, tablets) get the joystick by default; the
// player can still flip it manually from the pause menu either way.
function detectTouchPreferred() {
  const coarsePrimary = window.matchMedia("(pointer: coarse)").matches;
  const finePointerAvailable = window.matchMedia("(any-pointer: fine)").matches;
  return coarsePrimary && !finePointerAvailable;
}

function readStoredMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "touch" || stored === "mouse" ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // ignore (private browsing, storage disabled, ...)
  }
}

class ControlsManager {
  constructor(game) {
    this.game = game;
    this.touchControls = null;

    this.mouseButton = document.getElementById("controls-mouse-btn");
    this.touchButton = document.getElementById("controls-touch-btn");

    this.mouseButton.addEventListener("click", () => this.setMode("mouse"));
    this.touchButton.addEventListener("click", () => this.setMode("touch"));

    const initialMode =
      readStoredMode() ?? (detectTouchPreferred() ? "touch" : "mouse");
    this.applyMode(initialMode);
  }

  setMode(mode) {
    writeStoredMode(mode);
    this.applyMode(mode);
  }

  applyMode(mode) {
    this.mode = mode;
    this.mouseButton.classList.toggle("active", mode === "mouse");
    this.touchButton.classList.toggle("active", mode === "touch");

    if (mode === "touch" && !this.touchControls) {
      this.touchControls = new TouchControls(this.game);
    } else if (mode === "mouse" && this.touchControls) {
      this.touchControls.destroy();
      this.touchControls = null;
    }
  }
}

export default ControlsManager;
