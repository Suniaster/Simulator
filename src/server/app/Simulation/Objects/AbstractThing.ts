import { Polygon } from 'detect-collisions';
import ObjectController from './ObjectsController';

export default abstract class AbstractThing extends Polygon {
  static gravity = 1;

  public velocity: Vector;
  public accel: Vector;
  public symbol: string;

  constructor(public position: Vector, public width, public height, public id: string, points?: number[][]) {
    super(position.x, position.y, points);
  }

  static makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public move(timeScale:number=1) {
    this.updateVel(timeScale);
    this.position.x += this.velocity.x*timeScale;
    this.position.y += this.velocity.y*timeScale;

    this.x = this.position.x;
    this.y = this.position.y;
  }

  public updateVel(timeScale:number=1) {
    this.velocity.x += this.accel.x*timeScale;
    this.velocity.y += this.accel.y*timeScale;
  }

  public getValues(): ObjectInfoMessage {
    return {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      vel: {
        x: this.velocity.x,
        y: this.velocity.y,
      },
      accel: {
        x: this.accel.x,
        y: this.accel.y,
      },
      symbol: this.symbol,
      width: this.width,
      height: this.height,
      id: this.id,
    };
  }

  public jump(): AbstractThing {
    this.velocity.y = -15;
    return this;
  }

  public abstract colidedWith(obj: AbstractThing, world:ObjectController);
}
