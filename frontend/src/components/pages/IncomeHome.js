import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

export default class incomeHome extends Component {
  constructor(props){
    super(props);

    this.state = {
      incomes:[]
    };

  }

  componentDidMount(){
    this.retrieveIncomes();
  }

  retrieveIncomes(){
    axios.get("http://localhost:5000/incomes").then(res => {
      if(res.data.success){
        this.setState({
          incomes:res.data.existingIncomes
        });

        console.log(this.state.incomes)
      }
    });
  }

  onDelete = (id) => {

    axios.delete(`http://localhost:5000/income/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveIncomes();
    })
  
  }

  filterData(incomes,searchKey){

    const result = incomes.filter((income) =>
      income.customerName.includes(searchKey)
      
    )
  
    this.setState({incomes:result})
  
  }
  
  handleSearchArea = (e) => {
  
  const  searchKey = e.currentTarget.value;
  
  axios.get("http://localhost:5000/incomes").then(res => {
    if(res.data.success){
  
      this.filterData(res.data.existingIncomes,searchKey)
  
    }
  });
  
  }

  //pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPdf('p','pt');

  doc.text(210,30,"Income Details")
  doc.autoTable({  html:'#my-pdf' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("IncomeHome.pdf");
}


  render(){
    return(
      <div class="bg-success p-2 text-dark bg-opacity-25">
        <p><center><u><h3><b>All Incomes</b></h3></u></center></p>
      
        <div className="col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search from Customer Name"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input> 

        </div>

        <table className="table table-hover" id="my-pdf" style={{marginTop:'40px'}} >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Mobile</th>
              <th scope="col">Customer Email</th>
              <th scope="col">Customer Address</th>
              <th scope="col">Country</th>
              <th scope="col">Total Price</th>
              <th scope="col">Order ID</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              {this.state.incomes.map((incomes,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <Link to={`/incomeDetails/${incomes._id}`} style={{textDecoration:'none'}}>
                        {incomes.customerName}
                        </Link>
                    </td>
                    <td>{incomes.mobile}</td>
                    <td>{incomes.email}</td>
                    <td>{incomes.address}</td>
                    <td>{incomes.country}</td>
                    <td>{incomes.totalPrice}</td>
                    <td>{incomes.orderID}</td>
                    <td>{incomes.date}</td>
                    <td>
                    <Link className="btn btn-warning btn-sm" to={`/editIncome/${incomes._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                      </Link>
                      &nbsp;
                      <Link className="btn btn-danger btn-sm" to="#" onClick={() =>this.onDelete(incomes._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                      </Link>
                    </td>
                </tr>
             ))}

          </tbody>

          </table>
          <button className="btn btn-success btn-sm"><Link to="/addIncome" style={{textDecoration:'none', color:'white'}}>
          <i class="fas fa-hand-holding-usd"></i>&nbsp;Add New Income</Link></button>
          &nbsp;
          <button type="button" onClick={this.jsPdfGenerator}  class="btn btn-primary btn-sm">Generate PDF</button>

      </div>
      
    )
      
    
  }

}


              
