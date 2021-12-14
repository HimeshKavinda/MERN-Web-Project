import React, { Component } from "react";
import axios from "axios";

export default class CreateWater extends Component{
    constructor(props){
        super(props);
        this.state={
            billAmt:"",
            consumption:"",
            company:"",
            email:"",
            mobile:"",
            address:"",
            date:"",
            errors:{}
        }
    }
    //it change input values accordingly 
    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value

        })
    }

    formValidation = () =>{
        const {billAmt,consumption,company,email,mobile,address,date} = this.state;
        let isValid = true;
        const errors = {};
        if (company.trim().length < 4){
            errors.companyLength = "Company Name must be of Length 4 or higher";
            isValid = false;
        }
        if (email.trim().length < 14){
            errors.emailLength = "Email must be of Length 14 or higher";
            isValid = false;
        }
        if (address.trim().length < 4){
            errors.addressLength = "Address must be of Length 4 or higher";
            isValid = false;
        }
        if(!mobile.match(/^([0-9]{9,10})$/)){
            alert("Mobile Number Invalid.")
        }
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            alert("Email Is Invalid.")
        }   
        else if(!billAmt.match(/^([0-9]{3,5})$/)){
            alert("Bill Amount is Invalid.")
        } 
                
        this.setState({errors});
        return isValid;
        
    }

    onSubmit = (e) => {

        e.preventDefault();
        const isValid = this.formValidation();

        const {billAmt,consumption,company,email,mobile,address,date} = this.state;
        //set data to variables
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

        axios.post("http://localhost:5000/water/save", data).then((res) => {//callback function
            if(res.data.success){
                if(isValid){
                this.setState(
                    {
                        billAmt:"",
                        consumption:"",
                        company:"",
                        email:"",
                        mobile:"",
                        address:"",
                        date:""
                    });
                    alert("New Water Bill Submitted.")
                }
            }
        })

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        billAmt: "54000"
    })

    this.setState ({
        consumption: "556"
    })

    this.setState ({
        company: "Waterboard"
    })

    this.setState ({
        email: "waterB@gmail.com"
    })

    this.setState ({
        mobile: "0113214442"
    })

    this.setState ({
        address: "Bandaragama"
    })

  }


    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add new Water Bill Payment</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Bill Amount</label>
                <input type="text" 
                className="form-control" 
                name="billAmt" 
                placeholder="Enter Bill Amount" 
                required
                value={this.state.billAmt}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Consumption(M3)</label>
                <input type="text" 
                className="form-control" 
                name="consumption" 
                maxLength={5}
                placeholder="Enter Consumed Units" 
                required
                value={this.state.consumption}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Provider Company</label>
                <input type="text" 
                className="form-control" 
                name="company" 
                placeholder="Enter Comapny Name" 
                required
                value={this.state.company}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Email</label>
                <input type="text" 
                className="form-control" 
                name="email" 
                placeholder="Enter Email" 
                pattern="[a-zA-Z0-9._*%#+-]+@[a-z0-9]+\. [a-z]{2,3}"
                required
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Mobile Number</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Mobile Number" 
                pattern="[0-9]{10}" 
                required
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Comapny Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Payment Amount" 
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