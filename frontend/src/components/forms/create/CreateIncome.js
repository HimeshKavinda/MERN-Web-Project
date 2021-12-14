import React, { Component } from "react";
import axios from "axios";


export default class CreateIncome extends Component{
    constructor(props){
        super(props);
        this.state={
            customerName:"",
            mobile:"",
            email:"",
            address:"",
            country:"",
            totalPrice:"",
            orderID:"",
            date: "",
            errors: {}
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
        const {customerName,mobile,email,address,country,totalPrice,orderID,date} = this.state;
        let isValid = true;
        const errors = {};
        if (customerName.trim().length < 6){
            errors.customerNameLength = "Customer Name must be of Length 6 or higher";
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
        if (country.trim().length > 10){
            errors.countryLength = "Country Name must be of Length 10 or less";
            isValid = false;
        }
        if (orderID.trim().length > 6){
            errors.orderIDLength = "Order ID must be of Length 6 or less";
            isValid = false;
        }
        if(!mobile.match(/^([0-9]{9,10})$/)){
            alert("Mobile Number Invalid.")
        }
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            alert("Email Is Invalid.")
        }   
        else if(!orderID.match(/^([A-Z]{2,2})([0-9]{4,4})$/)){
            alert("Order ID is Invalid.")
          }      
        this.setState({errors});
        return isValid;
        
    }

    onSubmit = (e) => {

        e.preventDefault();
        const isValid = this.formValidation();

        const {customerName,mobile,email,address,country,totalPrice,orderID,date} = this.state;
        

        const data = {
            customerName:customerName,
            mobile:mobile,
            email:email,
            address:address,
            country:country,
            totalPrice:totalPrice,
            orderID:orderID,
            date:date
        }
        console.log(data)

        axios.post("http://localhost:5000/income/save", data).then((res) => {
           if(res.data.success){
            if (isValid){
                this.setState(
                    {
                        customerName:"",
                        mobile:"",
                        email:"",
                        address:"",
                        country:"",
                        totalPrice:"",
                        orderID:"",
                        date:""
                    });
                    alert("New Income Submitted.")
                }
            }
        })

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        customerName: "Gihan Samarathunga"
    })

    this.setState ({
        mobile: "0715247854"
    })

    this.setState ({
        email: "gihanS@gmail.com"
    })

    this.setState ({
        address: "Kurunagela"
    })

    this.setState ({
        country: "SriLanka"
    })

    this.setState ({
        totalPrice: "4200"
    })

    this.setState ({
        orderID: "ID1142"
    })

  }



    render() {

        const {errors} = this.state;
        return(
            
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add a new Income</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Name</label>
                <input type="text" 
                className="form-control" 
                name="customerName" 
                placeholder="Enter Customer Name" 
                required
                value={this.state.customerName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Mobile</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Customer Mobile" 
                maxLength={10}
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Email</label>
                <input type="text" 
                className="form-control" 
                name="email" 
                placeholder="Enter Customer Email" 
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Customer Address" 
                value={this.state.address}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Country</label>
                <input type="text" 
                className="form-control" 
                name="country" 
                placeholder="Enter Country Name" 
                maxLength={10}
                value={this.state.country}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Total Price</label>
                <input type="text" 
                className="form-control" 
                name="totalPrice" 
                placeholder="Enter Total Price" 
                maxLength={5}
                value={this.state.totalPrice}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Order ID</label>
                <input type="text" 
                className="form-control" 
                name="orderID" 
                placeholder="Enter Order ID" 
                value={this.state.orderID}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Date</label>
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