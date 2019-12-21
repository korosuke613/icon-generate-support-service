<template>
  <div>
    <v-card>
      <v-card-title>Forms</v-card-title>
      <v-card-text>
        <v-img id="img1" v-if="isHitData" :src="base64" />
        <v-img id="img1" v-else :src="url" />
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import IconUrl from '~/components/IconUrl.js'
const axios = require('axios').default

// ページを開いた際に表示されるアイコン
const DEFAULT_BASE64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTYiIGhlaWdodD0iMjAiPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDI9IjAiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYmIiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iLjEiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iYSI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSIjNTU1IiBkPSJNMCAwaDM3djIwSDB6Ii8+PHBhdGggZmlsbD0iIzk3Y2EwMCIgZD0iTTM3IDBoNTl2MjBIMzd6Ii8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTAgMGg5NnYyMEgweiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPiA8dGV4dCB4PSIxOTUiIHk9IjE1MCIgZmlsbD0iIzAxMDEwMSIgZmlsbC1vcGFjaXR5PSIuMyIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9IjI3MCI+bGFiZWw8L3RleHQ+PHRleHQgeD0iMTk1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiB0ZXh0TGVuZ3RoPSIyNzAiPmxhYmVsPC90ZXh0Pjx0ZXh0IHg9IjY1NSIgeT0iMTUwIiBmaWxsPSIjMDEwMTAxIiBmaWxsLW9wYWNpdHk9Ii4zIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iNDkwIj5tZXNzYWdlPC90ZXh0Pjx0ZXh0IHg9IjY1NSIgeT0iMTQwIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iNDkwIj5tZXNzYWdlPC90ZXh0PjwvZz4gPC9zdmc+'

export default {
  /* eslint-disable no-console */

  data () {
    return {
      iconUrl: new IconUrl('Label', 'Message', 'Color'),
      success: true, // 送信が成功したかどうかのフラグ
      base64: DEFAULT_BASE64,
      isHitData: true,
      required: value => !!value || 'Please be sure to input.', // 入力必須の制約
      color_required: (value) => {
        const pattern = /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        const reservedColors = ['brightgreen', 'green', 'yellowgreen', 'yellow', 'orange', 'red', 'blue', 'lightgrey', 'success', 'important', 'critical', 'informational', 'inactive', 'blueviolet']
        let isValid = false
        if (reservedColors.includes(value) || pattern.test(value)) {
          isValid = true
        }
        return isValid || 'Invalid Color Code.'
      }
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
          this.isHitData = false
          this.uploadUrl() // base64を取得して登録
        } else {
          this.isHitData = true
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
