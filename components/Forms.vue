<template>
  <v-card>
    <v-card-title>Forms</v-card-title>
    <v-card-text>
      <v-form ref="test_form">
        Textbox
        <v-text-field
          v-model="text1"
          :rules="[required, limit_length]"
          label="Label"
          counter="10"
        />
        <v-text-field
          v-model="text2"
          :rules="[required]"
          label="Message"
        />
        <v-text-field
          v-model="text3"
          label="Color"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn v-on:click="submit" text>
        Send
      </v-btn>
      <span v-if="success">Sucess send！</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      text1: '',
      text2: '',
      text3: '',
      success: false, // 送信が成功したかどうかのフラグ
      required: value => !!value || 'Please be sure to input.', // 入力必須の制約
      limit_length: value => value.length <= 10 || 'Please enter within 10 characters.' // 文字数の制約
    }
  },
  methods: {
    // 送信を試みるメソッド（「送信する」がクリックされたときに呼ばれる）
    submit () {
      if (this.$refs.test_form.validate()) {
        // すべてのバリデーションが通過したときのみ
        // if文の中に入る
        this.success = true
      } else {
        this.success = false
      }
    }
  }
}
</script>
