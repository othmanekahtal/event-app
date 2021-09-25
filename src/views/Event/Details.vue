<template>
  <div v-if="GBstore.event">
    <h1>{{ GBstore.event.title }}</h1>
    <p>
      {{ GBstore.event.time }} on {{ GBstore.event.date }} @
      {{ GBstore.event.location }}
    </p>
    <p>{{ GBstore.event.description }}</p>
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
  inject: ["GBstore"],
};
</script>
