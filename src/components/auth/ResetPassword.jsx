import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { constans } from '../../constans/constans';
import 'react-toastify/dist/ReactToastify.css';
import "./auth.css"
const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const auth = getAuth();

    const notifySuccess = (text) => toast(text);
    const notifyError = (text) => toast.error(text);

    const authRecovery = (e) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
        .then(() => {
            notifySuccess(constans.recoveryPassword)
        })
        .catch((err) => {
            if(err.code === constans.authUserNotFound) {
                notifyError(constans.authUserNotFound)
            }
            
        });
    }

    return (
        <>
        <form className="sign-form" onSubmit={authRecovery}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required/>
            <button className="btn-stand">{constans.reset}</button>
        </form>
        <ToastContainer position="bottom-center"/>
        </>
        
    )
}

export default ResetPassword