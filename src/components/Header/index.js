import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div>
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
            className="website-logo-img"
          />
        </Link>
      </div>
      <ul className="nav-item">
        <Link to="/" className="nav-link">
          <li className="homes-heading">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="jobs-heading">Jobs</li>
        </Link>
      </ul>
      <div>
        <li className="logout-button">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </div>
    </nav>
  )
}

export default withRouter(Header)
