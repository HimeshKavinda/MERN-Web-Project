import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class InsuranceDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            insurances:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/insurances/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    insurances:res.data.insurances
                });
                console.log(this.state.insurances);
            }
        });
    }


    render() {

        const {company,mobile,email,address,insuranceType,paymentAmt,date} = this.state.insurances;

        return(
            
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-building"></i>&nbsp;{company}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Company Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Company Email</dt>
                    <dd className="col-sm-9">{email}</dd>

                    <dt className="col-sm-3">Company Address</dt>
                    <dd className="col-sm-9">{address}</dd>

                    <dt className="col-sm-3">Insurance Type</dt>
                    <dd className="col-sm-9">{insuranceType}</dd>

                    <dt className="col-sm-3">Payment Amount</dt>
                    <dd className="col-sm-9">{paymentAmt}</dd>

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