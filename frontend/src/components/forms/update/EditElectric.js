import React, { Component } from "react";
import axios from "axios";

export default class EditElectric extends Component{
    constructor(props){
        super(props);
        this.state={
            billAmt:"",
            unitsConsumed:"",
            company:"",
            email:"",
            mobile:"",
            address:"",
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
//update method
    onSubmit = (e) => {

        
        e.preventDefault();
        const id = this.props.match.params.id;

        const {billAmt,unitsConsumed,company,email,mobile,address,date} = this.state;

        const data = {
            billAmt:billAmt,
            unitsConsumed:unitsConsumed,
            company:company,
            email:email,
            mobile:mobile,
            address:address,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:5000/electric/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Electric Bill Updated Successfully")
                this.setState(
                    {
                        billAmt:"",
                        unitsConsumed:"",
                        company:"",
                        email:"",
                        mobile:"",
                        address:"",
                        date:""
                    }
                )
            }
        })

    }

    //load data to input fields
    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/electrics/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    billAmt:res.data.electrics.billAmt,
                    unitsConsumed:res.data.electrics.unitsConsumed,
                    company:res.data.electrics.company,
                    email:res.data.electrics.email,
                    mobile:res.data.electrics.mobile,
                    address:res.data.electrics.address,
                    date:res.data.electrics.date

                });
                console.log(this.state.electrics);
            }
        });
    }



    render() {
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Electric Bill</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Bill Amount</label>
                <input type="text" 
                className="form-control" 
                name="billAmt" 
                placeholder="Enter Amount" 
                value={this.state.billAmt}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Units Consumed</label>
                <input type="text" 
                className="form-control" 
                name="unitsConsumed" 
                placeholder="Enter Consumed Units" 
                value={this.state.unitsConsumed}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Provider Company</label>
                <input type="text" 
                className="form-control" 
                name="company" 
                placeholder="Enter Provider Company" 
                value={this.state.company}
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
                <label  style={{marginBottom:'5px'}}>Mobile Number</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Mobile Number" 
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Comapny Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Comapny Address" 
                value={this.state.address}
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