import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class InsuranceHome extends Component {
  constructor(props){
    super(props);

    this.state = {
      insurances:[]
    };

  }

  componentDidMount(){
    this.retrieveInsurances();
  }

  retrieveInsurances(){
    axios.get("http://localhost:5000/insurances").then(res => {
      if(res.data.success){
        this.setState({
          insurances:res.data.existingInsurances
        });

        console.log(this.state.insurances)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/insurance/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveInsurances();
    })
  
  }

  filterData(insurances,searchKey){

    const result = insurances.filter((insurance) =>
      insurance.company.includes(searchKey)
      
    )
  
    this.setState({insurances:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/insurances").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingInsurances,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Insurance Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("InsuranceHome.pdf");
}

  render(){
    return(
      <div class="bg-success p-2 text-dark bg-opacity-25">
        <p><center><h3><b><u>All Insurance Payments</u></b></h3></center></p>

        <div className="col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search from Company Name"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input> 

        </div>

        <table className="table table-hover" id="my-pdf" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Insurance Company</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Insurance Type</th>
              <th scope="col">Payment Amount</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.insurances.map((insurances,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <Link to={`/post/${insurances._id}`} style={{textDecoration:'none'}}>
                        {insurances.company}
                        </Link>
                    </td>
                    <td>{insurances.mobile}</td>
                    <td>{insurances.email}</td>
                    <td>{insurances.address}</td>
                    <td>{insurances.insuranceType}</td>
                    <td>{insurances.paymentAmt}</td>
                    <td>{insurances.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/edit/${insurances._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(insurances._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/add" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-house-damage"></i>&nbsp;Add New Insurance</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>


      </div>
    )
      
    
  }

}


              
