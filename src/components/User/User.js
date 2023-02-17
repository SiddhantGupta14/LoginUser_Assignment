
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './User.module.css';
import { Link, useNavigate } from 'react-router-dom';


export default function User({datas}) {

 const navigate=useNavigate();

 useEffect(()=>{
  if(!(localStorage.getItem("userData")&&(localStorage.getItem("passwordData")))){
    navigate('/login');
  }
  else{
    navigate('/users')
  }
 },[])

  const [query,setQuery]=useState("");
  const keys=["firstName","lastName","email"];

  const changes=()=>{
    localStorage.removeItem("userData");
    localStorage.removeItem("passwordData");
    navigate('/login');
  }

  const list=datas.users;
const filteredData=list?.filter((item)=>keys?.some((key)=>item[key].toLowerCase().includes(query)));


return (
  <>
    <div className={styles.upperSec}>
      <h2 className={styles.taskHead}>
        FreJunTask
      </h2>
      <button onClick={changes} className={styles.btn}>Logout</button>
    </div>
  <div className={styles.searchArea}>
    <input type="text" placeholder='Search..' onChange={(e)=>setQuery(e.target.value)}/>
  </div>
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableRowHeading}>
            <TableCell className={styles.tableCellHeading} align="center">User</TableCell>
            <TableCell className={styles.tableCellHeading} align="center">Email</TableCell>
            <TableCell className={styles.tableCellHeading} align="center">Age</TableCell>
            <TableCell className={styles.tableCellHeading} align="center">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {filteredData?.length===0 && <h2 className={styles.noResults}>No Results Found!</h2>}
          
          {filteredData?.map(data =>
           (
            <TableRow
            className={styles.tableRow}
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  component="th" scope="row">
                <div className={styles.tableCellwithImg}>
                <div><img src={data.image} /></div>
                <span>{data.firstName}  {data.lastName}</span>
                </div>
              </TableCell>
              <TableCell className={styles.tableCell} align="center">{data.email}</TableCell>
              <TableCell className={styles.tableCell} align="center">{data.age}</TableCell>
              <TableCell className={styles.tableCell} align="center">{data.gender}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
