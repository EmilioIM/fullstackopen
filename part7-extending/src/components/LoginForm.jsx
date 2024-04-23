import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-1'>
          <label className="form-label">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            className='form-control'
          />
        </div>
        <div className='mb-4'>
          <label className="form-label">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            className='form-control'
          />
        </div>
        <button id="login-button" type="submit" className='btn btn-primary mb-3'>
          login
        </button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
