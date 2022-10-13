import './addemployee.css';
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Employee from './Employee'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal , Button} from 'react-bootstrap';



export const AddEmployee = ({ Employee }: { Employee: any }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const now = new Date();
  //var tempemployee : Employee  = { firstname: '', lastname: '', dob: now, phoneNumber: '', email: '' }; 
  var tempnumber = Employee;
  console.log(tempnumber);
  // let url = "https://localhost:7189/api/employee/Get/"
  //   url = url + tempnumber
  //   axios.get(url)
  //   .then(function (response) {
  //       console.log(response);
  //       tempemployee = response.data;
  //       console.log(tempemployee);
  //   });

  const [employee, setEmployee] = useState<Employee>({ id: 0, firstname: '', lastname: '', dob: now, phoneNumber: '', email: '' });
  const onFirstNameChange = (e: any) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    if (tempnumber.employeeId > 0) {
      tempnumber.firstname = e.target.value;
    }
    setEmployee({ ...employee, firstname: e.target.value });
  }
  const onLastNameChange = (e: any) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    if (tempnumber.employeeId > 0) {
      tempnumber.lastname = e.target.value;
    }
    setEmployee({ ...employee, lastname: e.target.value });
  }
  const onDOBChange = (e: any) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    if (tempnumber.employeeId > 0) {
      tempnumber.dob = e.target.value;
    }
    setEmployee({ ...employee, dob: e.target.value });
  }
  const onPhonenumberChange = (e: any) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    if (tempnumber.employeeId > 0) {
      tempnumber.phoneNumber = e.target.value;
    }
    setEmployee({ ...employee, phoneNumber: e.target.value });
  }
  const onEmailChange = (e: any) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.value);
    if (tempnumber.employeeId > 0) {
      tempnumber.email = e.target.value;
    }
    setEmployee({ ...employee, email: e.target.value });
  }
  const Add_Employee = () => {
    console.log(tempnumber.employeeId)
    if (tempnumber.employeeId > 0) {
      var updateUrl: string = 'https://localhost:7189/api/employee/'
      const myJSON = JSON.stringify(tempnumber.employeeId);
      updateUrl = updateUrl + myJSON;
      console.log(updateUrl)
      axios.put(updateUrl, tempnumber)
        .then(json => {
          console.log(json.data.statusCode)
          debugger;
          if (json.data.statusCode == 204) {
            console.log(json.data);
            alert("Data Update Successfully");
            window.location.reload();
          }
          else {
            console.log(json.data);
            window.location.reload();

          }
        })


    }
    else {
      console.log(employee.firstname)
      console.log(employee.lastname)
      console.log(employee.dob)
      console.log(employee.phoneNumber)
      console.log(employee.email)
      axios.post('https://localhost:7189/api/employee', {
        firstName: employee.firstname, lastName: employee.lastname,
        dob: employee.dob, phoneNumber: employee.phoneNumber, email: employee.email
      })
        .then(json => {
          if (json.data.statusCode == 201) {
            console.log(json.data);
            alert("Data Save Successfully");
            window.location.reload();
          }
          else {
            console.log(json.data);
            alert('Data not Saved');

          }
        })

    }

  }

  useEffect(()=>{
    if(Employee)
      setShow(Employee.show)
    },[Employee])
  return (

    <>
      <Button variant="primary" onClick={handleShow}>Add Employee</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="App">
            <h4 className="PageHeading">Enter Employee Information</h4>
            <Form className="form">
              <Col>
                <FormGroup row>
                  <Label for="name" sm={2}>Employee First Name</Label>
                  <Col sm={10}>
                    <Input onChange={onFirstNameChange} defaultValue={tempnumber.firstName} placeholder="Enter First Name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="name" sm={2}>Employee Last Name</Label>
                  <Col sm={10}>
                    <Input type="text" name="lastName" onChange={onLastNameChange} defaultValue={tempnumber.lastName} placeholder="Enter Last Name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="address" sm={2}>Date of Birth</Label>
                  <Col sm={10}>
                    <Input type="text" name="DOB" onChange={onDOBChange} defaultValue={tempnumber.dateOfBirth} placeholder="Enter Date of Birth (yyyy-mm-dd)" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Password" sm={2}>Phone Number</Label>
                  <Col sm={10}>
                    <Input type="text" name="phoneNumber" onChange={onPhonenumberChange} defaultValue={tempnumber.phoneNumber} placeholder="Enter Phone Number" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Password" sm={2}>Email</Label>
                  <Col sm={10}>
                    <Input type="text" name="email" onChange={onEmailChange} defaultValue={tempnumber.email} placeholder="Enter Email" />
                  </Col>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup row>
                  {/* <Col sm={5}>
                  </Col> */}
                  <Col sm={9}>
                    <button type="button" onClick={Add_Employee} className="btn btn-success">Submit</button>
                  </Col>
                  <Col  className=''>
                    <Button color="danger">Cancel</Button>{' '}
                  </Col>
                  {/* <Col sm={5}>
                  </Col> */}
                </FormGroup>
              </Col>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>

  );
}