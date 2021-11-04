module.exports = {
  'mock': {
    baseUrl: '/dev-api',
    mockUrl: 'https://mock.xwhx.top'
  },
  'local': {
    baseUrl: '/dev-api',
    mockUrl: 'http://localhost:3210'
  },
  // 'development': {
  //   baseUrl: '/dev-api',
  //   mockUrl: 'https://api.xwhx.top',
  // },
  // 'development': {
  //   baseUrl: '/api',
  //   mockUrl: 'http://khht.gasgyw.cn'
  // },
  'development': {
    baseUrl_new: '/api',
    mockUrl_new: 'http://khht.gasgyw.cn/',
    baseUrl: '/dev-api',
    mockUrl: 'https://api.xwhx.top',
  },
  'production': {
    baseUrl: 'https://api.xwhx.top',
    mockUrl: 'https://api.xwhx.top'
  }
}
