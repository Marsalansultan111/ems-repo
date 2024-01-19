import '../App.css';
import React, {useState} from 'react';
import Swal from 'sweetalert2';
import {employeeData} from '../data'

import Edit from './edit';
import Add from './add';
import Header from './header';
import List from './list';

function Dashboard() {
  
  const [employees,setEmployees]=useState(employeeData);
  const [selectedEmployee,setSelectedEmployee]=useState(null);
  const [isAdding,setIsAdding]=useState(false);
  const [isEditing,setIsEditing]=useState(false);


  const handleEdit=(id)=>{
    const [employee]=employees.filter(employee=>employee.id==id);
    setSelectedEmployee(employee);
    setIsEditing(true);
    
  }

  const handleDelete=(id)=>{
Swal.fire({
  icon:"warning",
  title:"Are you sure?",
  text:"you won't be able to revert this!",
  showCancelButton:true,
  confirmButtonText:"Yes,delete it!!",
  cancelButtonText:"No,Cancel!",

}).then(result=>{
  if(result.value){
    const [employee]=employees.filter(employee=>employee.id ==id);

    Swal.fire({
      icon:'success',
      title:"Deleted",
      text:`${employee.firstName} ${employee.lastName}'s data has been deleted!!! `,
      showConfirmButton:false,
      timer:1500
    });
    setEmployees(employees.filter(employee=>employee.id !==id))
  }
});

  }



  return (
    <div className='container'>
      {!isAdding&& !isEditing &&(
        <>
        <Header 
        setIsAdding={setIsAdding}/>
        <List 
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}/>
        
        </>
      )}
      {isAdding &&(
        <Add 
        employees={employees}
        setEmployees={setEmployees}
        setIsAdding={setIsAdding}
        />
      )}
      {isEditing &&(
        <Edit
         employees={employees}
         selectedEmployee={selectedEmployee}
        setEmployees={setEmployees}
        setIsEditing={setIsEditing}
        />
      )}
    </div>
  )
};

export default Dashboard;