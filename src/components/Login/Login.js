import React,{useEffect, useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {

  const navigate=useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invalid,setInvalid]=useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser({
      ...user,
      [name]: value,
    });
  }
  useEffect(()=>{

    localStorage.setItem("userData","");
    localStorage.setItem("passwordData","");
  },[])

  

  const handleClick=(event)=>{
    event.preventDefault();
    if (user.username === "admin@frejun" && user.password === "12345678") {
      localStorage.setItem("userData","admin@frejun");
      localStorage.setItem("passwordData","12345678");
      setIsLoggedIn(true);
      navigate('/users');
    } else {
      setInvalid(true);
    }
  }
return (
    <div className={styles.loginPage}>
        <h2 className={styles.heading}>Log in</h2>
        <form  className={styles.userLogin}>
            <div className={styles.username}>
            <label className={styles.label}>Username</label>
            <input type="text" name="username" onChange={handleChange} value={user.username} placeholder='Enter your username' />
            </div>
            <div className={styles.pwd}>
            <label className={styles.label}>Password</label>
            <input type="password" name="password" value={user.password}  onChange={handleChange} placeholder='........' />
            </div>
            
             
              <button onClick={handleClick} className={styles.btn}> 
              Login
              </button>
              <div className={styles.checkValidity}>
              {(invalid) &&<h4>Invalid Credentials!</h4>}
              </div>
            
              
        </form>
    </div>
  )
  };

export default Login;