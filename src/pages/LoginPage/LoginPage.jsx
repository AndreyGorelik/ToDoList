import Login from '../../components/auth/Login'
import { Link } from 'react-router-dom'
import { constants } from '../../constants/constants'
const LoginPage = () => {
  return (
    <div className='login-screen'>
      <h1>{constants.signIn}</h1>
      <Login />
      <div className="login-screen__options">
        <Link to="/signup">{constants.register}</Link>
        <Link to="/reset">{constants.forgotPassword}</Link>
      </div>
    </div>
  )
}

export default LoginPage