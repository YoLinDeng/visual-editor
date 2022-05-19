import {
  mergeWith,
  tail,
  set,
  get,
  pick,
  transform,
  isEqual,
  isObject,
  throttle,
  cloneDeep,
  fill
} from 'lodash-es'

// 自身向上查找匹配的父元素
const findUpwardElement = ($el: HTMLElement, ids: string[], key: string): HTMLElement => {
  let parent: HTMLElement = $el
  let name = get(parent, key)
  while (parent && (!(name && (key === 'classList' ? ids.some(id => name.contains(id)) : ids.some(id => name.includes(id)))))) {
    parent = parent.parentNode as HTMLElement
    if (parent) (name = get(parent, key))
  }
  return parent
}

export {
  findUpwardElement,
  mergeWith,
  tail,
  set,
  get,
  pick,
  transform,
  isEqual,
  isObject,
  throttle,
  cloneDeep,
  fill
}