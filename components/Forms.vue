<template>
  <div>
    <v-card>
      <v-card-title>Forms</v-card-title>
      <v-card-text>
        <v-img id="img1" :src="url" />
        <v-divider />
        <v-form ref="generate_icon_url_form">
          <v-text-field
            @input="setLabel"
            value="label"
            label="Label"
          />
          <v-text-field
            :rules="[required]"
            @input="setMessage"
            value="message"
            label="Message"
          />
          <v-text-field
            @input="setColor"
            valuel="color"
            label="Color"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="submit">
          Generate
        </v-btn>
        <span v-if="success" />
        <span v-else> Invalid input </span>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-text>
        <p>URL: <a :href="url">{{ url }}</a></p>
        <p>Base64: <a :href="base64">{{ base64 }}</a></p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import IconUrl from '~/components/IconUrl.js'
const axios = require('axios').default

export default {
  /* eslint-disable no-console */

  data () {
    return {
      iconUrl: new IconUrl('Label', 'Message', 'Color'),
      success: true, // 送信が成功したかどうかのフラグ
      base64: '',
      required: value => !!value || 'Please be sure to input.' // 入力必須の制約
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['label', 'message', 'color', 'url'])
  },
  created () {
    this.generateIconUrl()
  },
  methods: {
    generateIconUrl () {
      // アイコンのURLを整形
      this.iconUrl.setParam(this.label, this.message, this.color)
      const url = this.iconUrl.getUrl()
      this.setUrl(url)
      return url
    },

    async getIcon () {
      try {
        const response = await axios.post('/getIcon', {
          'url': this.url
        })
        console.log(response)
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
        console.log(response)
        return response.data
      } catch (e) {
        throw e
      }
    },
    async submit () {
      if (this.$refs.generate_icon_url_form.validate()) {
        this.generateIconUrl() // アイコンURLを生成
        this.base64 = await this.getIcon() // データベースからbase64を取得
        if (this.base64 === 'No such document' || this.base64 === undefined) { // データが無かった場合、データベースにbase64を登録する
          console.log(`Info: not index, get Icon`)
          await this.uploadUrl() // base64を取得して登録
        }
        this.success = true
      } else {
        this.success = false
      }
    },
    ...mapActions('iconInfo', ['setLabel', 'setMessage', 'setColor', 'setUrl'])
  }
}
</script>
