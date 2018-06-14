/**
 * https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/
 */
export default function () {
  const families = ['IBM Plex Sans:400,700:vietnamese']

  if (sessionStorage.fonts) {
    // Fonts installed
    document.documentElement.classList.add('wf-active')
  }

  /**
   * https://webpack.js.org/api/module-methods/#require-ensure
   */
  require.ensure(
    // Dependencies
    'webfontloader',
    // Callback
    () => {
      const WebFontLoader = require('webfontloader')

      WebFontLoader.load({
        timeout: 2000,
        google: {
          families,
        },
        active () {
          sessionStorage.fonts = true
        },
      })
    },
    // Chunk name
    'webfontloader'
  )
}
