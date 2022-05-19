// @ts-check
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore({
  id: 'template',
  state: () => ({
    config: [] as any,
    count: 123
  }),
  getters: {
  },
  actions: {
  },
})