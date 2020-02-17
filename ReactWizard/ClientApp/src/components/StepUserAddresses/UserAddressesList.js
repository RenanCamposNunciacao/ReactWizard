import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WizardStore';
import * as actionCreatorsUserAddress from '../../store/UserAddressesStore';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class UserAddressesList extends Component {
    constructor(props) {
        super(props);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.loadUserAddress = this.loadUserAddress.bind(this);
        this.deleteUserAddress = this.deleteUserAddress.bind(this);
        this.state = {
            userAddressId: -1,
            
        }
        //this.updateGrid = this.updateGrid.bind(this);
    }
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched(false);
    }

    componentDidUpdate() {
        //console.log('change list');
        //console.log(this.props.current_user);
        //console.log(this.state.userId);
        // This method is called when the route parameters change
        this.ensureDataFetched((this.props.userAddress.id !== this.state.userAddressId || this.props.current_user !== this.state.userId || this.props.updateAddresses));
        if (this.props.userAddress.id !== this.state.userAddressId || this.props.current_user !== this.state.userId)
            this.setState({ ...this.state, userAddressId: this.props.userAddress.id, userId: this.props.current_user });

        if (this.props.updateAddresses)
            this.setUpdateAddresses(false);
    }

    ensureDataFetched(forceUpdate) {
        const startIndex = (this.state ? parseInt(this.state.startIndex, 10) : 0) || 0;
        this.props.requestUserAddresses(startIndex, forceUpdate, this.props.current_user);
    }

    handlePrevious() {
        this.updateGrid((this.props.startIndex || 0) - 5);
    }

    handleNext() {
        this.updateGrid((this.props.startIndex || 0) + 5);
    }

    updateGrid(startIndex) {
        this.setState({
            ...this.state,
            startIndex: startIndex
        });
    }

    loadUserAddress(e, userAddressId) {
        this.props.loadUserAddress(userAddressId);
        e.stopPropagation();
    }

    deleteUserAddress(e, userAddressId) {
        this.props.deleteUserAddress(userAddressId);
        this.setUpdateAddresses(true);
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <h4 className="SectionHeader">Endereços do usuário</h4>
                {renderUsersTable(this.props, this.loadUserAddress, this.deleteUserAddress)}
                {renderPagination(this.props, this.handlePrevious, this.handleNext)}
            </div>
        );
    }
}

function renderUsersTable(props, loadUserAddress, deleteUserAddress) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Endereço</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.userAddresses_list.map(userAddress =>
                    <tr key={userAddress.id}>
                        <td>{userAddress.id}</td>
                        <td>{userAddress.street}, {userAddress.number}, {userAddress.district}</td>
                        <td>{userAddress.city}</td>
                        <td>{userAddress.state}</td>
                        <td>
                            <CreateIcon onClick={(e) => { loadUserAddress(e, userAddress.id); }}></CreateIcon>
                            <DeleteIcon onClick={(e) => { deleteUserAddress(e, userAddress.id); }}></DeleteIcon>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function renderPagination(props, handlePrevious, handleNext) {
    const prevStartIndex = (props.startIndex || 0) - 5;
    return <p className='clearfix text-center'>
        <button disabled={prevStartIndex < 0} className='btn btn-default pull-left' onClick={handlePrevious}>Previous</button>
        <button disabled={props.userAddresses_list.length < 5} className='btn btn-default pull-right' onClick={handleNext}>Next</button>
        {props.isLoading ? <span>Loading...</span> : []}
    </p>;
}

export default compose(connect(
    state => state.wizard,
    dispatch => bindActionCreators(actionCreators, dispatch)
), connect(
    state => state.userAddresses_list,
    dispatch => bindActionCreators(actionCreatorsUserAddress.actionCreators, dispatch)
))(UserAddressesList);
