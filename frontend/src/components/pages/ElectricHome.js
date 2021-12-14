import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import Spacer from 'react-add-space';
import jsPdf from 'jspdf'
import 'jspdf-autotable'


export default class ElectricHome extends Component {
  constructor(props){
    super(props);

    this.state = {
        electrics:[]
    };

  }
  //retrieve specific data
  componentDidMount(){
    this.retrieveElectrics();
  }

  retrieveElectrics(){
    axios.get("http://localhost:5000/electrics").then(res => {
      if(res.data.success){
        this.setState({
            electrics:res.data.existingElectrics
        });

        console.log(this.state.electrics)
      }
    });
  }
//delete method
  onDelete = (id) => {

    axios.delete(`http://localhost:5000/electric/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveElectrics();
    })
  
  }
//search method
  filterData(electrics,searchKey){

    const result = electrics.filter((electric) =>
      electric.company.includes(searchKey)
    )
  
    this.setState({electrics:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/electrics").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingElectrics,searchKey)
  
    }
  });
  
  }

   //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Electric Bill Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("ElectricHome.pdf");
}

  render(){
    return(
      <div className="bg-success p-2 text-dark bg-opacity-25">
        <p><center><h3><b><u>All Electric Bill Payments</u></b></h3></center></p>

        

        <div className="col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search from Company Name"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input> 

        </div>

        <table className="table table-hover" id="my-pdf" style={{marginTop:'40px'}} >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Bill Amount</th>
              <th scope="col">Units Consumed</th>
              <th scope="col">Provider Company</th>
              <th scope="col">Company Email</th>
              <th scope="col">Company Mobile</th>
              <th scope="col">Company Address</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.electrics.map((electrics,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{electrics.billAmt}</td>
                    <td>{electrics.unitsConsumed}</td>
                    <td>
                         <Link to={`/electric/${electrics._id}`} style={{textDecoration:'none'}}>
                        {electrics.company}
                        </Link>
                        </td>
                    <td>{electrics.email}</td>
                    <td>{electrics.mobile}</td>
                    <td>{electrics.address}</td>
                    <td>{electrics.date}</td>
                    <td>
                    <Link class="btn btn-warning btn-sm" to={`/editElectric/${electrics._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(electrics._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addElectric" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-bolt"></i>&nbsp;Add New Electric Bill</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>

      </div>
    )
      
    
  }

}


              
