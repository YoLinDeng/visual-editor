export const config: any = {
  text: {
    value: '<div style="text-align: center; line-height: 1;"><span style="font-size: 14px; color: #333333;">这是一段文字</span></div>',
    style: {},
    name: 'content-input'
  },
  multipleText: {
    value: '<div style="text-align: center; line-height: 1.5;"><span style="font-size: 14px; color: #333333;">这是多行文字<br />多行文字<br />多行文字<br /></span></div>',
    name: 'content-input',
    style: {}
  },
  img: {
    value: require('@/assets/logo.png'),
    name: 'content-asset'
  }
}