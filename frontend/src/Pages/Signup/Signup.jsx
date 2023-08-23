import {React, useState} from 'react'
import { NavLink } from "react-router-dom";
import './signup.css';
import { useAuth } from "../../Contexts";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSnackbar } from 'react-simple-snackbar';
import { loginError, success } from "../../Utils/snackbar";

export function Signup() {

    const { authDispatch } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: "", password: "", confirmPassword: "", email: "", name: ""});
    const [openSnackbar] = useSnackbar(loginError);
    const [openSuccessSnackbar] = useSnackbar(success);

    const signup = async (credentials) => {
        try {
            console.log(credentials)
            const { data: { result }} = await axios.post("http://localhost:3000/user/signup", { username:credentials.username, password:credentials.password, name:credentials.name, email:credentials.email } );
            localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true, token: result }))
            authDispatch({ type:"LOGIN", payload: result });
            openSuccessSnackbar('Successfully logged in', 2000);
            navigate(state?.from ? state.from : "/");
        } catch (e) {
            if(e.response.status === 409){
                return openSnackbar('Failed to create account. Try again.', 2000)
            }else{
                return openSnackbar(e.message, 2000)
            }
        }
    };

    const signupHandler = (data) => {
        if(data.username === "" || data.password === "" || data.confirmPassword === "" || data.email === "" || data.name === ""){
            return openSnackbar('All fields are required.', 2000)
        }
        if(data.password === data.confirmPassword){
            signup(data);
        }else{
            openSnackbar('Password should be same.', 2000)
        }
    }

    return (
        <div className="login-page">
            <div class="login-box">
            <div className="box-content">
                <h1 className="logo">learnit</h1>
                <div className="form">
                    <input type="text" placeholder="Name" className="login-input signup-input" required onChange={(e)=>{setCredentials({ ...credentials, name: e.target.value })}} />
                    <input type="email" placeholder="Email" className="login-input signup-input" required onChange={(e)=>{setCredentials({ ...credentials, email: e.target.value })}} />
                    <input type="text" placeholder="Username" className="login-input signup-input" required onChange={(e)=>{setCredentials({ ...credentials, username: e.target.value })}} />
                    <input type="password" placeholder="Password" className="login-input signup-input" required onChange={(e)=>{setCredentials({ ...credentials, password: e.target.value })}} />
                    <input type="password" placeholder="Confirm Password" className="login-input signup-input" required onChange={(e)=>{setCredentials({ ...credentials, confirmPassword: e.target.value })}} />
                    <button className="btn" onClick={()=>{signupHandler(credentials)}}>SignUp</button>
                </div>
                <p style={{color: '#EBEBF5'}}>
                    Already have an account?
                </p>
                <NavLink to='/login' className="sign-up">Login</NavLink>
            </div>
            </div>
        </div>
    )
}
