import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class materialDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            materials:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/materials/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    materials:res.data.materials
                });
                console.log(this.state.materials);
            }
        });
    }


    render() {

        const {supplierName,supplierID,materialName,mobile,address,quantity,totalPrice,date} = this.state.materials;

        return(
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-truck-loading"></i>&nbsp;{supplierName}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Supplier ID</dt>
                    <dd className="col-sm-9">{supplierID}</dd>

                    <dt className="col-sm-3">Material Name</dt>
                    <dd className="col-sm-9">{materialName}</dd>

                    <dt className="col-sm-3">Supplier Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Supplier Address</dt>
                    <dd className="col-sm-9">{address}</dd>

                    <dt className="col-sm-3">Quantity</dt>
                    <dd className="col-sm-9">{quantity}</dd>

                    <dt className="col-sm-3">Total Price</dt>
                    <dd className="col-sm-9">{totalPrice}</dd>

                    <dt className="col-sm-3">Payment Date</dt>
                    <dd className="col-sm-9">{date}</dd>


                </dl>

                <button className="btn btn-success btn-sm"><Link to="/mainui" style={{textDecoration:'none', color:'white'}}>
                <i class="fas fa-arrow-left"></i>&nbsp;Back</Link></button>


            </div>
            </div>
        )
    }
}