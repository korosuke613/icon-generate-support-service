<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="3" sm="2" mg="2" lg="2" xl="2">
          <a @click="twitterShare" target="_blank" rel="noopener">
            <v-img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNzUiIGhlaWdodD0iMjAiPjxnIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyI+PHBhdGggZmlsbD0iIzAwN2VjNiIgZD0iTTAgMGgxOHYyMEgweiIvPjxwYXRoIGZpbGw9IiMwMDdlYzYiIGQ9Ik0xOCAwaDU3djIwSDE4eiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPjxpbWFnZSB4PSI1IiB5PSIzIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNKM2FHbDBaU0lnY205c1pUMGlhVzFuSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK1BIUnBkR3hsUGxSM2FYUjBaWElnYVdOdmJqd3ZkR2wwYkdVK1BIQmhkR2dnWkQwaVRUSXpMamsxTkNBMExqVTJPV010TGpnNE5TNHpPRGt0TVM0NE15NDJOVFF0TWk0NE1qVXVOemMxSURFdU1ERTBMUzQyTVRFZ01TNDNPVFF0TVM0MU56UWdNaTR4TmpNdE1pNDNNak10TGprMU1TNDFOVFV0TWk0d01EVXVPVFU1TFRNdU1USTNJREV1TVRnMExTNDRPVFl0TGprMU9TMHlMakUzTXkweExqVTFPUzB6TGpVNU1TMHhMalUxT1MweUxqY3hOeUF3TFRRdU9USWdNaTR5TURNdE5DNDVNaUEwTGpreE55QXdJQzR6T1M0d05EVXVOelkxTGpFeU55QXhMakV5TkVNM0xqWTVNU0E0TGpBNU5DQTBMakEyTmlBMkxqRXpJREV1TmpRZ015NHhOakZqTFM0ME1qY3VOekl5TFM0Mk5qWWdNUzQxTmpFdExqWTJOaUF5TGpRM05TQXdJREV1TnpFdU9EY2dNeTR5TVRNZ01pNHhPRGdnTkM0d09UWXRMamd3TnkwdU1ESTJMVEV1TlRZMkxTNHlORGd0TWk0eU1qZ3RMall4Tm5ZdU1EWXhZekFnTWk0ek9EVWdNUzQyT1RNZ05DNHpOelFnTXk0NU5EWWdOQzQ0TWpjdExqUXhNeTR4TVRFdExqZzBPUzR4TnpFdE1TNHlPVFl1TVRjeExTNHpNVFFnTUMwdU5qRTFMUzR3TXkwdU9URTJMUzR3T0RZdU5qTXhJREV1T1RVeklESXVORFExSURNdU16YzNJRFF1TmpBMElETXVOREUzTFRFdU5qZ2dNUzR6TVRrdE15NDRNRGtnTWk0eE1EVXROaTR4TURJZ01pNHhNRFV0TGpNNUlEQXRMamMzT1MwdU1ESXpMVEV1TVRjdExqQTJOeUF5TGpFNE9TQXhMak01TkNBMExqYzJPQ0F5TGpJd09TQTNMalUxTnlBeUxqSXdPU0E1TGpBMU5DQXdJREV6TGprNU9TMDNMalE1TmlBeE15NDVPVGt0TVRNdU9UZzJJREF0TGpJd09TQXdMUzQwTWkwdU1ERTFMUzQyTXk0NU5qRXRMalk0T1NBeExqZ3RNUzQxTmlBeUxqUTJMVEl1TlRRNGJDMHVNRFEzTFM0d01ub2lMejQ4TDNOMlp6ND0iLz4gPHRleHQgeD0iNDY1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiB0ZXh0TGVuZ3RoPSI0NzAiPlNoYXJlIPCfmI08L3RleHQ+PC9nPiA8L3N2Zz4=" />
          </a>
        </v-col>
        <v-col cols="3" sm="2" mg="2" lg="2" xl="2">
          <a @click="facebookShare" target="_blank" rel="noopener">
            <v-img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNzUiIGhlaWdodD0iMjAiPjxnIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyI+PHBhdGggZmlsbD0iIzE4NzdmMiIgZD0iTTAgMGgxOHYyMEgweiIvPjxwYXRoIGZpbGw9IiMxODc3ZjIiIGQ9Ik0xOCAwaDU3djIwSDE4eiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPjxpbWFnZSB4PSI1IiB5PSIzIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNKM2FHbDBaU0lnY205c1pUMGlhVzFuSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK1BIUnBkR3hsUGtaaFkyVmliMjlySUdsamIyNDhMM1JwZEd4bFBqeHdZWFJvSUdROUlrMHlNeTQ1T1RneElERXhMams1T1RGRE1qTXVPVGs0TVNBMUxqTTNNakUySURFNExqWXlOaUF3SURFeExqazVPVEVnTUVNMUxqTTNNakUySURBZ01DQTFMak0zTWpFMklEQWdNVEV1T1RrNU1VTXdJREUzTGprNE9ESWdOQzR6T0RjNE9TQXlNaTQ1TlRJeUlERXdMakV5TkRJZ01qTXVPRFV5TkZZeE5TNDBOamMyU0RjdU1EYzNOVGhXTVRFdU9UazVNVWd4TUM0eE1qUXlWamt1TXpVMU5UTkRNVEF1TVRJME1pQTJMak0wT0RJMklERXhMamt4TlRZZ05DNDJPRGN4TkNBeE5DNDJOVFkwSURRdU5qZzNNVFJETVRVdU9UWTVNaUEwTGpZNE56RTBJREUzTGpNME1qUWdOQzQ1TWpFME9TQXhOeTR6TkRJMElEUXVPVEl4TkRsV055NDROelF6T1VneE5TNDRNamswUXpFMExqTXpPRGdnTnk0NE56UXpPU0F4TXk0NE56TTVJRGd1TnprNU16TWdNVE11T0Rjek9TQTVMamMwT0RJMFZqRXhMams1T1RGSU1UY3VNakF4T0V3eE5pNDJOams0SURFMUxqUTJOelpJTVRNdU9EY3pPVll5TXk0NE5USTBRekU1TGpZeE1ETWdNakl1T1RVeU1pQXlNeTQ1T1RneElERTNMams0T0RJZ01qTXVPVGs0TVNBeE1TNDVPVGt4V2lJdlBqd3ZjM1puUGc9PSIvPiA8dGV4dCB4PSI0NjUiIHk9IjE0MCIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9IjQ3MCI+U2hhcmUg8J+YiTwvdGV4dD48L2c+IDwvc3ZnPg==" />
          </a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-text-field
            :value="url"
            label="Badge URL"
            readonly
            outlined
          />
        </v-col>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-text-field
            :value="base64"
            label="BASE64"
            readonly
            outlined
          />
        </v-col>
        <v-col cols="6" sm="6" mg="6" lg="6" xl="6">
          <v-text-field
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

export default {
  data () {
    return {
      twitterShareUrl: '',
      facebookShareUrl: ''
    }
  },
  computed: {
    ...mapGetters('iconInfo', ['url', 'base64', 'sharedUrl'])
  },
  created () {
    this.setTwitterShareUrl()
    this.setFacebookShareUrl()
  },
  methods: {
    setTwitterShareUrl () {
      const text = encodeURIComponent('バッジを作成しました😎')
      const hashtags = encodeURIComponent('AIKON')
      // const via = 'Shitimi_613'
      this.twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${encodeURIComponent(this.sharedUrl)}`
    },
    setFacebookShareUrl () {
      this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.sharedUrl)}`
    },
    twitterShare () {
      this.setTwitterShareUrl()
      window.open(this.twitterShareUrl, 'newwindow', 'width=600,height=500')
    },
    facebookShare () {
      this.setFacebookShareUrl()
      window.open(this.facebookShareUrl, 'newwindow', 'width=600,height=500')
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
