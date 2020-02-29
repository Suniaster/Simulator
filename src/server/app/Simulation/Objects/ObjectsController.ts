import AbstractThing from './AbstractThing';
import Wall from './GameObjects/Wall';
import { Collisions } from 'detect-collisions';

export default class ObjectController {
  objects: { [id: string]: AbstractThing };
  buffer: {
    createdObjs: AbstractThing[];
    deletedIds: String[];
  };
  collisionSystem: Collisions;

  timeScale:number
  constructor() {
    this.objects = {};
    this.buffer = {
      createdObjs: [],
      deletedIds: [],
    };
    this.collisionSystem = new Collisions();

    this.timeScale = 1;
  }

  //* Load/Unload
  register(id: string, obj: AbstractThing): AbstractThing {
    this.objects[id] = obj;
    this.buffer.createdObjs.push(obj);
    this.collisionSystem.insert(obj);
    return obj;
  }

  registerWithObjId(obj: AbstractThing) {
    this.objects[obj.id] = obj;
    this.buffer.createdObjs.push(obj);
    this.collisionSystem.insert(obj);
    return obj;
  }

  delete(id: string) {
    let copy = this.objects[id];
    delete this.objects[id];
    this.buffer.deletedIds.push(id);
    this.collisionSystem.remove(copy);
    return copy;
  }

  reset() {
    this.objects = {};
    this.buffer = {
      createdObjs: [],
      deletedIds: [],
    };
    this.collisionSystem = new Collisions();
  }

  //* Getters
  getObjValues(): ObjectInfoMessage[] {
    let retList = [];
    for (let i in this.objects) {
      let newObj = this.objects[i];
      retList.push(newObj.getValues());
    }
    return retList;
  }

  getById(id): AbstractThing {
    return this.objects[id];
  }

  getObjsWithSymbol(symbol: string): AbstractThing[] {
    return Object.values(this.objects).filter(v => v.symbol === symbol);
  }

  getObjThatIdStartsWith(some_string: string): AbstractThing[] {
    return Object.values(this.objects).filter(v => v.id.startsWith(some_string));
  }
  
  //* Logic operations
  /**
   *
   * @param max_pos
   * @param min_pos
   * @returns List with id of (deleted) objects
   */
  moveAllObjs(max_pos: Vector = { x: 1000000, y: 1000000 }, min_pos: Vector = { x: 0, y: 0 }): String[] {
    return Object.values(this.objects).reduce((acc, obj) => {
      obj.move(this.timeScale);
      if (
        obj.position.x < min_pos.x ||
        obj.position.x > max_pos.x ||
        obj.position.y < min_pos.y ||
        obj.position.y > max_pos.y
      ) {
        this.delete(obj.id);
        acc.push(obj.id);
      }
      return acc;
    }, []);
  }

  performCollisions(){
    this.collisionSystem.update();
    this.forEach((obj: AbstractThing) =>{
      let potentials: any = obj.potentials();
      for (const otherObject of potentials) {
        obj.colidedWith(otherObject, this);
      }
    })
  }

  /**
   *  @description WIP - Pega objeto com a menor distancia em algum eixo
   * @param obj - objeto base
   * @param id_prefix - prefixo dos objetos que devem ser usados na procura
   * @param axis - eixo da menor distancia
   */
  findObjectLessDistance(obj: AbstractThing, id_prefix, axis: 'x' | 'y' = 'x'): AbstractThing {
    let min_dist = 100000;
    let ret_obj = null;
    this.getObjThatIdStartsWith(id_prefix).forEach(val => {
      if (val.position.x - obj.position.x < min_dist && val.position.x + val.width - obj.position.x > 0) {
        min_dist = val.position.x - obj.position.x;
        ret_obj = val;
      }
    });
    if (ret_obj != null) return ret_obj;
    else return new Wall({ x: 5000, y: 400 }, 50, 50);
  }

  forEach(f: (arg1: AbstractThing) => void) {
    Object.values(this.objects).forEach(val => {
      f(val);
    });
  }
}
