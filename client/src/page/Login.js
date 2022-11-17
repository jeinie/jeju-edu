import { useState } from "react";

export default function Login() {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const onUserIdHandler = (e) => {
        console.log('ji');
    }
  
    const onPasswordHandler = (e) => {
        console.log('asdf');
    }
  
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <h1 style={{ display:'flex', flexDirection:'column', fontSize:'50px'}}>서비스명</h1>
            <p style={{display:'flex', flexDirection:'column', fontSize:'15px'}}>서비스 슬로건</p>
            <form style={{display:'flex', flexDirection:'column', marginTop:'20px'}} onSubmit={onSubmitHandler}>
                <label>USERNAME</label>
                <input style={{height:'30px', marginBottom:'40px', borderRadius:'15px', background:'#E47B00', border:'0px', lineHeight:'0.5'}} type="userId" value={userId} onChange={onUserIdHandler}/>
                <label>PASSWORD</label>
                <input style={{height:'30px', marginBottom:'50px', borderRadius:'15px', background:'#E47B00', border:'0px'}} type="password" value={password} onChange={onPasswordHandler}/>
                <br/>
                <button style={{height:'40px', borderRadius:'15px' ,background:'#E47B00', border:'0px', color:'white'}}>
                login
                </button>
            </form>
        </div>
    );
}