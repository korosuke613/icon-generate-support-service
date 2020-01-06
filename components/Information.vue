<template>
  <v-card>
    <v-card-title>Information</v-card-title>

    <v-card-text>
      <v-row dense no-gutters>
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
    </v-card-text>

    <v-card-actions>
      <share />
      <v-spacer />
      <v-btn
        @click="dialog = true"
        icon
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline">
            More Information
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  :value="url"
                  label="Badge URL"
                  readonly
                  outlined
                  no-resize="true"
                  onclick="this.select();"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :value="base64"
                  label="BASE64"
                  readonly
                  outlined
                  no-resize="true"
                  onclick="this.select();"
                />
              </v-col>
              <v-col cols="12">
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
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="dialog = false"
              color="green darken-1"
              text
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Share from '~/components/Share.vue'

// const axios = require('axios').default

export default {
  components: {
    Share
  },
  data () {
    return {
      dialog: false
    }
  },
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
