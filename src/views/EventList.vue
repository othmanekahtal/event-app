<template>
  <h1>Events for Good</h1>
  <div class="events" v-if="events">
    <event-card v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="HasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
  <div v-else>
    <lord-icon
      src="https://cdn.lordicon.com/ulhdumaq.json"
      trigger="loop"
      colors="primary:#121331,secondary:#08a88a"
      style="width: 250px; height: 250px"
    >
    </lord-icon>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import EventCard from "../components/EventCard.vue";
// import { watchEffect } from "vue";
export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  // created() {
  //   // when we change the query vue reuse the component , to fix that :
  //   watchEffect(() => {
  //     // we will initial value of the events :
  //     this.events = null;
  //     console.log(this.page);
  //     EventService.getEvents(2, this.page)
  //       .then((response) => {
  //         this.events = response.data;
  //         this.totalEvents = response.headers["x-total-count"];
  //       })
  //       .catch(() => {
  //         this.$router.push({
  //           name: "NetworkError",
  //         });
  //       });
  //   });
  // },
  beforeRouteEnter(to, _, next) {
    EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((response) => {
        next((component) => {
          component.events = response.data;
          component.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({
          name: "NetworkError",
        });
      });
  },
  beforeRouteUpdate(to) {
    // return the promise so vue router knows to wait on the API call before loading the page
    return EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        return {
          name: "NetworkError",
        };
      });
  },
  computed: {
    HasNextPage() {
      // we need to know total pages possible and the current page
      return Math.ceil(this.totalEvents / 2) > this.page;
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>

/**
Problem: The Event List Isn’t Updated
What’s going on here, is that our router sees that we’re loading the same EventList named route, so it doesn’t need to reload the component (or rerun lifecycle hooks where our API call is stored). This is like clicking a navigation link twice. When someone clicks on a navigation link twice and they’re already on that page, do we want it to reload the component? No. That’s what’s going on. created() is not getting called again when we go to the second page, because it’s not reloading the component.

Inevitably, you’ll run into this as a Vue developer: where you want to reload a component with a change of query parameters.
 */