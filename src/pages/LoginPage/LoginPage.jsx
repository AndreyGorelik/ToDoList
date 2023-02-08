import Login from '../../components/auth/Login'
import { Link } from 'react-router-dom'
import { constans } from '../../constans/constans'
const LoginPage = () => {
  return (
    <div className='login-screen'>
      <h1>{constans.signIn}</h1>
      <Login />
      <div className="login-screen__options">
        <Link to="/signup">{constans.register}</Link>
        <Link to="/reset">{constans.forgotPassword}</Link>
      </div>
    </div>
  )
}

export default LoginPage