import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class TranspotationDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            transpotations:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/transpotations/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    transpotations:res.data.transpotations
                });
                console.log(this.state.transpotations);
            }
        });
    }


    render() {

        const {driverName,mobile,email,address,maintainAmt,date} = this.state.transpotations;

        return(
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-truck"></i>&nbsp;{driverName}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9">{email}</dd>

                    <dt className="col-sm-3">Address</dt>
                    <dd className="col-sm-9">{address}</dd>

                    <dt className="col-sm-3">Maintain Amount</dt>
                    <dd className="col-sm-9">{maintainAmt}</dd>

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