window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class InputHandler {}
  class Layer {}
  class Background {}
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 10;
      this.height = 10;
      this.length = 5;
      this.x = 20;
      this.y = 100;
      this.speed = 2;
      this.dir = "x";
      this.stopped = false;
    }
    update() {
      if (this.dir === "x") this.x += this.speed;
      else if (this.dir === "y") this.y += this.speed;
    }
    draw(context) {
      context.fillStyle = "black";
      for (let i = 0; i < this.length; i++) {
        context.fillRect(this.x + 12 * i, this.y, this.width, this.height);
      }
    }
  }
  class UI {}
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
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
