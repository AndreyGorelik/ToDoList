import ResetPassword from "../../components/auth/ResetPassword"
import { constans } from "../../constans/constans"
const ResetPasswordPage = () => {
  return (
    <div className='login-screen'>
        <h1>{constans.passwordRecovery}</h1>
        <ResetPassword/>
    </div>
  )
}

export default ResetPasswordPage