import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ContentInput from '@/components/base/content-input.vue'
import ContentAsset from '@/components/base/content-asset.vue'
import ContentBox from '@/components/base/content-box.vue'
import VForm from '@/components/base/v-form.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'default-passive-events'

const app = createApp(App)
app.component('content-input', ContentInput)
app.component('content-asset', ContentAsset)
app.component('content-box', ContentBox)
app.component('v-form', VForm)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// const baseComponents = require.context('./components/base', true, )
// baseComponents.keys().filter(x => !x.includes('.vue')).forEach(fileName => {
//   console.log(fileName)
//   const template = baseComponents(fileName)
//   // console.log(template)
//   app.component(
//     `${template.default.name}`,
//     template.default || template
//   )
// })
app.use(Vant)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
