import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SidePanel from './pages.sidePanel';
import Header from './pages.header';
import  './../css/styles.css';
import CreateIncome from '../forms/create/CreateIncome';
import InsuranceHome from './InsuranceHome';
import StaffPaymentHome from './StaffPaymentHome';
import TranspotationHome from './TranspotationHome';
import MaterialHome from './MaterialHome';
import ElectricHome from './ElectricHome';
import WaterHome from './WaterHome';
import IncomeHome from './IncomeHome';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div  role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "theme.palette.background.paper",
    },
    bar: {
        background: "grey",
    }
}));

function FinanceManagement() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <SidePanel />
            <div className="mainBody">
                
                <header>
                    <div className="headerWrapper">
                        <Header />
                        <div className="tabs">
                            <AppBar position="static" className={classes.bar}>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Incomes" {...a11yProps(0)} />
                                    <Tab label="Staff Payments" {...a11yProps(1)} />
                                    <Tab label="Insurance Payments" {...a11yProps(2)} />
                                    <Tab label="Transpotation Costs" {...a11yProps(3)} />
                                    <Tab label="Material Purchase Costs" {...a11yProps(4)} />
                                    <Tab label="Electric Bills" {...a11yProps(5)} />
                                    <Tab label="Water Bills" {...a11yProps(6)} />
                                </Tabs>
                            </AppBar>
                        </div>
                    </div>
                </header>

                 <div className="bodyContent">
                    <TabPanel value={value} index={0}>
                     <IncomeHome/>   
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                     <StaffPaymentHome/>   
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    <InsuranceHome/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                    <TranspotationHome/> 
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                     <MaterialHome/>   
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                    <ElectricHome/>  
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                     <WaterHome/>   
                    </TabPanel>
                    
                </div>

            </div>
        </div>
        );
}

export default FinanceManagement;