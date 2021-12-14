import React, { Component } from "react";
import axios from "axios";

export default class EditTranspotation extends Component{
    constructor(props){
        super(props);
        this.state={
            driverName:"",
            mobile:"",
            email:"",
            address:"",
            maintainAmt:"",
            date:""
        }
    }

    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }

    onSubmit = (e) => {

        
        e.preventDefault();
        const id = this.props.match.params.id;

        const {driverName,mobile,email,address,maintainAmt,date} = this.state;

        const data = {
            driverName:driverName,
            mobile:mobile,
            email:email,
            address:address,
            mobile:mobile,
            maintainAmt:maintainAmt,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:5000/transpotation/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Transpotation Bill Updated Successfully")
                this.setState(
                    {
                        driverName:"",
                        mobile:"",
                        email:"",
                        address:"",
                        maintainAmt:"",
                        date:""
                    }
                )
            }
        })

    }


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/transpotations/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    driverName:res.data.transpotations.driverName,
                    mobile:res.data.transpotations.mobile,
                    email:res.data.transpotations.email,
                    address:res.data.transpotations.address,
                    maintainAmt:res.data.transpotations.maintainAmt,
                    date:res.data.transpotations.date

                });
                console.log(this.state.transpotations);
            }
        });
    }



    render() {
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Transpotation Bill</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Driver Name</label>
                <input type="text" 
                className="form-control" 
                name="driverName" 
                placeholder="Enter Driver Name" 
                value={this.state.driverName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Mobile</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Mobile" 
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Email</label>
                <input type="text" 
                className="form-control" 
                name="email" 
                placeholder="Enter Email" 
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Address" 
                value={this.state.address}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Maintain Amount</label>
                <input type="text" 
                className="form-control" 
                name="maintainAmt" 
                placeholder="Enter Maintain Amount" 
                value={this.state.maintainAmt}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Payment Date</label>
                <input type="date" 
                className="form-control" 
                name="date" 
                placeholder="" 
                value={this.state.date}
                onChange={this.handleInputChange} />
            </div>

            
            <button className="btn btn-success btn-sm" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                <i className="fas fa-edit"></i>
                 update</button>
       </form>
       </div>
       </div>
        )
    }
}