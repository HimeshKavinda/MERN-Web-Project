import React, { Component } from "react";
import axios from "axios";

export default class EditIncome extends Component{
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
            date:"",
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
        else if (email.trim().length < 12){
            errors.emailLength = "Email must be of Length 12 or higher";
            isValid = false;
        }
        else if (address.trim().length > 10){
            errors.addressLength = "Address must be of Length 10 or less";
            isValid = false;
        }
        else if (country.trim().length > 11){
            errors.countryLength = "Country Name must be of Length 8 or less";
            isValid = false;
        }
        else if (orderID.trim().length > 6){
            errors.orderIDLength = "Order ID must be of Length 6 or less";
            isValid = false;
        }
        
        if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            alert("Email Is Invalid.")
        }   
        if(!orderID.match(/^([A-Z]{2,2})([0-9]{4,4})$/)){
            alert("Order ID is Invalid.")
          } 
        
        this.setState({errors});
        return isValid;
        
    }

    onSubmit = (e) => {

        
        e.preventDefault();
        const isValid = this.formValidation();

        const id = this.props.match.params.id;

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

        axios.put(`http://localhost:5000/income/update/${id}`, data).then((res) => {
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
                    alert("Income Updated Successfully.")
                }
            }
        })

    }


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/incomes/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    customerName:res.data.incomes.customerName,
                    mobile:res.data.incomes.mobile,
                    email:res.data.incomes.email,
                    address:res.data.incomes.address,
                    country:res.data.incomes.country,
                    totalPrice:res.data.incomes.totalPrice,
                    orderID:res.data.incomes.orderID,
                    date:res.data.incomes.date

                });
                console.log(this.state.incomes);
            }
        });
    }



    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Income</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Name</label>
                <input type="text" 
                className="form-control" 
                name="customerName" 
                placeholder="Enter Customer Name" 
                value={this.state.customerName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Customer Mobile</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                maxLength={10}
                placeholder="Enter Customer Mobile" 
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
                placeholder="Enter Country" 
                value={this.state.country}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Total Price</label>
                <input type="text" 
                className="form-control" 
                name="totalPrice" 
                placeholder="Enter Total Price" 
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
                <i className="fas fa-edit"></i>
                 update</button>

            {Object.keys(errors).map((key) => {
                    return <div style={{color : "red"}} key={key}>{errors[key]}</div>
            })}

       </form>
       </div>
       </div>
        )
    }
}