<template>
  <div v-if="availableParts" class="content">
    <div class="preview">

      <CollapsibleSection>
        <RobotPreview :selectedRobot="selectedRobot" />
      </CollapsibleSection>
      <button
        class="add-to-cart"
        @click="addToCart()"
      >Add to Cart</button>

    </div>
    <div class="top-row">

      <!-- <div class="robot-name">
          {{selectedRobot.head.title}}
          <span
            class="sale"
            v-if="selectedRobot.head.onSale"
          >Sale!</span>
        </div> -->
      <PartSelector
        :parts="availableParts.heads"
        position="top"
        @partSelected="part=>selectedRobot.head=part"
      />

    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        position="left"
        @partSelected="part=>selectedRobot.leftArm=part"
      />

      <PartSelector
        :parts="availableParts.torsos"
        position="center"
        @partSelected="part=>selectedRobot.torso=part"
      />
      <PartSelector
        :parts="availableParts.arms"
        position="right"
        @partSelected="part=>selectedRobot.rightArm=part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        position="bottom"
        @partSelected="part=>selectedRobot.base=part"
      />

    </div>

  </div>
</template>
<script lang="ts">

import { mapActions } from 'vuex';
import createdLifeHook from '../Mixins/createdLifeHook';
import PartSelector from './PartSelector.vue';
import RobotPreview from './RobotPreview.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  components: { PartSelector, RobotPreview, CollapsibleSection },
  mixins: [createdLifeHook],
  created() {
    this.getParts();
  },
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      // eslint-disable-next-line no-alert
      // eslint-disable-next-line no-restricted-globals
      const response = confirm(
        'Are you sure you want to leave without adding to cart?',
      );

      next(response);
    }
  },
  data() {
    return {
      addedToCart: false,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
    onSaleRobotClass() {
      return this.selectedRobot.head.onSale ? 'on-sale-robot' : '';
    },
  },
  methods: {

    ...mapActions('robots', ['getParts', 'addRobotToCart']),

    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.base.cost;

      this.addRobotToCart(Object.assign({}, robot, { cost })).then(() => {
        this.$router.push('/cart');
      });
      // this.cart.push(Object.assign({}, robot, { cost }));

      this.addedToCart = true;
    },
  },
};
</script>

<style>
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
</style>
<style lang="scss" scoped>
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}

.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part {
  img {
    width: 165px;
  }
}

.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;

  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.sale-border {
  border: 3px solid red;
}
.on-sale-robot {
  border: 2px solid red;
}
</style>
