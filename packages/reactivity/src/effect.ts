import { Dep, targetMap } from './reactive'

export interface ReactiveEffect<T = any> {
  (): T
  deps: Array<Dep>
}

const activeReactiveEffectStack: ReactiveEffect[] = []

export function effect<T = any>(fn: () => T): ReactiveEffect<T> {
  const effect: ReactiveEffect = function reactiveEffect(): any {
    activeReactiveEffectStack.push(effect)
    return fn()
  }
  effect.deps = []
  effect()
  return effect
}

export function track(target: any, key: string) {
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]

  if (!effect) {
    return
  }

  let depsMap = targetMap.get(target) || new Map()
  targetMap.set(target, depsMap)

  let dep = depsMap.get(key) || new Set()
  depsMap.set(key, dep)

  dep.add(effect)
  effect.deps.push(dep)
}

export function trigger(target: any, key: string) {
  const depsMap = targetMap.get(target) || new Map()
  const effects = depsMap.get(key) || []
  effects.forEach((effect: ReactiveEffect) => effect())
}
