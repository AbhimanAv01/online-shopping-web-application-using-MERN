import React, { useState, useEffect ,useContext} from "react";
import '../css/Loginsignup.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User_info_context from "../Context/user_info_context";

function Loginsignup() {
    const {user_info,setUser_info}=useContext(User_info_context)
    const [signIn, setSignIn] = useState(true);
    console.log("login"+user_info)
    const toggleSignIn = () => {
        setSignIn(true);
    };

    const toggleSignUp = () => {
        setSignIn(false);
    };

    useEffect(() => {
        const signUpButton = document.getElementById('gsignup');
        const signInButton = document.getElementById('gsignin');
        const main = document.getElementById('main');

        signUpButton.addEventListener('click', () => {
            main.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            main.classList.remove("right-panel-active");
        });

        // Clean up event listeners when component unmounts
        return () => {
            signUpButton.removeEventListener('click', () => {
                main.classList.add("right-panel-active");
            });
            signInButton.removeEventListener('click', () => {
                main.classList.remove("right-panel-active");
            });
        };
    }, []); // Empty dependency array ensures the effect runs only once after mounting

    const [Username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [password, setpassword] = useState("");

    const signup = (event) => {
        event.preventDefault(); 
        if (!Name || !Username || !password) {
            toast.error('Please fill out all fields');
            return;
        }

        const data = {
            username:Name,
            email: Username,
            password: password
        }

        axios.post("http://localhost:3010/api/signup", data).then(res => {
            toast.success('Sigup Successful');
           
        }).catch((err)=>{
            const errorMsg = err.response?.data?.message || 'An error occurred during signup';
                toast.error(errorMsg);
            
        })
    }


    const [LogUsername, setLogUsername] = useState("");
    const [Logpassword, setLogpassword] = useState("");
    const nav = useNavigate();

    const login = (event) => {
        event.preventDefault();
        const logdata = {
            email: LogUsername,
            password: Logpassword
        };
        axios.post("http://localhost:3010/api/login", logdata)
            .then((res) => {
                const { accessToken, username } = res.data;// getting the token and username from URL  and set in localstorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('username', username);
                localStorage.setItem('Emailid', LogUsername);
                toast.success("Login Successful");
                setUser_info(username); //contextAPI for user info
                setTimeout(()=>{        // giving set timeout bcs immediate navigation to the home page ("/") not waiting for toast 
                    nav("/", { replace: true });            // replace used for if arrow btn clk it should not go back with login

                },2000)  
            })
            .catch((err) => {
                const errorMsg = err.response?.data?.message || 'Login failed';
                toast.error(errorMsg);
            });
    };
    

    return (
        <div className="con" id="main">
             <ToastContainer />
            <div className='signin-con'>
                <form className="login-form">
                    <h1 className="login-h1">Sign in</h1>
                    <input type='text' placeholder='Email' className="login-input" value={LogUsername} onChange={(event) => setLogUsername(event.target.value)} />
                    <input type='password' placeholder='Password' className="login-input" value={Logpassword} onChange={(event) => setLogpassword(event.target.value)} />
                    <a href='#' className="forgot-pass">Forgot your password?</a>
                    <br />
                    <button className="all-btn" onClick={login}>Sign In</button>
                </form>
            </div>

            <div className="signup-con">
                <form className="login-form">
                    <h1 className="login-h1">Create Account</h1>
                    <input type='text' placeholder='UserName' className="login-input" value={Name} onChange={(event) => setName(event.target.value)} />
                    <input type='text' placeholder='Email' className="login-input" value={Username} onChange={(event) => setUsername(event.target.value)} />
                    <input type='password' placeholder='Password' className="login-input" value={password} onChange={(event) => setpassword(event.target.value)} />
                    <button className="all-btn" onClick={signup}>Sign Up</button>
                </form>
            </div>

            <div className="overlay-con">
                <div className="overlay">
                    <div className="left-overlay-panel">
                        <h1 className="login-h1">Welcome Back!</h1>
                        <p className="login-p">To keep connected with us please login with your personal info</p>
                        <button className="ghost-button" id="gsignin" onClick={toggleSignIn}>Sign In</button>
                    </div>
                    <div className="right-overlay-panel">
                        <h1>Hello</h1>
                        <p className="login-p">Enter Your personal details and start journey with us</p>
                        <button className="ghost-button" id="gsignup" onClick={toggleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginsignup;
