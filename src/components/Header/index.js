import './index.css'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="headerCon">
      <div className="headerSubCon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="headerWebsiteLogo"
        />
        <ul className="headerListCon">
          <li className="headerListItem">Home</li>
          <li className="headerListItem">Jobs</li>
        </ul>
        <button onClick={onLogout} className="logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
