import { SpaceObject } from './SpaceObject';
import { Vector } from '../classes/Vector';
import { Signal } from '../classes/Signal';
import { Coordinates } from '../classes/Coordinates';

export class Bolt extends SpaceObject {
  static readonly width = 4;
  static readonly height = 4;

  protected readonly prepared: OffscreenCanvas;

  constructor(ctx: CanvasRenderingContext2D, coordinates: Coordinates, velocity: Vector) {
    super({ ctx, coordinates, velocity });

    this.prepared = new OffscreenCanvas(Bolt.width, Bolt.height);
    this.prerender();

    setTimeout(() => {
      this.doDestroy();
    }, 2000);
  }

  prerender() {
    const ctx = this.prepared.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2d context');
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, Bolt.width, Bolt.height);
  }

  render() {
    this.ctx.drawImage(this.prepared, this.coordinates.x - 2, this.coordinates.y - 2);
  }

  update() {
    super.update();

    this.setCoordinates(
      new Coordinates(this.coordinates.x + this.velocity.x / 10, this.coordinates.y + this.velocity.y / 10),
    );
  }

  public readonly destroyedSignal = new Signal<void>();

  protected doDestroy() {
    this.destroyedSignal.dispatch();
  }
}
