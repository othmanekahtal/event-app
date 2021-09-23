<template>
  <p>{{ resource }} not found !</p>
  <router-link :to="{ name: 'EventList' }">back to home</router-link>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      default: "page",
      required: true,
    },
  },
};
</script>

<style>
</style>