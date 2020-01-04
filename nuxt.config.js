import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'AIKON',
    title: 'AIKON',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'AIKON' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://aikon-eaf3a.firebaseapp.com' },
      { hid: 'og:title', property: 'og:title', content: 'AIKON' },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description || '' },
      { hid: 'og:image', property: 'og:image', content: 'https://storage.googleapis.com/aikon-eaf3a.appspot.com/cards/f6d9c37aa45fedf11718f11af97f3c940f17332f.png?GoogleAccessId=aikon-eaf3a%40appspot.gserviceaccount.com&Expires=1742169600&Signature=Stfz8pgqD2CLHI4hkhilREI4DGxTz%2FwGICqD6ah3m6kb9hofsT8tf7PLbTV48R3AWLcrrjNLVaz%2BMkCD2GcnIl%2FWg1VQiq8JxTDaJ%2B4WM5ShpKvS%2B44s1fzTcMVh9Ok8P0Lo8vbVPg1l2ILhOs0LIltmhWz%2F69M8NS%2BqWDksqc2b0tLsxwzBuyUJTV%2B7JNGmqi1LdEQy4xbOdaiLANs6PfHaeRfdJl1iUsHbJx2fY2L0PJZXU%2FUh2kYIl%2Baea6pjfA%2Bcr%2BXF6mv%2FmiwzOiqfAQKg5NP6hK8YxaznvhT%2FEuzeIxW7bmlO38MGN02u7W1rRgLPZZaaCyGSd5J1A%2B7f2w%3D%3D' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://aikon-eaf3a.firebaseapp.com'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-clipboard2'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
