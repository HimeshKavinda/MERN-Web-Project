import React, { Component } from "react";
import axios from "axios";

export default class EditInsurance extends Component{
    constructor(props){
        super(props);
        this.state={
            company:"",
            mobile:"",
            email:"",
            address:"",
            insuranceType:"",
            paymentAmt:"",
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

        const {company,mobile,email,address,insuranceType,paymentAmt,date} = this.state;

        const data = {
            company:company,
            mobile:mobile,
            email:email,
            address:address,
            insuranceType:insuranceType,
            paymentAmt:paymentAmt,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:5000/insurance/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Insurance Updated Successfully")
                this.setState(
                    {
                        company:"",
                        mobile:"",
                        email:"",
                        address:"",
                        insuranceType:"",
                        paymentAmt:"",
                        date:""
                    }
                )
            }
        })

    }


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/insurances/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    company:res.data.insurances.company,
                    mobile:res.data.insurances.mobile,
                    email:res.data.insurances.email,
                    address:res.data.insurances.address,
                    insuranceType:res.data.insurances.insuranceType,
                    paymentAmt:res.data.insurances.paymentAmt,
                    date:res.data.insurances.date

                });
                console.log(this.state.insurances);
            }
        });
    }



    render() {
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Insurance</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Insurance Company Name</label>
                <input type="text" 
                className="form-control" 
                name="company" 
                placeholder="Enter Insurance Company Name" 
                value={this.state.company}
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
                <label  style={{marginBottom:'5px'}}>Insurance Type</label>
                <input type="text" 
                className="form-control" 
                name="insuranceType" 
                placeholder="Enter Insurance Type" 
                value={this.state.insuranceType}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Payment Amount</label>
                <input type="text" 
                className="form-control" 
                name="paymentAmt" 
                placeholder="Enter Payment Amount" 
                value={this.state.paymentAmt}
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