import { SpaceObject } from './SpaceObject';
import { Coordinates } from '../classes/Coordinates';
import type { Vector } from '../classes/Vector';

interface AsteroidParams {
  ctx: CanvasRenderingContext2D;
  coordinates: Coordinates;
  velocity: Vector;
}

export class Asteroid extends SpaceObject {
  static readonly width = 150;
  static readonly height = 150;

  protected readonly prepared: OffscreenCanvas;

  constructor({ ctx, coordinates, velocity }: AsteroidParams) {
    super({ ctx, coordinates, velocity });

    this.prepared = new OffscreenCanvas(Asteroid.width, Asteroid.height);
    this.redraw();
  }

  protected redraw() {
    const ctx = this.prepared.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2d context');
    }

    ctx.reset();
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, Asteroid.width, Asteroid.height);
  }

  public render() {
    this.ctx.drawImage(
      this.prepared,
      this.coordinates.x - Asteroid.width / 2,
      this.coordinates.y - Asteroid.height / 2,
    );
  }

  public update() {
    super.update();

    this.setCoordinates(
      new Coordinates(this.coordinates.x + this.velocity.x / 10, this.coordinates.y + this.velocity.y / 10),
    );
  }
}
