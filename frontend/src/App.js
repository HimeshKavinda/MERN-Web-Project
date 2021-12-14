
import React, { Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import CreateInsurance from './components/forms/create/CreateInsurance';
import EditInsurance from './components/forms/update/EditInsurance';
import InsuranceHome from './components/pages/InsuranceHome';
import InsuranceDetails from './components/pages/InsuranceDetails';
import ElectricHome from './components/pages/ElectricHome';
import ElectricDetails from './components/pages/ElectricDetails';
import CreateElectric from './components/forms/create/CreateElectric';
import EditElectric from './components/forms/update/EditElectric';
import WaterHome from './components/pages/WaterHome';
import WaterDetails from './components/pages/WaterDetails';
import CreateWater from './components/forms/create/CreateWater';
import EditWater from './components/forms/update/EditWater';
import TranspotationHome from './components/pages/TranspotationHome';
import TranspotationDetails from './components/pages/TranspotationDetails';
import CreatTranspotation from './components/forms/create/CreateTranspotation';
import EditTranspotation from './components/forms/update/EditTranspotation';
import StaffPaymentHome from './components/pages/StaffPaymentHome';
import StaffPaymentDetails from './components/pages/StaffPaymentDetails';
import CreatStaffPayment from './components/forms/create/CreateStaffPayment';
import EditStaffPayment from './components/forms/update/EditStaffPayment';
import MaterialHome from './components/pages/MaterialHome';
import MaterialDetails from './components/pages/MaterialDetails';
import CreateMaterail from './components/forms/create/CreateMaterial';
import EditMaterial from './components/forms/update/EditMaterial';
import IncomeHome from './components/pages/IncomeHome';
import IncomeDetails from './components/pages/IncomeDetails';
import CreateIncome from './components/forms/create/CreateIncome';
import EditIncome from './components/forms/update/EditIncome';
import FinanceManagement from './components/pages/FinanceManagement';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  render() {
    return (
      //frontend routes
      <BrowserRouter>
        <div >
           
          <Route path="/InsuranceHome" exact component={InsuranceHome}></Route>
          <Route path="/add" component={CreateInsurance}></Route>
          <Route path="/edit/:id" component={EditInsurance}></Route>
          <Route path="/post/:id" component={InsuranceDetails}></Route>

          <Route path="/ElectricHome"  component={ElectricHome}></Route>
          <Route path="/addElectric" component={CreateElectric}></Route>
          <Route path="/editElectric/:id" component={EditElectric}></Route>
          <Route path="/electric/:id" component={ElectricDetails}></Route>

          <Route path="/WaterHome"  component={WaterHome}></Route>
          <Route path="/addWater" component={CreateWater}></Route>
          <Route path="/editWater/:id" component={EditWater}></Route>
          <Route path="/water/:id" component={WaterDetails}></Route>

          <Route path="/TranspotationHome"  component={TranspotationHome}></Route>
          <Route path="/addTranspotation" component={CreatTranspotation}></Route>
          <Route path="/editTranspotation/:id" component={EditTranspotation}></Route>
          <Route path="/transpotation/:id" component={TranspotationDetails}></Route>

          <Route path="/staffPaymentHome"  component={StaffPaymentHome}></Route>
          <Route path="/addStaffPayment" component={CreatStaffPayment}></Route>
          <Route path="/editStaff/:id" component={EditStaffPayment}></Route>
          <Route path="/staffPay/:id" component={StaffPaymentDetails}></Route>

          <Route path="/materialHome"  component={MaterialHome}></Route>
          <Route path="/addMaterialCost" component={CreateMaterail}></Route>
          <Route path="/editMaterial/:id" component={EditMaterial}></Route>
          <Route path="/materialDetails/:id" component={MaterialDetails}></Route>

          <Route path="/incomeHome"  component={IncomeHome}></Route>
          <Route path="/addIncome" component={CreateIncome}></Route>
          <Route path="/editIncome/:id" component={EditIncome}></Route>
          <Route path="/incomeDetails/:id" component={IncomeDetails}></Route>

          <Route path="/mainui"  component={FinanceManagement}></Route>
        
          
    
        </div>
        
        </BrowserRouter>
    )
  }


}
