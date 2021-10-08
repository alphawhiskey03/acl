import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import { selectUser } from "../features/userSlice";
import { addEvents,selectEvents } from "../features/eventSlice";
import {Link,useHistory} from "react-router-dom";

const Events =  () => {
    const user=useSelector(selectUser);
    const dispatch=useDispatch();
    const history=useHistory();
    useEffect(()=>{
        const fetchData=async()=>{
        const resp= await fetch("http://localhost:9000/events/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({token:user.token})
        })
        // console.log(resp);
        const body=await resp.json();
        dispatch(addEvents(body.events))
    }
    fetchData();
    },[user.token,dispatch]);
    const events=useSelector(selectEvents)
    console.log(events);
    return ( 
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            {user.role==='admin'?<button style={{width:100,margin:20}}onClick={()=>{history.push("/add-event")}}>Add Event</button>:""}
            {events.length && (events.map((event,i)=>(
                <div className="event" key={i}>
                    <h5>{event.name}</h5>
                    <p>{event.description}</p>
                </div>

            )))}
   
        </div>
     );
}
 
export default Events;