import { Coordinates } from '../classes/Coordinates';
import { Vector } from '../classes/Vector';

interface SpaceObjectParams {
  ctx: CanvasRenderingContext2D;
  coordinates?: Coordinates;
  velocity?: Vector;
}

export abstract class SpaceObject {
  protected readonly ctx: CanvasRenderingContext2D;
  protected coordinates: Coordinates;
  protected velocity: Vector;

  protected constructor({ ctx, coordinates, velocity }: SpaceObjectParams) {
    this.ctx = ctx;
    this.coordinates = coordinates ?? new Coordinates(0, 0);
    this.velocity = velocity ?? Vector.zero();
  }

  public abstract render(): void;

  public setCoordinates(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  public update() {
    if (this.coordinates.x > this.ctx.canvas.width) {
      this.setCoordinates(new Coordinates(0, this.coordinates.y));
    }
    if (this.coordinates.y > this.ctx.canvas.height) {
      this.setCoordinates(new Coordinates(this.coordinates.x, 0));
    }

    if (this.coordinates.x < 0) {
      this.setCoordinates(new Coordinates(this.ctx.canvas.width, this.coordinates.y));
    }
    if (this.coordinates.y < 0) {
      this.setCoordinates(new Coordinates(this.coordinates.x, this.ctx.canvas.height));
    }
  }
}
