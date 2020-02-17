import React, { Component } from 'react';
import { Grid, FormControl, InputLabel, Input, Container, Button } from '@material-ui/core';
import UserAddressesList from './UserAddressesList';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WizardStore';
import * as actionCreatorsUserAddresses from '../../store/UserAddressesStore';

export class StepUserAddresses extends Component {
    constructor(props) {
        super(props);
        this.saveTempUserAddress = this.saveTempUserAddress.bind(this);
        this.state = {
            tempUserAddress: {}
        };
    }

    componentDidUpdate() {
        //loads selected user address
        if (this.props.userAddress.id) {
            if (this.props.userAddress.id !== this.props.current_useraddress) {
                if (this.props.userAddress.id && this.props.userAddress.id !== -1) {
                    this.props.setUserAddress(this.props.userAddress.id);
                    this.setState({
                        tempUserAddress: this.props.userAddress
                    });
                }
                else if (this.props.current_useraddress !== -1) {
                    this.props.setUserAddress(-1);
                    this.setState({ tempUserAddress: {} });
                }
            }
            this.props.finishedLoadUserAddress();
        }

        if (this.message == "Ok")
            this.setUpdateAddresses(true);
    }

    handleChange = (e) => {
        this.setState({ tempUserAddress: { ...this.state.tempUserAddress, [e.target.name]: e.target.value } });
    }

    saveTempUserAddress() {
        if (!this.state.tempUserAddress.userId > 0)
            this.state.tempUserAddress.userId = this.props.current_user;
        
        this.props.saveUserAddress(this.state.tempUserAddress);
    }
    render() {
        return (
            <Container className="StepContainer">
                <Grid className="FormContainer" container spacing={1}>

                    <Grid item xs={12} className="SectionHeader">
                        <h4>Dados do endereço</h4>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel id="user-address-id-text"></InputLabel>
                            <Input id="user-address-id" label="Código" placeholder="Código" name="id" value={this.state.tempUserAddress.id} onChange={this.handleChange} aria-describedby="user-address-id-text" disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel id="user-address-street-text" htmlFor="user-address-street">Rua</InputLabel>
                            <Input id="user-address-street" name="Street" value={this.state.tempUserAddress.street} onChange={this.handleChange} aria-describedby="user-address-street-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl>
                            <InputLabel id="user-address-number-text" htmlFor="user-address-number">Número</InputLabel>
                            <Input id="user-address-number" name="Number" value={this.state.tempUserAddress.number} onChange={this.handleChange} aria-describedby="user-address-number-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel id="user-address-district-text" htmlFor="user-address-street">Bairro</InputLabel>
                            <Input id="user-address-district" name="District" value={this.state.tempUserAddress.district} onChange={this.handleChange} aria-describedby="user-address-district-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel id="user-address-city-text" htmlFor="user-address-city">Cidade</InputLabel>
                            <Input id="user-address-city" name="City" value={this.state.tempUserAddress.city} onChange={this.handleChange} aria-describedby="user-address-city-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel id="user-address-state-text" htmlFor="user-address-state">Estado</InputLabel>
                            <Input id="user-address-state" name="State" value={this.state.tempUserAddress.state} onChange={this.handleChange} aria-describedby="user-address-state-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <InputLabel id="user-address-country-text" htmlFor="user-address-country">País</InputLabel>
                            <Input id="user-address-country" name="Country" value={this.state.tempUserAddress.country} onChange={this.handleChange} aria-describedby="user-address-country-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="primary" onClick={this.saveTempUserAddress}>Salvar</Button>
                    </Grid>
                </Grid>

                <UserAddressesList />
            </Container>
        );
    }
}

export default compose(connect(
    state => state.wizard,
    dispatch => bindActionCreators(actionCreators, dispatch)
), connect(
    state => state.userAddresses_list,
    dispatch => bindActionCreators(actionCreatorsUserAddresses.actionCreators, dispatch)
))(StepUserAddresses);