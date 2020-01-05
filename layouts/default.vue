<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <nuxt-link :to="top.to">
        <v-img alt="BEENOCKER - Easy Budge Generator" width="300px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjEwIiBoZWlnaHQ9IjIwIj48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgyPSIwIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYmJiIiBzdG9wLW9wYWNpdHk9Ii4xIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9Ii4xIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImEiPjxyZWN0IHdpZHRoPSIyMTAiIGhlaWdodD0iMjAiIHJ4PSIzIiBmaWxsPSIjZmZmIi8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9IiM1NTUiIGQ9Ik0wIDBoNzl2MjBIMHoiLz48cGF0aCBmaWxsPSJwdXJwbGUiIGQ9Ik03OSAwaDEzMXYyMEg3OXoiLz48cGF0aCBmaWxsPSJ1cmwoI2IpIiBkPSJNMCAwaDIxMHYyMEgweiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPiA8dGV4dCB4PSI0MDUiIHk9IjE1MCIgZmlsbD0iIzAxMDEwMSIgZmlsbC1vcGFjaXR5PSIuMyIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9IjY5MCI+QkVFTk9DS0VSPC90ZXh0Pjx0ZXh0IHg9IjQwNSIgeT0iMTQwIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iNjkwIj5CRUVOT0NLRVI8L3RleHQ+PHRleHQgeD0iMTQzNSIgeT0iMTUwIiBmaWxsPSIjMDEwMTAxIiBmaWxsLW9wYWNpdHk9Ii4zIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iMTIxMCI+ZWFzeSBidWRnZSBnZW5lcmF0b3I8L3RleHQ+PHRleHQgeD0iMTQzNSIgeT0iMTQwIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iMTIxMCI+ZWFzeSBidWRnZSBnZW5lcmF0b3I8L3RleHQ+PC9nPiA8L3N2Zz4=" />
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
