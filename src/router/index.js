import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartsInfo from '../parts/PartsInfo.vue';

import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';

import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';

import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

const routerConfig = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomePage,
        sidebar: SidebarStandard,
      },
    },
    {
      path: '/build',
      name: 'Build',
      components: {
        default: RobotBuilder,
        sidebar: SidebarBuild,
      },
    },
    {
      path: '/parts/browse',
      name: 'BrowseParts',
      component: BrowseParts,
      children: [
        {
          path: 'heads',
          name: 'RobotHeads',
          component: RobotHeads,
        },
        {
          path: 'arms',
          name: 'RobotArms',
          component: RobotArms,
        },
        {
          path: 'torsos',
          name: 'RobotTorsos',
          component: RobotTorsos,
        },
        {
          path: 'bases',
          name: 'RobotBases',
          component: RobotBases,
        },
      ],
    },
    {
      path: '/parts/:partType/:id',
      name: 'Parts',
      component: PartsInfo,
      props: true,
      beforeEnter(to, from, next) {
        const isValidNumber = Number.isInteger(to.params.id);
        next(isValidNumber);
      },
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart,
    },
  ],
});

export default routerConfig;
