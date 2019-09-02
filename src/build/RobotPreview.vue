<template>

  <div class="preview-content">
    <div class="top-row">
      <img :src="selectedRobot.head.src" />
    </div>
    <div class="middle-row">
      <img
        :src="selectedRobot.leftArm.src"
        class="rotate-left"
      />
      <img :src="selectedRobot.torso.src" />
      <img
        :src="selectedRobot.rightArm.src"
        class="rotate-right"
      />
    </div>
    <div class="bottom-row">
      <img :src="selectedRobot.base.src" />
    </div>
  </div>

</template>
<script>
export default {
  props: {
    selectedRobot: {
      type: Object,
    },
  },
};
</script>
<style scoped>

.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
