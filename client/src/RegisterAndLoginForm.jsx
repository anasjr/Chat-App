import { useState,useContext } from "react";
import axios from "axios"
import { UserContext } from "./UserContext";

export default function RegisterAndLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogginOrRegister,setLogginOrRegister] = useState('login');
    const {setUsername:setLoggedInUsername,setId} = useContext(UserContext);
   async function handleSubmit(ev){

    ev.preventDefault();
    const url = isLogginOrRegister === 'register' ? 'register' : 'login';
         const {data} = await axios.post(url,{username,password});
         setLoggedInUsername(username);
         setId(data.id);
    }
    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
                <input value={username} 
                onChange={ev => setUsername(ev.target.value)} 
                type="text" placeholder="Username" 
                className="block w-full rounded-sm p-2 mb-2 border" />
                <input value={password} 
                onChange={ev => setPassword(ev.target.value)} 
                type="password" placeholder="Password" 
                className="block w-full rounded-sm p-2 mb-2 border" />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    {isLogginOrRegister === 'register' ? 'Register' : 'Login'}</button>
                <div className="text-center mt-2"> {isLogginOrRegister === 'register' &&(
                    <div> Already a member ?
                         <button 
                    onClick={()=>setLogginOrRegister('login')}
                    >Login Here</button>
                    </div>
                )}
                  {isLogginOrRegister === 'login'&&(
                    <div> Dont have an Account ?
                           <button 
                    onClick={()=>setLogginOrRegister('register')}
                    >Register Here</button>
                    </div>
                  )} 
                </div>
            </form>
        </div>
    )
}