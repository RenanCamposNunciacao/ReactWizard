import React from 'react';
import { Container } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WizardStore';
import './Wizard.css';

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="WizardNav">
                <button className={'btnUser' + (this.props.currentStep == 1 ? ' active' : '')} onClick={() => this.props.goToStep(1)}>Usuário</button>
                <button disabled={this.props.current_user == -1} className={'btnUserAddresses' + (this.props.currentStep == 2 ? ' active' : '')} onClick={() => this.props.goToStep(2)}>Endereços</button>
            </Container>
        );
    }

}
export default connect(
    state => state.wizard,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Navigation);