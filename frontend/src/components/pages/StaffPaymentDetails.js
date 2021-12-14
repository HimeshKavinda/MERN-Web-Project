import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class staffPaymentDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            staffpayments:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/staffpayments/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    staffpayments:res.data.staffpayments
                });
                console.log(this.state.staffpayments);
            }
        });
    }


    render() {

        const {empName,empID,mobile,email,address,salaryPay,date} = this.state.staffpayments;

        return(
            <div class="bg-success p-2 text-dark bg-opacity-25">
            <div style={{marginTop:'20px'}}>
               <h4><i class="fas fa-users"></i>&nbsp;{empName}</h4>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Employee ID</dt>
                    <dd className="col-sm-9">{empID}</dd>

                    <dt className="col-sm-3">Employee Mobile</dt>
                    <dd className="col-sm-9">{mobile}</dd>

                    <dt className="col-sm-3">Employee Email</dt>
                    <dd className="col-sm-9">{email}</dd>

                    <dt className="col-sm-3">Employee Address</dt>
                    <dd className="col-sm-9">{address}</dd>

                    <dt className="col-sm-3">Salary</dt>
                    <dd className="col-sm-9">{salaryPay}</dd>

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