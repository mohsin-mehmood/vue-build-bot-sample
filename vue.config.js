module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:10010',
        changeOrigin: true,
      },
    },
  },
};
