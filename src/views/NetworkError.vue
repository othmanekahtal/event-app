 <template>
  <h1>Uh-Oh</h1>
  <p>Problem in network</p>
  <a href="#" @click="this.$router.go(-1)">try again</a>
</template>

<script>
export default {
  name: "NetworkError",
};
</script>

<style>
</style>