<template>
<div id="drop">
  <div id="block">
    <p id="click_button">click</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'Block',
}
</script>

<style>
#drop {
  position: relative;
  height: 40vh;
  width: 40%;
  margin: 0 auto;
  background-color: gray;
  opacity: 0.3;
}

#block {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
  