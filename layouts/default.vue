<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <nuxt-link :to="top.to">
        <v-img alt="BEENOCKER - Easy Budge Generator" width="250px" src="/beenocker_logo.svg" />
      </nuxt-link>
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
      top: {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: { path: '/' }
      },
      items: [
        {
          icon: 'mdi-human-greeting',
          title: 'Inspire',
          to: { path: 'inspire' }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BEENOCKER: easy budge generator'
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
      const tmp = {
        la: this.label,
        me: this.message,
        co: this.color,
        st: this.style,
        lo: this.logo,
        lc: this.logoColor
      }
      this.items.forEach((it) => {
        it.to.query = tmp
      })
      this.top.to.query = tmp
    }
  }
}
</script>
