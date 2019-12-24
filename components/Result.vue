<template>
  <v-card>
    <v-card-text>
      <p>URL: <a :href="url">{{ url }}</a></p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('iconInfo', ['url'])
  }
}
</script>
