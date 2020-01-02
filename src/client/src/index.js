let game = new GameWindow();
let socketControl = new SocketsController(game);

socketControl.startConnection();
game.registerSocket(socketControl.socket);

function preload() {
  game.preload();
}

function setup() {
  let canv = createCanvas(game.size.x, game.size.y);
  canv.position(0, 0);
  frameRate(60);
  // game.createFlappy(socketControl.socket.id)
  game.setup();
  game.menu.drawMenu();
}

function draw() {
  // background(game.imgControl.getImage('bg'));
  background(200);
  game.drawFPS();

  if (game.menu.gameRunning) {
    game.objects.moveAndDrawAllObjs();
    game.time += 1;
  }
}

function keyPressed() {
  socketControl.socket.emit('key-press', keyCode);
}
