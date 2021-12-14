import React, { Component } from "react";
import axios from "axios";

export default class EditWater extends Component{
    constructor(props){
        super(props);
        this.state={
            billAmt:"",
            consumption:"",
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

    onSubmit = (e) => {

        
        e.preventDefault();
        const id = this.props.match.params.id;

        const {billAmt,consumption,company,email,mobile,address,date} = this.state;

        const data = {
            billAmt:billAmt,
            consumption:consumption,
            company:company,
            email:email,
            mobile:mobile,
            address:address,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:5000/water/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Water Bill Updated Successfully")
                this.setState(
                    {
                        billAmt:"",
                        consumption:"",
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


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/waters/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    billAmt:res.data.waters.billAmt,
                    consumption:res.data.waters.consumption,
                    company:res.data.waters.company,
                    email:res.data.waters.email,
                    mobile:res.data.waters.mobile,
                    address:res.data.waters.address,
                    date:res.data.waters.date

                });
                console.log(this.state.waters);
            }
        });
    }



    render() {
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Water Bill</u></i></center></h1>
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
                <label  style={{marginBottom:'5px'}}>Consumption(m3)</label>
                <input type="text" 
                className="form-control" 
                name="consumption" 
                placeholder="Enter Consumed Units" 
                value={this.state.consumption}
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