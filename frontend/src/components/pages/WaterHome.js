import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class WaterHome extends Component {
  constructor(props){
    super(props);

    this.state = {
        waters:[]
    };

  }

  componentDidMount(){
    this.retrieveWaters();
  }

  retrieveWaters(){
    axios.get("http://localhost:5000/waters").then(res => {
      if(res.data.success){
        this.setState({
            waters:res.data.existingWater
        });

        console.log(this.state.waters)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/water/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveWaters();
    })
  
  }

  filterData(waters,searchKey){

    const result = waters.filter((water) =>
      water.company.includes(searchKey)
    )
  
    this.setState({waters:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/waters").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingWater,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Water Bill Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("WaterHome.pdf");
}

  render(){
    return(
      <div class="bg-success p-2 text-dark bg-opacity-25">
        
        <p><center><h3><b><u>All Water Bill Payments</u></b></h3></center></p>

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
              <th scope="col">Bill Amount</th>
              <th scope="col">Consumption</th>
              <th scope="col">Provider Company</th>
              <th scope="col">Company Email</th>
              <th scope="col">Company Mobile</th>
              <th scope="col">Company Address</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.waters.map((waters,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{waters.billAmt}</td>
                    <td>{waters.consumption}</td>
                    <td>
                        <Link to={`/water/${waters._id}`} style={{textDecoration:'none'}}>
                        {waters.company}
                        </Link>
                        </td>
                    <td>{waters.email}</td>
                    <td>{waters.mobile}</td>
                    <td>{waters.address}</td>
                    <td>{waters.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/editWater/${waters._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(waters._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addWater" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-hand-holding-water"></i>&nbsp;Add New Water Bill</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>
                
      </div>
    )
      
    
  }

}


              
