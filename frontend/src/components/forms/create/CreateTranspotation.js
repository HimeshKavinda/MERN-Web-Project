import React, { Component } from "react";
import axios from "axios";

export default class CreatTranspotation extends Component{
    constructor(props){
        super(props);
        this.state={
            driverName:"",
            mobile:"",
            email:"",
            address:"",
            maintainAmt:"",
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
        const {driverName,mobile,email,address,maintainAmt,date} = this.state;
        let isValid = true;
        const errors = {};
        if (driverName.trim().length < 4){
            errors.driverNameLength = "Driver Name must be of Length 4 or higher";
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

        axios.post("http://localhost:5000/transpotation/save", data).then((res) => {
            if(res.data.success){
                if(isValid){
                this.setState(
                    {
                        driverName:"",
                        mobile:"",
                        email:"",
                        address:"",
                        maintainAmt:"",
                        date:""
                    });
                    alert("New Transpotation Bill Submitted.")
                }
            }
        })

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        driverName: "Sumith Hewage"
    })

    this.setState ({
        mobile: "0714475222"
    })

    this.setState ({
        email: "sumithH@gmail.com"
    })

    this.setState ({
        address: "Panadura"
    })

    this.setState ({
        maintainAmt: "35000"
    })

  }


    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add new Transpotation Cost</u></i></center></h1>
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
                placeholder="Enter Mobile Number" 
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
                maxLength={5}
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