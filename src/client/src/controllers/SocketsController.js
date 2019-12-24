class SocketsController {
  constructor(gameController) {
    this.gameController = gameController;
    this.socket = undefined;
  }

  startConnection() {
    this.socket = io();

    this.socket.on('game-start', data => {
      resizeCanvas(data.world.width, data.world.height);
      this.gameController.menu.initGame();
    });

    this.socket.on('objects-created', data => {
      data.objects.forEach(val => {
        this.gameController.createObject(val.symbol, val.position, val.vel, val.accel, val.id, val.width, val.height);
      });
    });

    this.socket.on('objects-destroyed', data => {
      data.ids.map(id => {
        this.gameController.objects.unregisterObject(id);
      });
    });

    this.socket.on('game-end', () => {
      //TODO: fazer fim de jogo
      this.gameController.reset();
    });

    this.socket.on('sync-game', data => {
      data.objects.forEach(obj => {
        try {
          this.gameController.objects.updateObj(obj.id, obj.position, obj.vel, obj.accel);
        } catch (e) {
          this.gameController.createObject(obj.symbol, obj.position, obj.vel, obj.accel, obj.id, obj.width, obj.height);
        }
      });
      this.gameController.time = data.time;
    });
  }
}
