import SignUp from "../../components/auth/SignUp"
import { constans } from "../../constans/constans"
const SignUpPage = () => {
  return (
    <div className='login-screen'>
        <h1>{constans.register}</h1>
        <SignUp/>
    </div>
  )
}

export default SignUpPage