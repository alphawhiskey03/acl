import { Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import {useHistory} from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [error,setError]=useState('');
    const history=useHistory();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        if(password===confirmPassword){
        try {
            const resp = await fetch("http://localhost:9000/user/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({email: username, password: password})
            });
            const body =await resp.json();
            console.log(body);
            if(body.message){
                setError("Invalid user");
            }
            if (body.user) {
                dispatch(login({
                    name: username,
                    password: password,
                    usrid:body.user,
                    token:body.token,
                    loggedIn: true,
                    role:body.user
                }))
                alert("Successfully registered");
                history.push("/");
            }
        } catch (e) {
            console.log(e);
        }
    }



    }
    return (
        <div className="container">
            <h2>Signup</h2>
            <span>{error}</span>
            <form onSubmit={(e) => handleSubmit(e)}>

                <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />

                <input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                 />

                <input 
                type="password"
                placeholder='Re-enter password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
                />
                
                <Link to='/forgot-password' style={{fontSize:10}}>Forgot Password</Link>

                <button >Submit</button>
                
            </form>
        </div>
    );
}

export default Signup;