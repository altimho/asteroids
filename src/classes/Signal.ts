export class Signal<T> {
  protected readonly subscribers: Array<(payload: T) => void> = [];

  subscribe(cb: (payload: T) => void) {
    this.subscribers.push(cb);
  }

  dispatch(payload: T) {
    this.subscribers.forEach((cb) => cb(payload));
  }
}
