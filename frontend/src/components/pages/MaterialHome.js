import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class materialHome extends Component {
  constructor(props){
    super(props);

    this.state = {
      materials:[]
    };

  }

  componentDidMount(){
    this.retrieveMaterials();
  }

  retrieveMaterials(){
    axios.get("http://localhost:5000/materials").then(res => {
      if(res.data.success){
        this.setState({
          materials:res.data.existingMaterials
        });

        console.log(this.state.materials)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/material/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveMaterials();
    })
  
  }

  filterData(materials,searchKey){

    const result = materials.filter((material) =>
      material.supplierName.includes(searchKey)
      
    )
  
    this.setState({materials:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/materials").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingMaterials,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Material Purchase Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("MaterialHome.pdf");
}

  render(){
    return(
      <div class="bg-success p-2 text-dark bg-opacity-25">
        <p><center><h3><b><u>All Material Purchase Costs</u></b></h3></center></p>

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
              <th scope="col">Supplier Name</th>
              <th scope="col">Supplier ID</th>
              <th scope="col">Material Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.materials.map((materials,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <Link to={`/materialDetails/${materials._id}`} style={{textDecoration:'none'}}>
                        {materials.supplierName}
                        </Link>
                    </td>
                    <td>{materials.supplierID}</td>
                    <td>{materials.materialName}</td>
                    <td>{materials.mobile}</td>
                    <td>{materials.address}</td>
                    <td>{materials.quantity}</td>
                    <td>{materials.totalPrice}</td>
                    <td>{materials.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/editMaterial/${materials._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(materials._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addMaterialCost" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-dolly"></i>&nbsp;Add New Material Purchase Cost</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>

      </div>
    )
      
    
  }

}


              
