import { handlers } from './baseHandlers'
import { ReactiveEffect } from './effect'

// The main WeakMap that stores {target -> key -> dep} connections.
// Conceptually, it's easier to think of a dependency as a Dep class
// which maintains a Set of subscribers, but we simply store them as
// raw Sets to reduce memory overhead.
export type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<string | symbol, Dep>
export const targetMap = new WeakMap<any, KeyToDepMap>()

// WeakMap that stores {observed -> raw} pairs.
const reactiveToRaw = new WeakMap<any, any>()

export function reactive(target: object) {
  const observed = new Proxy(target, handlers)
  reactiveToRaw.set(observed, target)
  return observed
}

export function isReactive(value: any): boolean {
  return reactiveToRaw.has(value)
}

export function toRaw<T>(observed: T): T {
  return reactiveToRaw.get(observed) || observed
}
