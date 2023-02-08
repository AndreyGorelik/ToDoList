import { useState } from "react";
import { useSelector } from "react-redux";
import {ReactComponent as Spinner} from "../../assets/images/spinner.svg"
import "./auth.css"

const Form = ({title, handleClick}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingStatus } = useSelector(state => state.authSlice)

  return (
    <form
    className="sign-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleClick(email, password);
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      
      {loadingStatus === 'pending' ? <Spinner/> : <button className="btn-stand">{title}</button>}
    </form>
  );
};

export default Form;
