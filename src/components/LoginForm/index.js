import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    submitFailure: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({
      submitFailure: true,
      errorMsg: err,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const credentials = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }
  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, submitFailure, errorMsg} = this.state
    return (
      <div className="loginFormCon">
        <div className="formCon">
          <form className="form" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onUsernameChange}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onPasswordChange}
            />
            <button type="submit" className="btn">
              Login
            </button>
            {submitFailure && <p className="errorMsg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
