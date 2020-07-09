const context = require.context('./modules', true, /[^(.).*]\.js$/)

const reducers = context.keys().reduce((prev, key) => {
  const fileName = key.replace('.js', '').split(['/'])[1] || ''
  return {
    ...prev,
    [fileName]: context(key).default,
  }
}, {})
export default reducers
