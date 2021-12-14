import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class TranspotationHome extends Component {
  constructor(props){
    super(props);

    this.state = {
        transpotations:[]
    };

  }

  componentDidMount(){
    this.retrieveTranspotations();
  }

  retrieveTranspotations(){
    axios.get("http://localhost:5000/transpotations").then(res => {
      if(res.data.success){
        this.setState({
            transpotations:res.data.existingTranspotation
        });

        console.log(this.state.transpotations)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/transpotation/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveTranspotations();
    })
  
  }

  filterData(transpotations,searchKey){

    const result = transpotations.filter((transpotation) =>
      transpotation.driverName.includes(searchKey)
    )
  
    this.setState({transpotations:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/transpotations").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingTranspotation,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Transpotation Costs")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("TranspotationHome.pdf");
}

  render(){
    return(
      <div className="bg-success p-2 text-dark bg-opacity-25">
        
        <p><center><h3><b><u>All Transpotation Costs</u></b></h3></center></p>

        <div className="col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search from driver Name"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input> 

        </div>

        <table className="table table-hover" id="my-pdf" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Driver Name</th>
              <th scope="col">Driver Mobile</th>
              <th scope="col">Driver Email</th>
              <th scope="col">Driver Address</th>
              <th scope="col">Maintain Amount</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.transpotations.map((transpotations,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <Link to={`/transpotation/${transpotations._id}`} style={{textDecoration:'none'}}>
                        {transpotations.driverName}
                        </Link>
                        </td>
                    <td>{transpotations.mobile}</td>
                    <td>{transpotations.email}</td>
                    <td>{transpotations.address}</td>
                    <td>{transpotations.maintainAmt}</td>
                    <td>{transpotations.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/editTranspotation/${transpotations._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(transpotations._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addTranspotation" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-truck-moving"></i>&nbsp;Add New Transpotation Bill</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>
           
      </div>
    )
      
    
  }

}


              
