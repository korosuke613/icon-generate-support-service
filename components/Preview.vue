<template>
  <a :href="rasterUrl">
    <v-img id="img1" v-if="isHitData" :src="base64" />
    <v-img id="img1" v-else :src="url" />
  </a>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('iconInfo', ['url', 'base64'])
  }
}
</script>
