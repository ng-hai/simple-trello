export default (name, value) => ({ theme }) => {
  if (!name || typeof name !== 'string' || !theme.palette[name]) {
    return null
  }
  return theme.palette[name][value]
}
