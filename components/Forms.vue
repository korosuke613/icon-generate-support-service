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
import { db } from '~/plugins/firebase.js'

export default {
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
      this.iconUrl.setParam(this.label, this.message, this.color)
      this.setUrl(this.iconUrl.getUrl())
    },
    uploadUrl () {
      const hash = this.iconUrl.getHash()
      const docRef = db.collection('icon_cache').doc(hash)
      docRef.set({
        'url': this.url,
        'base64': this.base64
      })
    },
    submit () {
      if (this.$refs.generate_icon_url_form.validate()) {
        this.generateIconUrl()
        this.uploadUrl()
        // すべてのバリデーションが通過したときのみ
        // if文の中に入る
        this.success = true
      } else {
        this.success = false
      }
    },
    ...mapActions('iconInfo', ['setLabel', 'setMessage', 'setColor', 'setUrl'])
  }
}
</script>
