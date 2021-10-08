import {useState} from 'react';

const Forgot = () => {
    const [email,setEmail]=useState('');
    const [checkMail,setcheckMail]=useState('');
    const handleSumit= async (e)=>{
        e.preventDefault();
        try{
        const resp=await fetch("http://localhost:9000/user/forgot-password",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:email})
        });

        if(resp.status===422){
            alert("the mail ID doesn't exist")

        }
        const body=await resp.json();
        if(body.message){
            setcheckMail(body.message);
        }


        }catch(err){
            console.log(err);

        }
        
    }
    return ( 
        <div className="container">
            <h2>Enter your email</h2>
            <form onSubmit={(e)=>{handleSumit(e)}}>
                <input
                text='text'
                placeholder='Email address'
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <span style={{textAlign:"center"}}>{checkMail}</span>

            
        </div>
     );
}
 
export default Forgot;