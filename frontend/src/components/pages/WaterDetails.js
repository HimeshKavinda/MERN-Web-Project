import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class WaterDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            waters:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/waters/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    waters:res.data.waters
                });
                console.log(this.state.waters);
            }
        });
    }


    render() {

        const {billAmt,consumption,company,email,mobile,address,date} = this.state.waters;

        return(
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-faucet"></i>&nbsp;{company}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Bill Amount</dt>
                    <dd className="col-sm-9">{billAmt}</dd>

                    <dt className="col-sm-3">Consumption(M3)</dt>
                    <dd className="col-sm-9">{consumption}</dd>

                    <dt className="col-sm-3">Company Email</dt>
                    <dd className="col-sm-9">{email}</dd>

                    <dt className="col-sm-3">Company Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Company Address</dt>
                    <dd className="col-sm-9">{address}</dd>

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