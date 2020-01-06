<template>
  <div>
    <v-btn
      @click="twitterShare"
      fab
      dark
      target="_blank"
      rel="noopener"
      color="#1DA1F2"
    >
      <v-icon dark>
        mdi-twitter
      </v-icon>
    </v-btn>
    <v-btn
      @click="lineShare"
      fab
      dark
      target="_blank"
      rel="noopener"
      color="#53b535"
    >
      <div
        class="line-it-button"
        data-lang="ja"
        data-type="share-c"
        data-ver="3"
        data-url="https://social-plugins.line.me/ja/how_to_install#lineitbutton"
        data-color="default"
        data-size="large"
        data-count="false"
        style="display: none;"
      />
    </v-btn>
    <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" async="async" defer="defer" />
    <v-btn
      @click="facebookShare"
      fab
      dark
      color="#1877F2"
      target="_blank"
      rel="noopener"
    >
      <v-icon dark>
        mdi-facebook
      </v-icon>
    </v-btn>
    <v-btn
      @click="onCopy(); snackbar = true"
      fab
      dark

      target="_blank"
      color="orange"
      rel="noopener"
    >
      <v-icon dark>
        mdi-code-tags
      </v-icon>
    </v-btn>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="orange"
    >
      Copy to Clipboard!
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
      timeout: 2000
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
