import { SpaceObject } from './SpaceObject';
import { Coordinates } from '../classes/Coordinates';

export class Background extends SpaceObject {
  static readonly starsQuantity = 100;
  static readonly starMaxSize = 2;
  static readonly spaceColor = 'black';
  static readonly starColor = 'white';

  protected readonly prepared: OffscreenCanvas;

  constructor(ctx: CanvasRenderingContext2D) {
    super({ ctx, coordinates: new Coordinates(0, 0) });

    this.prepared = new OffscreenCanvas(this.ctx.canvas.width, this.ctx.canvas.height);
    this.prerender();
  }

  protected prerender() {
    const stars: Array<[x: number, y: number, size: number]> = [];

    for (let i = 0; i < Background.starsQuantity; i++) {
      const x = Math.round(Math.random() * this.ctx.canvas.width);
      const y = Math.round(Math.random() * this.ctx.canvas.height);
      const size = Math.ceil(Math.random() * Background.starMaxSize);
      stars.push([x, y, size]);
    }

    const ctx = this.prepared.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2d context');
    }

    // Draw stars
    ctx.fillStyle = Background.spaceColor;
    ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    ctx.fillStyle = Background.starColor;
    stars.forEach(([x, y, size]) => {
      ctx.roundRect(x, y, size, size, size);
      ctx.fill();
    });
  }

  render() {
    this.ctx.drawImage(this.prepared, this.coordinates.x, this.coordinates.y);
  }
}
