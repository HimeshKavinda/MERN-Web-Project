import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class staffPaymentHome extends Component {
  constructor(props){
    super(props);

    this.state = {
        staffpayments:[]
    };

  }

  componentDidMount(){
    this.retrieveStaffPayments();
  }

  retrieveStaffPayments(){
    axios.get("http://localhost:5000/staffpayments").then(res => {
      if(res.data.success){
        this.setState({
            staffpayments:res.data.existingStaffPayments
        });

        console.log(this.state.staffpayments)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/staffpayment/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveStaffPayments();
    })
  
  }

  filterData(staffpayments,searchKey){

    const result = staffpayments.filter((staffPayemnt) =>
      staffPayemnt.empName.includes(searchKey)
    )
  
    this.setState({staffpayments:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/staffpayments").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingStaffPayments,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Staff Payment Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("StaffPaymentHome.pdf");
}

  render(){
    return(
      <div className="bg-success p-2 text-dark bg-opacity-25">
        
        <p><center><h3><b><u>All Staff Payments</u></b></h3></center></p>

        <div className="col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search from Employee Name"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input> 
          
        </div>

        <table className="table table-hover" id="my-pdf" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Mobile</th>
              <th scope="col">Employee Email</th>
              <th scope="col">Employee Address</th>
              <th scope="col">Salary</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.staffpayments.map((staffpayments,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <Link to={`/staffPay/${staffpayments._id}`} style={{textDecoration:'none'}}>
                        {staffpayments.empName}
                        </Link>
                        </td>
                    <td>{staffpayments.empID}</td>
                    <td>{staffpayments.mobile}</td>
                    <td>{staffpayments.email}</td>
                    <td>{staffpayments.address}</td>
                    <td>{staffpayments.salaryPay}</td>
                    <td>{staffpayments.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/editStaff/${staffpayments._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(staffpayments._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addStaffPayment" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-users"></i>&nbsp;Add New Staff Payment</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>
           
      </div>
    )
      
    
  }

}


              
