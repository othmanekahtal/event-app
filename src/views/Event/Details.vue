<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
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
export default {
  name: "Details",
  props: ["event"],
};
</script>
