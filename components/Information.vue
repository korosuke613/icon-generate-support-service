<template>
  <v-card>
    <v-card-title>Information</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-textarea
            :value="url"
            label="Badge URL"
            readonly
            outlined
          />
        </v-col>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-textarea
            :value="base64"
            label="BASE64"
            readonly
            outlined
          />
        </v-col>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-textarea
            :value="sharedUrl"
            label="Share URL"
            readonly
            outlined
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
// const axios = require('axios').default

export default {
  computed: {
    ...mapGetters('iconInfo', ['url', 'base64', 'sharedUrl'])
  }
}
</script>
