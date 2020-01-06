<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-row>
        <v-col cols="12" sm="12" md="7">
          <forms />
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <information />
        </v-col>
        <v-col cols="12">
          <usage />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import Forms from '~/components/Forms.vue'
import Information from '~/components/Information.vue'
import Usage from '~/components/Usage.vue'

export default {
  components: {
    Forms,
    Information,
    Usage
  },
  head () {
    return {
      title: 'BEENOCKER: easy budge generator',
      titleTemplate: ''
    }
  }
}
</script>
