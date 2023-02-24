import SignUp from "../../components/auth/SignUp"
import { constants } from "../../constants/constants"
const SignUpPage = () => {
  return (
    <div className='login-screen'>
        <h1>{constants.register}</h1>
        <SignUp/>
    </div>
  )
}

export default SignUpPage