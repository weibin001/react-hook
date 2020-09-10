const context = require.context('./', true, /[^(.).*]\.(jsx|tsx)$/)

const wrappers = context.keys().reduce((prev, key) => {
  const fileName = key.replace('.jsx', '').split(['/'])[1] || ''
  return fileName ? { ...prev, [fileName]: context(key).default } : prev
}, {})

export default wrappers
