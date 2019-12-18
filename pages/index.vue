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
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <forms />
      <message />
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Forms from '~/components/Forms.vue'
import Message from '~/components/Message.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    Forms,
    Message
  }
}
</script>
