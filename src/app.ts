import type { SpaceObject } from './Objects/SpaceObject';
import { Background } from './Objects/Background';
import { Ship } from './Objects/Ship';
import { Asteroid } from './Objects/Asteroid';
import { Coordinates } from './classes/Coordinates';
import { Vector } from './classes/Vector';

export class App {
  protected isRunning = false;
  protected readonly ctx: CanvasRenderingContext2D;

  protected objects: SpaceObject[] = [];

  constructor(protected readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      throw new Error('Failed to get 2d context');
    }

    this.ctx = ctx;

    this.run();

    this.objects.push(new Background(this.ctx));

    const ship = new Ship(this.ctx);
    this.objects.push(ship);

    ship.shootSignal.subscribe((bolt) => {
      this.objects.push(bolt);
      bolt.destroyedSignal.subscribe(() => {
        this.objects = this.objects.filter((object) => object !== bolt);
      });
    });

    for (let i = 0; i < 3; i++) {
      this.objects.push(
        new Asteroid({
          ctx: this.ctx,
          coordinates: new Coordinates(0, 0),
          velocity: Vector.fromAngleAndSpeed(Math.random() * Math.PI * 2, Math.random() * 2 + 1),
        }),
      );
    }
  }

  run() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    this.update();
    this.render();
  }

  render() {
    if (this.isRunning) {
      requestAnimationFrame(this.render.bind(this));
    }

    this.ctx.reset();
    this.objects.forEach((object) => {
      object.render();
    });
  }

  update() {
    if (this.isRunning) {
      setTimeout(this.update.bind(this), 1);
    }

    this.objects.forEach((object) => {
      object.update();
    });
  }
}
