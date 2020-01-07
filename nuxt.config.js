import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + 'BEENOCKER: easy budge generator',
    title: 'BEENOCKER: easy budge generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'BEENOCKER: easy budge generator' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://beenocker.tech/' },
      { hid: 'og:title', property: 'og:title', content: 'BEENOCKER: easy budge generator' },
      { hid: 'og:description', property: 'og:description', content: 'Easy budge generator' },
      { hid: 'og:image', property: 'og:image', content: 'https://beenocker.tech/beenocker_ogp_logo.png' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ],
    script: [
      {
        'data-ad-client': 'ca-pub-7246355771451460',
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'image_src', type: 'image/png', href: '/beenocker_ogp_logo.png' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://beenocker.tech/'
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
    { src: '~/plugins/firebase', mode: 'client' },
    'plugins/vuetify'
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
    'nuxt-clipboard2',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://beenocker.tech',
    exclude: []
  },
  manifest: {
    name: 'BEENOCKER - Easy Budge Generator',
    short_name: 'BEENOCKER',
    lang: 'en'
  },
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
