<template>
  <div id="share">
    <v-btn
      v-for="(share, index) in shares"
      :key="index"
      :color="share.color"
      @click="share.click"
      fab
      dark
      target="_blank"
      rel="noopener"
    >
      <v-icon dark>
        {{ share.icon }}
      </v-icon>
    </v-btn>
    <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer" />

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="purple"
    >
      Copy Share Link to Clipboard!
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// const axios = require('axios').default

export default {
  data () {
    return {
      twitterShareUrl: '',
      facebookShareUrl: '',
      lineShareUrl: '',
      snackbar: false,
      timeout: 2000,
      shares: [
        { click: this.twitterShare, color: '#1DA1F2', icon: 'fab fa-twitter' },
        { click: this.lineShare, color: '#53b535', icon: 'fab fa-line' },
        { click: this.facebookShare, color: '#1877F2', icon: 'fab fa-facebook' },
        { click: this.onCopy, color: 'purple', icon: 'fas fa-share' }
      ]
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['url', 'base64', 'sharedUrl'])
  },
  created () {
    this.setTwitterShareUrl()
    this.setFacebookShareUrl()
    this.setLineShareUrl()
  },
  methods: {
    onCopy () {
      this.snackbar = true
      this.$copyText(this.sharedUrl)
    },
    setTwitterShareUrl () {
      const text = encodeURIComponent('バッジを作成しました😎')
      const hashtags = encodeURIComponent('BEENOCKER')
      // const via = 'Shitimi_613'
      this.twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${encodeURIComponent(this.sharedUrl)}`
    },
    setFacebookShareUrl () {
      this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.sharedUrl)}`
    },
    setLineShareUrl () {
      this.lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(this.sharedUrl)}`
    },
    twitterShare () {
      this.setTwitterShareUrl()
      window.open(this.twitterShareUrl, 'newwindow', 'width=600,height=500')
    },
    facebookShare () {
      this.setFacebookShareUrl()
      window.open(this.facebookShareUrl, 'newwindow', 'width=600,height=500')
    },
    setGetParams () {
      return {
        la: this.$nuxt.$route.query.la || '',
        me: this.$nuxt.$route.query.me || 'message',
        co: this.$nuxt.$route.query.co || 'green',
        st: this.$nuxt.$route.query.st || 'flat',
        lo: this.$nuxt.$route.query.lo || 'none',
        lc: this.$nuxt.$route.query.lc || 'none'
      }
    },
    lineShare () {
      this.setLineShareUrl()
      /*       let response = ''
      try {
        response = await axios.get('/uploadOgpCard', {
          params: this.setGetParams()
        })
      } catch (e) {
        throw e
      }
      // eslint-disable-next-line no-console
      console.log(response) */
      window.open(this.lineShareUrl, 'newwindow', 'width=600,height=500')
    }
  }
}
</script>

<style scoped>
.twitter_share{
    max-width: 1000px;
    margin: auto;
}
</style>
