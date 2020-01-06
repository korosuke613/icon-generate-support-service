<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <nuxt-link :to="items[0].to">
        <v-img alt="BEENOCKER - Easy Budge Generator" width="250px" src="/beenocker_logo_detail.svg" />
      </nuxt-link>
      <v-spacer />
      <v-btn
        @click.stop="drawer = !drawer"
        icon
      >
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      fixed
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Index</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list height="300px">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="getQuery()"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      group: null,
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: { path: '/' }
        },
        {
          icon: 'mdi-share',
          title: 'Share',
          to: { path: '/', hash: 'share' }
        },
        {
          icon: 'mdi-tooltip-text-outline',
          title: 'Usage',
          to: { path: '/', hash: 'usage' }
        },
        {
          icon: 'mdi-human-greeting',
          title: 'Developer',
          to: { path: 'developer' }
        }
      ],
      title: 'BEENOCKER: easy budge generator'
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['label', 'message', 'color', 'style', 'logo', 'logoColor'])
  },
  watch: {
    group () {
      this.drawer = false
    }
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
    }
  }
}
</script>
