// @ts-check
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore({
  id: 'template',
  state: () => ({
    config: [] as any,
    activeElemId: ''
  }),
  getters: {
  },
  actions: {
  },
})