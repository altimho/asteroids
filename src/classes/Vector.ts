export class Vector {
  static zero() {
    return new Vector(0, 0);
  }

  static fromCoordinates(x: number, y: number) {
    return new Vector(x, y);
  }

  static fromAngleAndSpeed(angle: number, speed: number) {
    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;

    return new Vector(x, y);
  }

  protected constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  add(vector: Vector) {
    const x = this.x + vector.x;
    const y = this.y + vector.y;

    return new Vector(x, y);
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}
