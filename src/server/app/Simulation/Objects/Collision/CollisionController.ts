import AbstractThing from "../AbstractThing";


export default class CollisionController{ 

  
  static rectCollision(rect1: AbstractThing, rect2: AbstractThing): boolean{
    // let AX1 = rect1.position.x;
    // let AX2 = (rect1.position.x + rect1.width);
    // let AY1 = rect1.position.y;
    // let AY2 = (rect1.position.y + rect1.height);

    // let BX1 = rect2.position.x;
    // let BX2 = (rect2.position.x + rect2.width);
    // let BY1 = rect2.position.y;
    // let BY2 = (rect2.position.y + rect2.height);

    // if (AX1 < BX2 && AX2 > BX1 &&
    //     AY1 < BY2 && AY2 > BY1) 

    if(
      rect1.position.x < (rect2.position.x + rect2.width) && 
      (rect1.position.x + rect1.width) > rect2.position.x &&
      rect1.position.y < (rect2.position.y + rect2.height) && 
      (rect1.position.y + rect1.height) > rect2.position.y)
      return true
    else return false;
  }

}