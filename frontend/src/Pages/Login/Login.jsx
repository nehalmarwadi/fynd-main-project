import { React, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts";
import './login.css';
import { useSnackbar } from 'react-simple-snackbar';
import { loginError, success } from "../../Utils/snackbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Login() {

    const { authDispatch } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "admin", password: "admin" });
    const [openSnackbar] = useSnackbar(loginError);
    const [openSuccessSnackbar] = useSnackbar(success);

    const login = async (credentials) => {
        try {
            const { data: { result }} = await axios.post("http://localhost:3000/user/login", { username:credentials.username, password:credentials.password } );
            localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true, token: result }))
            authDispatch({ type:"LOGIN", payload: result });
            openSuccessSnackbar('Successfully logged in', 2000);
            navigate(state?.from ? state.from : "/");
        } catch (e) {
            if(e.response.status === 401){
                return openSnackbar('Wrong Password.', 2000)
            }else if(e.response.status === 404){
                return openSnackbar('Check Username and Password and try again.', 2000)
            }else{
                return openSnackbar(e.message, 2000)
            }
        }
    };
    
    const loginHandler = (data) => {
        if (data.username === "" || data.password === "") {
            openSnackbar('Username or Password cannot be empty.', 2000)
        } else {
            login(data);
        }
    }

    return (
        <>
            <div className="login-page">
                <div class="login-box">
                    <div className="box-content">
                        <h1 className="logo">learnit</h1>
                        <div className="form">
                            <input type="test" placeholder="Username" className="login-input" value={credentials.username} required onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }} />
                            <input type="password" placeholder="Password" className="login-input" value={credentials.password} required onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
                            <button type="submit" className="btn" onClick={() => { loginHandler(credentials) }}>Login</button>
                        </div>
                        <div>
                            <p style={{ color: '#EBEBF5' }}>Test Credentials -
                                <li>Username: <span className="sign-up">admin</span></li>
                                <li>Password: <span className="sign-up">admin</span></li>
                            </p>
                        </div>
                        <br />
                        <p style={{ color: '#EBEBF5' }}>
                            Don't have an account?
                        </p>
                        <NavLink to='/signup' className="sign-up">SignUp</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
