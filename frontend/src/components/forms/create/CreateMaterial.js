import React, { Component } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";

export default class CreateMaterail extends Component{
    
    constructor(props){
        super(props);
        this.state={
            supplierName:"",
            supplierID:"",
            materialName:"",
            mobile:"",
            address:"",
            quantity:"",
            totalPrice:"",
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
        const {supplierName,supplierID,materialName,mobile,address,quantity,totalPrice,date} = this.state;
        let isValid = true;
        const errors = {};
        if (supplierName.trim().length < 4){
            errors.supplierNameLength = "Supplier Name must be of Length 4 or higher";
            isValid = false;
        }
        if (materialName.trim().length < 2){
            errors.supplierNameLength = "Supplier Name must be of Length 2 or higher";
            isValid = false;
        }
        if (address.trim().length > 11){
            errors.addressLength = "Address must be of Length 10 or less";
            isValid = false;
        }
        if(!mobile.match(/^([0-9]{9,10})$/)){
            alert("Mobile Number Invalid.")
        }
        else if(!supplierID.match(/^([A-Z]{3,3})([0-9]{4,4})$/)){
            alert("Supplier ID is Invalid.")
          }   
                
        this.setState({errors});
        return isValid;
        
    }


    onSubmit = (e) => {
        //const history = useHistory()

        e.preventDefault();
        const isValid = this.formValidation();

        const {supplierName,supplierID,materialName,mobile,address,quantity,totalPrice,date} = this.state;

        const data = {
            supplierName:supplierName,
            supplierID:supplierID,
            materialName:materialName,
            mobile:mobile,
            address:address,
            quantity:quantity,
            totalPrice:totalPrice,
            date:date
        }
        console.log(data)

        axios.post("http://localhost:5000/material/save", data).then((res) => {
            if(res.data.success){
                if(isValid){
                this.setState(
                    {
                        supplierName:"",
                        supplierID:"",
                        materialName:"",
                        mobile:"",
                        address:"",
                        quantity:"",
                        totalPrice:"",
                        date:""
                    });
                    alert("New Material Purchase Cost Submitted.")
                }
            }
        })
        //history.push("/staffPaymentHome");

    }

    //demo button method
demo =() => { 

    //setState
    this.setState ({
        supplierName: "Sirimal Senevirathna"
    })

    this.setState ({
        supplierID: "SID1152"
    })

    this.setState ({
        materialName: "Rubber bands"
    })

    this.setState ({
        mobile: "0773214442"
    })

    this.setState ({
        address: "Colombo"
    })

    this.setState ({
        quantity: "5000"
    })

    this.setState ({
        totalPrice: "5500"
    })

  }


    render() {
        const {errors} = this.state;
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Add new Material Purchase Cost</u></i></center></h1>
            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Supplier Name</label>
                <input type="text" 
                className="form-control" 
                name="supplierName" 
                placeholder="Enter Supplier Name" 
                value={this.state.supplierName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Supplier ID</label>
                <input type="text" 
                className="form-control" 
                name="supplierID" 
                placeholder="Enter Supplier ID" 
                value={this.state.supplierID}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Material Name</label>
                <input type="text" 
                className="form-control" 
                name="materialName" 
                placeholder="Enter Material Name" 
                value={this.state.materialName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Supplier Mobile</label>
                <input type="text" 
                className="form-control" 
                name="mobile" 
                placeholder="Enter Supplier Mobile Number" 
                value={this.state.mobile}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Supplier Address</label>
                <input type="text" 
                className="form-control" 
                name="address" 
                placeholder="Enter Supplier Address" 
                value={this.state.address}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Quantity</label>
                <input type="text" 
                className="form-control" 
                name="quantity" 
                placeholder="Enter Quantity" 
                value={this.state.quantity}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
                <label  style={{marginBottom:'5px'}}>Total Price</label>
                <input type="text" 
                className="form-control" 
                name="totalPrice" 
                maxLength={5}
                placeholder="Enter Total Price" 
                value={this.state.totalPrice}
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