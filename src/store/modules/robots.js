import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: [],
    parts: null,
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },

  getters: {
    cartItemsOnSale(state) {
      return state.cart.filter(item => item.head.onSale);
    },
  },
  actions: {
    getParts({ commit }) {
      axios.get('/api/parts').then((response) => {
        commit('updateParts', response.data);
      }).catch(console.log);
    },
    addRobotToCart({ commit, state }, robot) {
      const cart = [...state.cart, robot];
      return axios.post('/api/cart', cart).then(() => {
        commit('addRobotToCart', robot);
      });
    },
  },
};
