import React, { Component } from 'react';
import { Grid, FormControl, InputLabel, Input, Container, Button } from '@material-ui/core';
import UserList from './UserList';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WizardStore';
import * as actionCreatorsUser from '../../store/UserStore';

export class StepUser extends Component {
    constructor(props) {
        super(props);
        this.saveTempUser = this.saveTempUser.bind(this);
        this.state = {
            tempuser: { }
        };
    }

    componentDidUpdate() {
        //loads selected user
        if (this.props.user.id) {
            this.setState({
                tempuser: this.props.user
            });

            this.props.finishedLoadUser();
        }
        
        if (this.state.tempuser.id !== this.props.current_user) {
            
            if (this.state.tempuser.id && this.state.tempuser.id !== -1) {
                this.props.goToStep(2);
                this.props.setUser(this.state.tempuser.id);
            }
            else if (this.props.current_user !== -1) {
                //this.props.setUser(-1);
                //this.setState({ tempuser: { } });
            }
        }
    }

    handleChange = (e) => {
        this.setState({ tempuser: { ...this.state.tempuser, [e.target.name]: e.target.value } });
    }

    saveTempUser() {
        this.props.saveUser(this.state.tempuser);
    }
    render() {
        return (
            <Container className="StepContainer">
                <Grid className="FormContainer" container spacing={1}>

                    <Grid item xs={12} className="SectionHeader">
                        <h4>Dados do usuário</h4>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel></InputLabel>
                            <Input id="user-id" label="Código" placeholder="Código" name="id" value={this.state.tempuser.id} onChange={this.handleChange} aria-describedby="user-id-text" disabled/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                        <FormControl>
                            <InputLabel htmlFor="user-name">Nome</InputLabel>
                            <Input id="user-name" name="Name" value={this.state.tempuser.name} onChange={this.handleChange} aria-describedby="user-name-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <InputLabel htmlFor="user-birthdate">Data de nascimento</InputLabel>
                            <Input id="user-birthdate" name="birthdate" value={this.state.tempuser.birthdate} onChange={this.handleChange} aria-describedby="user-birthdate-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <InputLabel htmlFor="user-telephone">Telefone</InputLabel>
                            <Input id="user-telephone" name="telephone" value={this.state.tempuser.telephone} onChange={this.handleChange} aria-describedby="user-telephone-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <InputLabel htmlFor="user-telephone">Celular</InputLabel>
                            <Input id="user-cellphone" name="cellphone" value={this.state.tempuser.cellphone} onChange={this.handleChange} aria-describedby="user-telephone-text" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl>
                            <InputLabel htmlFor="user-email">Email</InputLabel>
                            <Input id="user-email" name="email" value={this.state.tempuser.email} onChange={this.handleChange} aria-describedby="user-email-text" />
                        </FormControl>
                    </Grid>

                    <Grid item xs={1}>
                        <Button variant="contained" color="primary" onClick={this.saveTempUser}>Salvar</Button>
                    </Grid>
                </Grid>

                <UserList />
            </Container>
        );
    }
}

export default compose(connect(
    state => state.wizard,
    dispatch => bindActionCreators(actionCreators, dispatch)
), connect(
        state => state.users_list,
        dispatch => bindActionCreators(actionCreatorsUser.actionCreators, dispatch)
))(StepUser);