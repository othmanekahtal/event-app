<template>
  <p>Register view</p>
  <button @click="registerMe">Register me</button>
</template>

<script>
export default {
  name: "Register",
  props: ["event"],
  inject: ["GBstore"],
  methods: {
    registerMe() {
      this.GBstore.message = `you are successfully registered for ${this.GBstore.event.title} !`;
      setTimeout(() => {
        this.GBstore.message = "";
      }, 3000);
      this.$router.push({
        name: "EventDetails",
        // by default vue take the param id
        // params: { id: this.event.id },
      });
    },
    /**
     * You can use the router to navigate history
     *this.$router.go(1) :goes forward
     *this.$router.go(-1): goes backward
     */
  },
};
</script>
