
class Menu{
  constructor(){
    this.gameRunning = false;
    this.socket = null;

    this.startbutton = undefined;
    this.restartButton = undefined;
  }

  drawMenu(){
    this.startbutton = createButton('Start Game');
    this.startbutton.position(19, 19);
    this.startbutton.mousePressed(this.startGameEvent);

    this.restartButton = createButton('Toggle-restart');
    this.restartButton.position(100, 19);
    this.restartButton.mousePressed(this.toggleRestart);
  }

  initGame(){
    this.gameRunning = true;
    this.startbutton.remove()
  }

  startGameEvent = () =>{
    if(this.socket != null){
      this.socket.emit('game-start');
    }
  }

  toggleRestart = () =>{
    if(this.socket != null){
      this.socket.emit('toggle-auto-restart');
    }
  }


  //** Sockets **//
  registerSocket(socket){
    this.socket = socket;
  }
}