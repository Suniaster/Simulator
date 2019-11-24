

class SocketsController{
  constructor(gameController){
    this.gameController = gameController
    this.socket         = undefined
  }

  startConnection(){
    this.socket = io();


    this.socket.on("game-start", (data)=>{
      this.gameController.menu.initGame();
    })

    this.socket.on("objects-created", (data)=>{
      data.objects.forEach((val)=>{
        this.gameController.createObject(
          val.symbol, 
          val.position, 
          val.vel,
          val.accel,
          val.id,
          val.width,
          val.height
        )
      })
    })

    this.socket.on("objects-destroyed", (data)=>{
      data.ids.map((id)=>{
        this.gameController.objects.unregisterObject(id)
      })
    })

    this.socket.on("game-end", ()=>{
      //TODO: fazer fim de jogo
      this.gameController.reset();
      // setTimeout(()=>this.socket.emit('game-start'), 200)
    })

    this.socket.on("jump", (data)=>{
      this.gameController.objects.getObject(data.id).jump(data.vel_y)
    })

    this.socket.on("sync-game", (data)=>{
      data.objects.forEach((obj)=>{
        this.gameController.objects.updateObj(
          obj.id,
          obj.position,
          obj.vel,
          obj.accel
        )
      })
      this.gameController.time = data.time;
    })

  }

}