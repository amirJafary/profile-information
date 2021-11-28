import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import '../../asset/scss/preparing.scss'

class MUTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstValueOfTab: 1,
        }
    }

    handleChange = (e, newValue) => {
        this.setState({
            firstValueOfTab: newValue
        }, () => {
            console.log(this.state.firstValueOfTab,"------");
            this.props.GetValueOfTabs(this.state.firstValueOfTab)
        });
    };

    render() {
        return (
            <div>
                <TabContext value={this.state.firstValueOfTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(e, newValue) => this.handleChange(e, newValue)} aria-label="lab API tabs example">
                            <Tab label="Preparing" value={1} />
                            <Tab label="Failed" value={2} />
                        </TabList>
                    </Box>
                    {/* <TabPanel value={1}>Item One</TabPanel>
                    <TabPanel value={2}>Item Two</TabPanel> */}
                </TabContext>
            </div>
        )
    }
}

export default MUTabs