<template>
  <v-card>
    <v-card-title>Forms</v-card-title>
    <v-card-text>
      <v-img :src="url" />
      <v-divider />
      <v-card-actions>
        <v-btn v-on:click="generateIconUrl" text>
          Generate
        </v-btn>
      </v-card-actions>
      <v-form ref="test_form">
        <v-text-field
          v-model="label"
          label="Label"
        />
        <v-text-field
          v-model="message"
          label="Message"
        />
        <v-text-field
          v-model="color"
          label="Color"
        />
      </v-form>
      <p>URL: <a :href="url">{{ url }}</a></p>
    </v-card-text>
  </v-card>
</template>

<script>
import IconUrl from '~/components/IconUrl.js'

export default {
  data () {
    return {
      iconUrl: new IconUrl('Label', 'Message', 'Color'),
      label: 'label',
      message: 'message',
      color: 'red',
      success: false, // 送信が成功したかどうかのフラグ
      url: ''
    }
  },
  created () {
    this.generateIconUrl()
  },
  methods: {
    generateIconUrl () {
      this.iconUrl.setParam(this.label, this.message, this.color)
      this.url = this.iconUrl.getUrl()
    }
  }
}
</script>
