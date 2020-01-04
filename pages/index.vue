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
          <message />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import Forms from '~/components/Forms.vue'
import Message from '~/components/Message.vue'
import Information from '~/components/Information.vue'

export default {
  components: {
    Forms,
    Message,
    Information
  },
  head () {
    return {
      title: 'AIKON',
      titleTemplate: ''
    }
  }
}
</script>
