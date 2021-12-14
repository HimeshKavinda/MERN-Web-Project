import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class incomeDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            incomes:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/incomes/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    incomes:res.data.incomes
                });
                console.log(this.state.incomes);
            }
        });
    }


    render() {

        const {customerName,mobile,email,address,country,totalPrice,orderID,date} = this.state.incomes;

        return(
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-user"></i>&nbsp;{customerName}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Customer Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Customer Email</dt>
                    <dd className="col-sm-9">{email}</dd>

                    <dt className="col-sm-3">Customer Address</dt>
                    <dd className="col-sm-9">{address}</dd>

                    <dt className="col-sm-3">Country</dt>
                    <dd className="col-sm-9">{country}</dd>

                    <dt className="col-sm-3">Total Price</dt>
                    <dd className="col-sm-9">{totalPrice}</dd>

                    <dt className="col-sm-3">Order ID</dt>
                    <dd className="col-sm-9">{orderID}</dd>

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