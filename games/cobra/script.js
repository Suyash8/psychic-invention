window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;

      this.x = 80;
      this.y = 100;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "Enter") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.x = this.game.player.x[0];
          this.y = this.game.player.y[0];
          this.game.keys.push(e.key);
          this.arrow = e.key;
        }
        //   else if (e.key === " ") this.game.player.shootTop();
      });
      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key, 1));
        }
      });
    }
  }

  class Layer {}
  class Background {}
  class Blocks {
    constructor(game, player) {
      this.game = game;
      this.player = player;
      this.width = 10;
      this.height = 10;
    }
  }
  class Player {
    constructor(game) {
      this.game = game;
      this.x = [];
      this.y = [];
      this.dir = [];
      this.blocks = [];
      for (let i = 0; i < 5; i++) {
        this.blocks.push(new Blocks(game, this));
        this.x.push(80 - 12 * i);
        this.y.push(100);
        this.dir.push["x"];
      }
      this.speed = 2;

      this.stopped = false;
    }

    move() {
      for (let i = 0; i < this.blocks.length; i++) {
        if (i !== 0 && this.dir[this.blocks.length - 1] !== this.dir[0]) {
          console.log(this.game.input.x);
          console.log(this.game.input.y);
          // this.dir[i] = this.dir[0];
          if (this.dir[0] === "x" && this.y[i] === this.game.input.y) {
            this.dir[i] = "x";
          } else if (this.dir[0] === "-x" && this.y[i] === this.game.input.y) {
            this.dir[i] = "-x";
          } else if (this.dir[0] === "y" && this.x[i] === this.game.input.x) {
            this.dir[i] = "y";
          } else if (this.dir[0] === "-y" && this.x[i] === this.game.input.x) {
            this.dir[i] = "-y";
          }
        }

        switch (this.dir[i]) {
          case "x":
            this.x[i] += this.speed;
            break;
          case "y":
            this.y[i] += this.speed;
            break;
          case "-x":
            this.x[i] -= this.speed;
            break;
          case "-y":
            this.y[i] -= this.speed;
            break;
          default:
            this.y[i] = this.y[i];
            this.x[i] = this.x[i];
        }
      }
    }
    dirUpdate() {
      let ele = this.game.keys[this.game.keys.length - 1];

      if (ele === "ArrowUp" && this.dir[0] !== "y") this.dir[0] = "-y";
      else if (ele === "ArrowDown" && this.dir[0] !== "-y") this.dir[0] = "y";
      else if (ele === "ArrowLeft" && this.dir[0] !== "x") this.dir[0] = "-x";
      else if (ele === "ArrowRight" && this.dir[0] !== "-x") this.dir[0] = "x";
    }
    
    update() {

      this.dirUpdate();
      this.move();
    }
    draw(context, i) {
      context.fillStyle = "black";
      for (let i = 0; i < this.blocks.length; i++) {
        context.fillRect(
          this.x[i],
          this.y[i],
          this.blocks[i].width,
          this.blocks[i].height
        );
      }
    }
  }
  class UI {}
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.keys = [];
    }
    update() {
      this.player.update();
    }
    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
