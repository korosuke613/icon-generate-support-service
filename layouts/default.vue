<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        @click.stop="fixed = !fixed"
        @click="getQuery()"
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        icon
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <span>&copy; 2019</span>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      :padless="padless"
      app
    >
      <share />
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import Share from '~/components/Share.vue'

export default {
  components: {
    Share
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: { path: '/' }
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: { path: 'inspire' }
        },
        {
          icon: 'mdi-book-information-variant',
          title: 'Forms',
          to: { path: '/forms' }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AIKON'
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['label', 'message', 'color', 'style', 'logo', 'logoColor'])
  },
  mounted () {
    const firebase = require('~/plugins/firebase.js')
  },
  methods: {
    getQuery () {
      this.items.forEach((it) => {
        it.to.query = {
          la: this.label,
          me: this.message,
          co: this.color,
          st: this.style,
          lo: this.logo,
          lc: this.logoColor
        }
      })
    }
  }
}
</script>
