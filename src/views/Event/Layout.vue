<template>
  <div id="nav">
    <router-link :to="{ name: 'EventDetails' }">Details</router-link>
    |
    <router-link :to="{ name: 'EventRegister' }">register</router-link>
    |
    <router-link :to="{ name: 'EventEdit' }">edit</router-link>
  </div>
  <router-view :event="event" />
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "Layout",
  props: ["id"],
  data() {
    return {
      event: false,
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error);
        if (error?.response.status === 404) {
          this.$router.push({
            name: "404Resource",
            params: { resource: "event" },
          });
        } else {
          this.$router.push({
            name: "NetworkError",
          });
        }
      });
  },
};
</script>
