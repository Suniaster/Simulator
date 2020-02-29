import AbstractSimulationController from './AbstractSimulationController';
import Wall from '../Objects/GameObjects/Wall';
import AbstractThing from '../Objects/AbstractThing';
import Bird from '../Objects/GameObjects/Bird';

export default class LiveSimulator extends AbstractSimulationController {
  // Flappy
  wallSpawnTime: number;
  wallUpgradeTime: number;
  initialPositon: Vector;

  constructor(grid_size: number[] = [1000, 1000]) {
    super(grid_size);

    this.wallSpawnTime = 160;
    this.wallUpgradeTime = 400;
    this.initialPositon = {
      x: 50,
      y: 50,
    };
  }

  handleKey(id, key) {
  }

  simulationSetup(ids: string[]) {
    this.simulation_running = true;
  }

  simulate() {
    this.updateObjectsPos();
    this.objController.performCollisions();

    this.time += 1;

    return this.simulation_running;
  }

  reset() {
    this.resetSimulation(() => {});
  }

  public jump(id: string): AbstractThing {
    return this.objController.getById(id).jump();
  }
}
