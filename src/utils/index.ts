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
import { nanoid } from 'nanoid'

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

// 递归查找配置
const findConfig = (config: any[], id: string): any => {
  let currConfig = null
  for (let i = 0; i < config.length; i++) {
    if (config[i].id === id) {
      currConfig = config[i]
      break
    }
    if (config[i]?.slot?.length > 0) {
      currConfig = findConfig(config[i].slot, id)
    }
  }
  return currConfig
}

export {
  findUpwardElement,
  findConfig,
  nanoid,
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