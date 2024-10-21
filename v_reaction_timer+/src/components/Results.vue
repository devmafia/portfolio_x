<template>
  <div>
    <p id="title">Reaction timer</p>
    <button @click="openModal()" id="button" :disabled="isPlaying">play</button>
    <p id="time">Time spent on click: {{ this.time }}</p>
    <Block @click="setTime()" v-if="this.display == true"/>
  </div>
</template>

<script>
import Block from './Block';

export default {
  name: 'Results',
  data() {
    return {
      display: false,
      startTime: null,
      time: null,
      isPlaying: false,
    };
  },
  components: {
    Block
  },
  methods: {
    openModal() {
      this.display = true;
      this.startTime = performance.now()
      this.isPlaying = true
    },
    setTime() {
      this.display = false;
      const end = performance.now()
      this.time = Math.round(end - this.startTime)
      this.isPlaying = false
    }
  }
}
</script>

<style>
#title {
  font-size: bold;
}

#button {
  margin: 5px;
  padding: 3px;
  background-color: green;
}
</style>
