import React , {useState} from 'react'
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

function AuthPages() {
     
    const [login, setLogin] = useState(true)


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {login ? <LoginForm state = {setLogin}/> : <RegisterForm state = {setLogin}/>}
    </div>
   
  
  );
}

export default AuthPages