import {Form} from "react-formio";
import { selectUser } from "../features/userSlice";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";

const AddEvent = () => {
    const user=useSelector(selectUser);
    const history=useHistory();
    const handleSubmit=async(submission)=>{
        const data=submission.data;
        console.log(data);
        const resp=await fetch("http://localhost:9000/events/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:data.eventName,description:data.description,token:user.token})
        })
        if(resp.status===200){
            history.push("/events")
        }
    }
    return (
        <div className="container">
            <Form src="https://wjyalridcgxijvx.form.io/event" onSubmitDone={(submission)=>handleSubmit(submission)}>

            </Form>
        </div>
      );
}
 
export default AddEvent;