import ResetPassword from "../../components/auth/ResetPassword"
import { constants } from "../../constants/constants"
const ResetPasswordPage = () => {
  return (
    <div className='login-screen'>
        <h1>{constants.passwordRecovery}</h1>
        <ResetPassword/>
    </div>
  )
}

export default ResetPasswordPage