<template>
  <v-card>
    <v-card-title>Information</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-textarea
            :value="getMarkdown()"
            label="Markdown"
            readonly
            outlined
            no-resize="true"
            onclick="this.select();"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            :value="getHtml()"
            label="HTML"
            readonly
            outlined
            no-resize="true"
            onclick="this.select();"
          />
        </v-col>
      </v-row>
      <v-expansion-panels
        flat="true"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>more</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                <v-textarea
                  :value="url"
                  label="Badge URL"
                  readonly
                  outlined
                  no-resize="true"
                  onclick="this.select();"
                />
              </v-col>
              <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                <v-textarea
                  :value="base64"
                  label="BASE64"
                  readonly
                  outlined
                  no-resize="true"
                  onclick="this.select();"
                />
              </v-col>
              <v-col cols="6" sm="6" md="6" lg="6" xl="6">
                <v-textarea
                  :value="sharedUrl"
                  label="Share URL"
                  readonly
                  outlined
                  no-resize="true"
                  onclick="this.select();"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
// const axios = require('axios').default

export default {
  computed: {
    ...mapGetters('iconInfo', ['label', 'message', 'url', 'base64', 'sharedUrl', 'embedUrl'])
  },
  methods: {
    getMarkdown () {
      return `[![${this.label} ${this.message}](${this.url})](${this.embedUrl})`
    },
    getHtml () {
      return `<a href="${this.embedUrl}"><img src="${this.url}" /></a>`
    }
  }
}
</script>
