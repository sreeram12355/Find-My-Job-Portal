import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onchangePassWord = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          className="user-input"
          type="text"
          placeholder="Username"
          id="userName"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPassWord = () => {
    const {password} = this.state

    return (
      <>
        <label className="label" htmlFor="passWord">
          PASSWORD
        </label>
        <input
          className="user-input"
          id="passWord"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onchangePassWord}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="jobby-app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo-img"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassWord()}</div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
