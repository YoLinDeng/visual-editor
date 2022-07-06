import * as utils from '@/utils'

type styleType = {
  backgroundImage?: string;
}

const styleBackgroundImage = (bgImg: string): string => {
  return !bgImg ? '' : bgImg.includes('-gradient') ? bgImg : `url(${bgImg})`
}

export const useStyleFix = (val: styleType): styleType => {
  return val.backgroundImage ? { backgroundImage: styleBackgroundImage(val.backgroundImage) } : {}
}

export const useLoopChangeId = (slot: any[]): void => {
  slot.forEach(x => {
    x.id = utils.nanoid()
    if (x.slot && x.slot.length > 0) {
      useLoopChangeId(x.slot)
    }
  })
}