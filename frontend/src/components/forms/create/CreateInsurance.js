import React, { Component } from "react";
import axios from "axios";

export default class CreateInsurance extends Component{
    constructor(props){
        super(props);
        this.state={
            company:"",
            mobile:"",
            email:"",
            address:"",
            insuranceType:"",
            paymentAmt:"",
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
        const {company,mobile,email,address,insuranceType,paymentAmt,date} = this.state;
        let isValid = true;
        const errors = {};
        if (company.trim().length < 6){
            errors.companyLength = "Company Name must be of Length 6 or higher";
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
            alert("Email Is Invalid.")
        }    
                
        this.setState({errors});
        return isValid;
        
    }

    onSubmit = (e) => {

        e.preventDefault();
        const isValid = this.formValidation();

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

        axios.post("http://localhost:5000/insurance/save", data).then((res) => {
            if(res.data.success){
                if(isValid){
                this.setState(
                    {
                        company:"",
                        mobile:"",
                        email:"",
                        address:"",
                        insuranceType:"",
                        paymentAmt:"",
                        date:""
                    });
                    alert("New Insurance Submitted.")
                }
            }
        })

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        company: "Union Asurance"
    })

    this.setState ({
        mobile: "0115247854"
    })

    this.setState ({
        email: "unionA@gmail.com"
    })

    this.setState ({
        address: "Kalutara"
    })

    this.setState ({
        insuranceType: "Full"
    })

    this.setState ({
        paymentAmt: "56000"
    })

  }


    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add a new Insurance Payment</u></i></center></h1>
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
                maxLength={10}
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
                maxLength={5}
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
                <i className="far fa-chech-square"></i>
                <i class="far fa-save"></i>&nbsp;Save</button>
               

                {Object.keys(errors).map((key) => {
                    return <div style={{color : "red"}} key={key}>{errors[key]}</div>
            })}

       </form>
       </div>
       </div>
        )
    }
}