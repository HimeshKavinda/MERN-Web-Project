import React, { Component } from "react";
import axios from "axios";

export default class EditStaffPayment extends Component{
    constructor(props){
        super(props);
        this.state={
            empName:"",
            empID:"",
            mobile:"",
            email:"",
            address:"",
            salaryPay:"",
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

        const {empName,empID,mobile,email,address,salaryPay,date} = this.state;

        const data = {
            empName:empName,
            empID:empID,
            mobile:mobile,
            email:email,
            address:address,
            salaryPay:salaryPay,
            date:date
        }
        console.log(data)

        axios.put(`http://localhost:5000/staffpayment/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Staff Payment Updated Successfully")
                this.setState(
                    {
                        empName:"",
                        empID:"",
                        mobile:"",
                        email:"",
                        address:"",
                        salaryPay:"",
                        date:""
                    }
                    
        )
            }
        })

    }


    componentDidMount(){
        
        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/staffpayments/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    empName:res.data.staffpayments.empName,
                    empID:res.data.staffpayments.empID,
                    mobile:res.data.staffpayments.mobile,
                    email:res.data.staffpayments.email,
                    address:res.data.staffpayments.address,
                    salaryPay:res.data.staffpayments.salaryPay,
                    date:res.data.staffpayments.date

                });
                console.log(this.state.staffpayments);
            }
        });
    }



    render() {
        
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Staff Payment</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Name</label>
                <input type="text" 
                className="form-control" 
                name="empName" 
                placeholder="Enter Employee Name" 
                value={this.state.empName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee ID</label>
                <input type="text" 
                className="form-control" 
                name="empID" 
                placeholder="Enter Employee ID" 
                maxLength={5}
                value={this.state.empID}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Mobile</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Mobile" 
                maxLength={10}
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Email</label>
                <input type="text" 
                className="form-control" 
                name="email" 
                placeholder="Enter Email" 
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Address" 
                value={this.state.address}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Salary</label>
                <input type="text" 
                className="form-control" 
                name="salaryPay" 
                placeholder="Enter Employee Salary" 
                maxLength={6}
                value={this.state.salaryPay}
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