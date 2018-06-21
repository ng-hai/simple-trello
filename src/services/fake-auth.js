export default {
  isAuthenticated: false,
  authenticate (callback) {
    this.isAuthenticated = true
    setTimeout(callback, 200)
  },
  signout (callback) {
    this.isAuthenticated = false
    setTimeout(callback, 200)
  },
}
