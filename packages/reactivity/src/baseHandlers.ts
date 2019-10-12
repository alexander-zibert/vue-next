import { reactive } from './reactive'
import { track, trigger } from './effect'

const isObject = (val: any): boolean => val !== null && typeof val === 'object'

function get(target: any, key: string, receiver: any) {
  const res = Reflect.get(target, key, receiver)
  track(target, key)
  return isObject(res) ? reactive(res) : res
}

function set(target: any, key: string, value: any, receiver: any): boolean {
  const result = Reflect.set(target, key, value, receiver)
  trigger(target, key)
  return result
}

function deleteProperty(target: any, key: string): boolean {
  const result = Reflect.deleteProperty(target, key)
  trigger(target, key)
  return result
}

export const handlers: ProxyHandler<any> = {
  get,
  set,
  deleteProperty
}
