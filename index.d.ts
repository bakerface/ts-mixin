export type Constructor<T> = new (...args: any[]) => T;

export interface Mixin<Features, Requirements = any> {
  <T extends Constructor<Requirements>>(Base: T): T & Constructor<Features>;
}
