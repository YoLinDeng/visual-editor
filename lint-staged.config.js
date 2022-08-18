module.exports = {
  '*.{js,jsx,vue,ts,tsx}': [
    'vue-cli-service lint'
  ],
  '*.{html,css,less,vue}': [
    'npm run lint:css'
  ]
}
