import React, { Component } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";

export default class CreateStaffPayment extends Component{
    
    constructor(props){
        super(props);
        this.state={
            empName:"",
            empID:"",
            mobile:"",
            email:"",
            address:"",
            salaryPay:"",
            date:"",
            errors:{}
        }
    }

    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }

    formValidation = () =>{
        const {empName,empID,mobile,email,address,salaryPay,date} = this.state;
        let isValid = true;
        const errors = {};
        if (empName.trim().length < 6){
            errors.empNameLength = "Employee Name must be of Length 6 or higher";
            isValid = false;
        }
        if (email.trim().length < 14){
            errors.emailLength = "Email must be of Length 14 or higher";
            isValid = false;
        }
        if (address.trim().length > 11){
            errors.addressLength = "Address must be of Length 10 or less";
            isValid = false;
        }
        if(!mobile.match(/^([0-9]{9,10})$/)){
            alert("Mobile Number Invalid.")
        }
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            alert("Email Error.")
        }    
                
        this.setState({errors});
        return isValid;
        
    }


    onSubmit = (e) => {
        //const history = useHistory()

        e.preventDefault();
        const isValid = this.formValidation();

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

        axios.post("http://localhost:5000/staffpayment/save", data).then((res) => {
            if(res.data.success){
                if(isValid){
                this.setState(
                    {
                        empName:"",
                        empID:"",
                        mobile:"",
                        email:"",
                        address:"",
                        salaryPay:"",
                        date:""
                    });
                    alert("New Staff Payment Submitted.")
                }
            }
        })
        //history.push("/staffPaymentHome");

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        empName: "Kumara Fernando"
    })

    this.setState ({
        empID: "EID556"
    })

    this.setState ({
        mobile: "0771458521"
    })

    this.setState ({
        email: "waterB@gmail.com"
    })

    this.setState ({
        address: "Kandy"
    })

    this.setState ({
        salaryPay: "42000"
    })

  }


    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add new Staff Payment</u></i></center></h1>
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
                placeholder="Enter Employee Mobile Number" 
                maxLength={10}
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Email</label>
                <input type="text" 
                className="form-control" 
                name="email" 
                placeholder="Enter Employee Email" 
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Employee Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Employee Address" 
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

            
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                <i className="far fa-chech-square"></i>
                <i class="far fa-save"></i>&nbsp;Save</button>
                <br/><br/>
                <button type="button" class="btn btn-primary btn-sm" onClick={this.demo} >Test Demo</button>

            {Object.keys(errors).map((key) => {
                    return <div style={{color : "red"}} key={key}>{errors[key]}</div>
            })}

       </form>
       </div>
       </div>
        )
    }
}