
import Form from './Form'
import { setUser, setLoadingStatus } from './authSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/auth.hook';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { constants } from '../../constants/constants';
const Login = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const { isAuth } = useAuth()
    const notifyError = (text) => toast.error(text);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [])

    const checkDatabase = (id, email) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${id}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                const db = getDatabase();
                set(ref(db, `users/${id}`), {
                    email: email
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleLogin = (email, password) => {
        dispatch(setLoadingStatus('pending'))
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid
                }))
                checkDatabase(user.uid, user.email)
                dispatch(setLoadingStatus('idle'))
                navigate('/')
            })
            .catch(err => {
                dispatch(setLoadingStatus('idle'))
                if (err.code === constants.authUserNotFound) {
                    notifyError(constants.emailNotFound)
                }

                if (err.code === constants.authWrongPassword) {
                    notifyError(constants.wrongPassword)
                }
            })
    }

    return (
        <div className="signin">
            <Form title="Sign In" handleClick={handleLogin} />
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default Login;