import Player from "../entities/Player.js";
import Obstacle from "../entities/Obstacle.js";
import Egg from "../entities/Egg.js";
import Enemy from "../entities/Enemy.js";

class Game {
  constructor() {
    // application mode
    this.debug = false;

    // rendering properties
    this.fps = 60;
    this.lastRender = 0;
    this.deltaTime = 0;
    // movement scaled to a 60 FPS baseline so physics is frame-rate independent
    this.frameFactor = 1;

    // game properties
    this.winningScore = 21;
    this.losingScore = -10;
    this.gameOver = false;

    // game area properties
    this.width = 1280;
    this.height = 720;
    this.topMargin = 260;

    // canvas properties
    this.canvas = document.getElementById("canvas1");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "white";
    this.context.strokeStyle = "white";
    this.context.lineWidth = 3;
    this.context.font = "40px Helvetica";

    // game object properties
    this.gameObjects = [];

    // player properties
    this.player = new Player(this);
    this.score = 0;

    // obstacle properties
    this.numberOfObstacles = 10;
    this.obstacles = [];
    this.minimumObstacleDistance = 80;
    this.obstacleAttempts = 5000;

    // egg properties
    this.numberOfEggs = 10;
    this.eggs = [];
    this.minimumEggDistance = 70;
    this.eggTimer = 0;
    this.eggInterval = 2000;

    // enemy properties
    this.numberOfEnemies = 4;
    this.enemies = [];
    this.minimumEnemyDistance = 70;
    this.enemyTimer = 0;
    this.enemyInterval = 2000;

    // larva properties
    this.larvae = [];
    // hatching properties
    this.hatchInterval = 5000;

    // particle properties
    this.particles = [];

    // mouse properties
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };

    // map a pointer position (in CSS pixels) onto the internal 1280x720 space,
    // so the controls stay correct however the canvas is scaled/letterboxed
    const setMousePosition = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((clientX - rect.left) / rect.width) * this.width;
      this.mouse.y = ((clientY - rect.top) / rect.height) * this.height;
    };

    this.canvas.addEventListener("mousedown", (e) => {
      setMousePosition(e.clientX, e.clientY);
      this.mouse.pressed = true;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      setMousePosition(e.clientX, e.clientY);
      this.mouse.pressed = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) setMousePosition(e.clientX, e.clientY);
    });

    // key properties
    window.addEventListener("keydown", (e) => {
      if (e.key === "d") this.debug = !this.debug;
      if (e.key === "r" && this.gameOver) this.restart();
    });
  }

  restart() {
    this.gameOver = false;
    this.score = 0;
    this.obstacles = [];
    this.eggs = [];
    this.enemies = [];
    this.larvae = [];
    this.particles = [];
    this.player.initPosition();
    this.enemyTimer = 0;
    this.eggTimer = 0;
    this.lastRender = 0;
    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.5,
      pressed: false,
    };
    this.init();
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.gameObjects = [
      this.player,
      ...this.obstacles,
      ...this.eggs,
      ...this.enemies,
      ...this.larvae,
      ...this.particles,
    ];
    this.gameObjects.sort((a, b) => a.collisionY - b.collisionY);
    this.gameObjects.forEach((object) => object.update());
    this.context.fillText(`Score: ${this.score}`, 20, 50);
  }

  winMessage() {
    this.context.save();
    this.context.font = "130px Helvetica";
    this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("You Won!", this.width * 0.5, this.height * 0.5);
    this.context.font = "40px Helvetica";
    this.context.fillText(
      "Press 'R' button to restart.",
      this.width * 0.5,
      this.height * 0.5 + 70
    );
    this.context.restore();
  }

  loseMessage() {
    this.context.save();
    this.context.font = "130px Helvetica";
    this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Game Over!", this.width * 0.5, this.height * 0.5);
    this.context.font = "40px Helvetica";
    this.context.fillText(
      "Press 'R' button to restart.",
      this.width * 0.5,
      this.height * 0.5 + 70
    );
    this.context.restore();
  }

  checkCollision(a, b, distanceBuffer = 0) {
    const dx = b.collisionX - a.collisionX;
    const dy = b.collisionY - a.collisionY;
    const distance = Math.hypot(dy, dx);
    const sumOfRadii = a.collisionRadius + b.collisionRadius + distanceBuffer;
    if (distance < sumOfRadii) {
      return {
        collision: true,
        distance,
        sumOfRadii,
        dx,
        dy,
        names: [a.name, b.name],
      };
    }
  }

  addObstacles() {
    let attempts = 0;
    while (
      this.obstacles.length < this.numberOfObstacles &&
      attempts < this.obstacleAttempts
    ) {
      let testObstacle = new Obstacle(this);

      let collision = false;

      // earlier I added the player to the obstacles array, but that was a bad idea because the player takes space from obstacles and fewer obstacles can be generated
      [...this.obstacles].forEach((obstacle) => {
        const a = testObstacle;
        const b = obstacle;
        const distanceBuffer = 150;

        if (this.checkCollision(a, b, distanceBuffer)) {
          collision = true;
        }
      });

      const margin =
        testObstacle.collisionRadius + this.minimumObstacleDistance + 20;

      !collision &&
        testObstacle.spriteX > 0 &&
        testObstacle.spriteX < this.width - testObstacle.width &&
        testObstacle.collisionY > this.topMargin + margin &&
        testObstacle.collisionY < this.height - margin &&
        this.obstacles.push(testObstacle);

      attempts++;
    }
  }

  addEnemy() {
    this.enemies.push(new Enemy(this));
  }

  addEgg() {
    this.eggs.push(new Egg(this));
  }

  animate(timeStamp) {
    const frameTime = 1000 / this.fps;
    if (timeStamp - this.lastRender > frameTime) {
      // clamp to 2 frames to avoid huge jumps on the first frame or after a tab switch
      this.deltaTime = Math.min(timeStamp - this.lastRender, frameTime * 2);
      this.frameFactor = this.deltaTime / frameTime;
      this.lastRender = timeStamp;
      this.render();

      if (
        this.eggTimer > this.eggInterval &&
        this.eggs.length < this.numberOfEggs
      ) {
        this.addEgg();
        this.eggTimer = 0;
      } else {
        this.eggTimer += this.deltaTime;
      }

      if (
        this.enemyTimer > this.enemyInterval &&
        this.enemies.length < this.numberOfEnemies
      ) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += this.deltaTime;
      }
    }

    if (this.score >= this.winningScore) {
      this.winMessage();
      this.gameOver = true;
    }

    if (this.score <= this.losingScore) {
      this.loseMessage();
      this.gameOver = true;
    }

    if (!this.gameOver) window.requestAnimationFrame(this.animate.bind(this));
  }

  init() {
    this.addObstacles();
    this.animate(this.lastRender);
  }
}

export default Game;
