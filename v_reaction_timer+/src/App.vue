<template>
  <div id="timer">
    <Results>
    </Results>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import Results from './components/Results.vue';

export default {
  name: "App",
  components: {
    Results
  },
};
</script>

<style>
#timer {
  text-align: center;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
