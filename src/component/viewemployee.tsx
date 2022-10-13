import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Key, useEffect, useState, useMemo, useCallback } from 'react';
import Table from 'react-bootstrap/Table'
import Post from '../Interface/Post';
import { AgGridReact } from "ag-grid-react";
import { AddEmployee } from './addemployee';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Button } from 'reactstrap';


export const ViewEmployee = ({ updateEmployee }: { updateEmployee: any }) => {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [data, getData] = useState<any>([])
    let URL = 'https://localhost:7189/api/employee/Get';
    let URLDelete = 'https://localhost:7189/api/employee/delete/';


    function EditEntry(selectedItem: Post) {
        console.log(selectedItem);
        updateEmployee(selectedItem);
        selectedItem.show = true;
        <AddEmployee Employee={selectedItem} />
        //setShow(true);

        // let url = "https://localhost:7189/api/employee/Get/"
        // url = url + selectedItem
        // axios.get(url)
        // .then(function (response) {
        //     console.log(response);
        // });
    }
    //const table : any = document.querySelector('#EmpTable');
    //const rows : any = table.tBodies[0].rows;

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())

            .then((response) => {
                //console.log(response);
                getData(response);
            })

    }

    function DeleteEntry(selectedItem: any) {
        console.log(selectedItem);
        const myJSON = JSON.stringify(selectedItem);
        URLDelete = URLDelete + myJSON;
        console.log(URLDelete);
        //debugger;
        axios.delete(URLDelete).then(() => console.log('Delete successful'));
        window.location.reload();
    }

    const [rowData, setRowData] = useState();



    const [columnDefs, setColumnDefs] = useState([
        { field: 'employeeId', filter: true },
        { field: 'firstName', filter: true },
        { field: 'lastName', filter: true },
        { field: 'dateOfBirth', filter: true },
        { field: 'phoneNumber', filter: true },
        { field: 'email', filter: true },
        {headerName: 'Action',
            label: 'Action',
            cellRendererFramework: (params: any) =>
                <div>
                    < Button variant="info" onClick={() => EditEntry(params.data)}>Edit</Button>
                    < Button style = {{ marginLeft: '8px' }} variant = "warning" onClick = {() => DeleteEntry(params.data.employeeId)}> Delete</Button >
                </div >
        } 

    ]);

const defaultColDef = useMemo(() => {
    return {
        width: 170,
        sortable: true,
    };
}, []);

const cellClickedListener = useCallback((event: any) => {
    console.log('cellClicked', event);
    //console.log(rowData);
}, []);
useEffect(() => {
    fetch('https://localhost:7189/api/employee/Get/')
        .then(res => res.json())
        .then(rowData => setRowData(rowData))
    console.log(rowData);
}, []);
console.log(rowData);

return (
    <div>

        <Table striped bordered hover className="table table-striped table-dark" id='EmpTable'>
            <thead>
                <tr>
                    <th>Emp Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Phone No.</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr></thead>
            <tbody>

                {data.map((item: Post, i: Key | null | undefined) => (
                    <tr key={i}>
                        <td>{item.employeeId}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.dateOfBirth}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.email}</td>
                        <td>&nbsp;&nbsp;<button onClick={() => EditEntry(item)} className="styleButtononee btn btn-success">Edit</button>&nbsp;
                            <button onClick={() => DeleteEntry(item.employeeId)} className="styleButtontwoo btn btn-danger">Delete</button></td>
                    </tr>
                ))}

            </tbody>
        </Table>
        <div className="ag-theme-alpine" style={{ height: 400, width: 1600 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ flex: 1 }}
                rowHeight={60}
                animateRows={true}
                rowSelection='multiple'
                onCellClicked={cellClickedListener}

            ></AgGridReact>
        </div>

    </div>
);

}