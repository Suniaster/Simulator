import InterfaceGeneticAlgorithm from "./InterfaceGeneticAlgorithm";
import NeuralBird from "../../Objects/Neural/NeuralBirds";


export default class FlappyGenetic extends InterfaceGeneticAlgorithm<NeuralBird>{


  public makeObjsPerform(){
    this.objects.forEach((bird:NeuralBird)=>{
      if(bird.alive){
        let wall = this.objects_controller.findObjectLessDistance(bird, 'wall-down')
        let dist = wall.position.x + wall.width

        bird.perform([dist, wall.position.y, bird.position.y, bird.velocity.y])
      }
    })
  }
}