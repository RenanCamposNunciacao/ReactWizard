import React from 'react';
import { connect } from 'react-redux';
import StepWizard from 'react-step-wizard';
import StepUser from '../StepUser/StepUser';
import StepUserAddresses from '../StepUserAddresses/StepUserAddresses';
import Navigation from './Navigation';

const Wizard = props => (
    <StepWizard nav={<Navigation />}>
        <StepUser />
        <StepUserAddresses />
    </StepWizard>
);

export default connect()(Wizard);
