import React,{useState,useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login';
import User from './components/User/User';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";
function App() {
  
  const[loading,setLoading]=useState(false);
  const [datas,setData]=useState([]);

  const getUsername=window.localStorage.getItem("userData");
  const getPassword=window.localStorage.getItem("passwordData");

useEffect(() => {
  const fetchData=async()=>{
      setLoading(true);
      const res= await axios.get('https://dummyjson.com/users');
      setData(res.data);
      setLoading(false);
  }
  fetchData();
}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={!(getUsername&&getPassword)?<Login />:<User datas={datas} />} />
          <Route path="/users" element={(loading)?<h1 className='load' >Loading...</h1>:<User datas={datas} />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
