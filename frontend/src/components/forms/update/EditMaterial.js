import React, { Component } from "react";
import axios from "axios";

export default class EditMaterial extends Component{
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

        axios.put(`http://localhost:5000/material/update/${id}`, data).then((res) => {
            if(res.data.success){
                alert("Material Purchase Updated Successfully")
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
                    }
                )
            }
        })

    }


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/materials/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    supplierName:res.data.materials.supplierName,
                    supplierID:res.data.materials.supplierID,
                    materialName:res.data.materials.materialName,
                    mobile:res.data.materials.mobile,
                    address:res.data.materials.address,
                    quantity:res.data.materials.quantity,
                    totalPrice:res.data.materials.totalPrice,
                    date:res.data.materials.date

                });
                console.log(this.state.materials);
            }
        });
    }



    render() {
        return(
            <div className="bg-success p-2 text-dark bg-opacity-25">
            <div className="container">
            <form className="needs-validation">
            <h1><center><i><u>Update this Material Purchase</u></i></center></h1>
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

            
            <button className="btn btn-success btn-sm" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                <i className="fas fa-edit"></i>
                 update</button>
       </form>
       </div>
       </div>
        )
    }
}