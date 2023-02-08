import { useSelector } from 'react-redux';

const useAuth = () => {
    const {email, id} = useSelector(state => state.authSlice)

    return {
        isAuth: !!email,
        email,
        userId: id
    }
}

export default useAuth;