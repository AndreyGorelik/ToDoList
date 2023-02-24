import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { constants } from "../../constants/constants";
import Form from "./Form";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const notifyError = (text) => toast.error(text);

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate("/login");
      })
      .catch((err) => {
        if (err.code === constants.authEmailInuse) {
          notifyError(constants.emailInUse);
        }

        if (err.code === constants.authWrongEmail) {
          notifyError(constants.wrongEmail);
        }
      });
  };

  return (
    <>
      <Form title="Register" handleClick={handleRegister} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default SignUp;
