import { SpaceObject } from './SpaceObject';
import { Vector } from '../classes/Vector';
import { Bolt } from './Bolt';
import { Signal } from '../classes/Signal';
import { Coordinates } from '../classes/Coordinates';

export class Ship extends SpaceObject {
  static readonly width = 250;
  static readonly height = 250;

  protected readonly prepared: OffscreenCanvas;

  protected angle = Math.PI * 1.5;

  protected isAccelerating = 0;
  protected isRotating = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    super({ ctx, coordinates: new Coordinates(ctx.canvas.width / 2, ctx.canvas.height / 2) });

    this.prepared = new OffscreenCanvas(Ship.width, Ship.height);
    this.redraw();

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.isRotating = -0.03;
      }
      if (event.key === 'ArrowRight') {
        this.isRotating = 0.03;
      }
      if (event.key === 'ArrowUp') {
        this.isAccelerating = 0.25;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowLeft') {
        this.isRotating = 0;
      }
      if (event.key === 'ArrowRight') {
        this.isRotating = 0;
      }
      if (event.key === 'ArrowUp') {
        this.isAccelerating = 0;
      }
      if (event.key === ' ') {
        this.doShoot();
      }
    });
  }

  protected redraw() {
    const ctx = this.prepared.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get 2d context');
    }

    ctx.reset();

    ctx.translate(25, 25);
    ctx.rotate(this.angle + Math.PI / 2);

    ctx.save();
    ctx.fillStyle = 'skyblue';
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(15, 15);
    ctx.lineTo(0, 10);
    ctx.lineTo(-15, 15);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (this.isAccelerating) {
      ctx.save();
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(3, 15);
      ctx.lineTo(0, 25);
      ctx.lineTo(-3, 15);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  render() {
    this.ctx.drawImage(this.prepared, this.coordinates.x - 25, this.coordinates.y - 25);
  }

  update() {
    super.update();

    if (this.isRotating) {
      this.doRotate(this.isRotating);
    }

    if (this.isAccelerating) {
      this.doAccelerate(this.isAccelerating);
    }

    this.coordinates = new Coordinates(
      this.coordinates.x + this.velocity.x / 10,
      this.coordinates.y + this.velocity.y / 10,
    );

    this.redraw();
  }

  doRotate(rad: number) {
    this.angle += rad;
  }

  doAccelerate(speed: number) {
    const accelerationVector = Vector.fromAngleAndSpeed(this.angle, speed);
    this.velocity = this.velocity.add(accelerationVector);
  }

  public readonly shootSignal = new Signal<Bolt>();

  protected doShoot() {
    const shootVector = Vector.fromAngleAndSpeed(this.angle, 25);

    const bolt = new Bolt(this.ctx, this.coordinates, this.velocity.add(shootVector));

    this.shootSignal.dispatch(bolt);
  }
}
