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
      <forms />
      <message />
    </v-flex>
  </v-layout>
</template>

<script>
import Forms from '~/components/Forms.vue'
import Message from '~/components/Message.vue'

export default {
  components: {
    Forms,
    Message
  },
  head () {
    return {
      title: 'AIKON',
      titleTemplate: ''
    }
  }
}
</script>
