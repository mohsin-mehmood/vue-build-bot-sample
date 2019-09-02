<template>
  <div>
    <h1>{{part.title}}</h1>
    <div>{{part.description}}</div>
  </div>
</template>
<script>

import getPartsMixin from './get-parts-mixin';

export default {
  name: 'PartInfo',
  props: {
    partType: {
      type: String,
    },

    id: {
      type: [String, Number],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  mixins: [getPartsMixin],
  computed: {
    part() {
      const { partType, id } = this;
      return this.parts[partType].find(p => p.id === +id);
    },
  },
};
</script>
<style scoped>
</style>
