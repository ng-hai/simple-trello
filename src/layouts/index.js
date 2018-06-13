import PropTypes from 'prop-types'

const Layout = ({ children }) => children()

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout