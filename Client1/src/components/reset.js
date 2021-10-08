import {useState} from 'react';
import {useParams,useHistory} from "react-router-dom";
const Reset = () => {
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const[error,setError]=useState('');
    const {id,token}=useParams();
    const history=useHistory();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        console.log(id,token);
        if(password===confirmPassword && password!==''  && confirmPassword!==''){
            try{
                const resp = await fetch("http://localhost:9000/user/reset-password/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body:JSON.stringify({id:id,token:token,password:password})
                });

                const body=await resp.json();
                console.log(body);
                alert("Password changed!");
                history.push("/");

            }catch(err){
                console.log(err);
            }
        }else{
            setError("Passwords don't match!")

        }
    }

    return (
        <div className='container'>
            <h3>Reset password</h3>
            <span>{error}</span>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <input type="password"
                 placeholder='New password'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}/>
                  
            <input type="password"
                 placeholder='Confirm password'
                 value={confirmPassword}
                 onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Reset;