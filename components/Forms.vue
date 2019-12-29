<template>
  <client-only placeholder="Loading...">
    <div>
      <v-card>
        <v-card-title>Forms</v-card-title>
        <v-card-text>
          <a :href="rasterUrl">
            <v-img id="img1" v-if="isHitData" :src="base64" />
            <v-img id="img1" v-else :src="url" />
          </a>
          <v-divider />
          <v-form ref="generate_icon_url_form">
            <v-text-field
              @input="setLabel"
              :value="label"
              label="Label"
            />
            <v-text-field
              :rules="[required]"
              @input="setMessage"
              :value="message"
              label="Message"
            />
            <v-text-field
              :rules="[color_required]"
              @input="setColor"
              :value="color"
              label="Color"
            />
            <v-select
              :items="styles"
              :value="style"
              @input="setStyle"
              label="Styles"
            />
            <v-row>
              <v-col class="d-flex" cols="12" sm="6">
                <v-autocomplete
                  @input="setLogo"
                  :value="logo"
                  :items="logos"
                  label="Simple Icon"
                  placeholder="Start typing to Search"
                  return-object
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                  :rules="[color_required]"
                  @input="setLogoColor"
                  :value="logoColor"
                  label="Simple Icon Color"
                />
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-row align="center">
              <v-col cols="12">
                <div class="text-center">
                  <v-btn v-on:click="submit" :to="param" color="orange" dark block>
                    Generate Icon!
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <result />
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Result from '~/components/Result.vue'

import IconUrl from '~/components/IconUrl.js'
const axios = require('axios').default

const simpleIcons = require('~/assets/simple_icons.json').icons
const simpleIconsOnlyName = ['none'].concat(simpleIcons.map(icon => icon.title))
const colorNames = require('~/assets/cssColorNames.json').colors
const colorNamesWithStatus = ['none', 'success', 'important', 'critical', 'informational', 'inactive'].concat(colorNames)

export default {
  /* eslint-disable no-console */
  components: {
    Result
  },
  data () {
    return {
      iconUrl: new IconUrl(),
      success: true, // 送信が成功したかどうかのフラグ
      // base64: DEFAULT_BASE64,
      isHitData: false,
      styles: ['flat', 'flat-square', 'plastic', 'for-the-badge', 'social'],
      logos: simpleIconsOnlyName,
      required: value => !!value || 'Please be sure to input.', // 入力必須の制約
      color_required: (value) => {
        const pattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        const reservedColors = colorNamesWithStatus
        let isValid = false
        if (reservedColors.includes(value) || pattern.test(value)) {
          isValid = true
        }
        return isValid || 'Invalid Color Code.'
      },
      ogpData: {}
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['label', 'message', 'color', 'url', 'base64', 'style', 'logo', 'logoColor', 'param', 'rasterUrl'])
  },
  created () {
    this.setGetParams()
    this.generateIconUrl()
  },
  mounted () {
    if (window.location.search === '') { return }
    const variables = window.location.search.split('?')[1].split('&')
    const obj = {}
    variables.forEach(function (v, i) {
      const variable = v.split('=')
      obj[variable[0]] = Number(variable[1])
    })
    this.ogpData = {
      me: obj.message,
      la: obj.label,
      co: obj.color,
      st: obj.style,
      lo: obj.logo,
      lc: obj.logoColor
    }
  },
  methods: {
    setGetParams () {
      if (this.$nuxt.$route.query.la !== undefined) { this.setLabel(this.$nuxt.$route.query.la) }
      if (this.$nuxt.$route.query.me !== undefined) { this.setMessage(this.$nuxt.$route.query.me) }
      if (this.$nuxt.$route.query.co !== undefined) { this.setColor(this.$nuxt.$route.query.co) }
      if (this.$nuxt.$route.query.st !== undefined) { this.setStyle(this.$nuxt.$route.query.st) }
      if (this.$nuxt.$route.query.lo !== undefined) { this.setLogo(this.$nuxt.$route.query.lo) }
      if (this.$nuxt.$route.query.lc !== undefined) { this.setLogoColor(this.$nuxt.$route.query.lc) }
    },
    generateIconUrl () {
      // アイコンのURLを整形
      this.iconUrl.setParam(this.label, this.message, this.color, this.style, this.logo, this.logoColor)
      const url = this.iconUrl.getUrl()
      this.setUrl(url)
      return url
    },

    async getIcon () {
      try {
        const response = await axios.post('/getIcon', {
          'url': this.url
        })
        return response.data
      } catch (e) {
        throw e
      }
    },

    async uploadUrl () {
      try {
        const response = await axios.post('/uploadIcon', {
          'url': this.url
        })
        return response.data
      } catch (e) {
        throw e
      }
    },
    async submit () {
      if (this.$refs.generate_icon_url_form.validate()) {
        this.generateIconUrl() // アイコンURLを生成
        this.setBase64(await this.getIcon()) // データベースからbase64を取得
        if (this.base64 === 'No such document' || this.base64 === 'data:image/svg+xml;base64,' || this.base64 === undefined) { // データが無かった場合、データベースにbase64を登録する
          console.log(`Info: not index, get Icon`)
          this.isHitData = false
          this.uploadUrl() // base64を取得して登録
        } else if (this.base64.includes('<!doctype')) {
          this.isHitData = false
        } else {
          this.isHitData = true
        }
        this.success = true
      } else {
        this.success = false
      }
    },
    ...mapActions('iconInfo', ['setLabel', 'setMessage', 'setColor', 'setUrl', 'setBase64', 'setStyle', 'setLogo', 'setLogoColor'])
  }
}
</script>
