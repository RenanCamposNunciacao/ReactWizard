import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WizardStore';
import * as actionCreatorsUser from '../../store/UserStore';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.state = {
            userId: -1
        }
        //this.updateGrid = this.updateGrid.bind(this);
    }
    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched(false);
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        this.ensureDataFetched((this.props.user.id !== this.state.userId));
        if (this.props.user.id !== this.state.userId)
            this.setState({ userId: this.props.user.id });
    }

    ensureDataFetched(forceUpdate) {
        const startIndex = (this.state ? parseInt(this.state.startIndex, 10) : 0) || 0;
        this.props.requestUsers(startIndex, forceUpdate);
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

    loadUser(e, userId) {
        this.props.loadUser(userId);
        this.props.setUser(userId);
        e.stopPropagation();
    }

    render() {
        return (
            <div>
                <h4 className="SectionHeader">Usuários cadastrados</h4>
                {renderUsersTable(this.props, this.loadUser)}
                {renderPagination(this.props, this.handlePrevious, this.handleNext)}
            </div>
        );
    }
}

function renderUsersTable(props, loadUser) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Nascimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.users_list.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.birthdateformated}</td>
                        <td>
                            <CreateIcon onClick={(e) => { loadUser(e, user.id); }}></CreateIcon>
                            <DeleteIcon onClick={(e) => { props.deleteUser(user.id); e.stopPropagation() } }></DeleteIcon>
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
        <button disabled={props.users_list.length < 5}className='btn btn-default pull-right' onClick={handleNext}>Next</button>
        {props.isLoading ? <span>Loading...</span> : []}
    </p>;
}

export default compose(connect(
    state => state.wizard,
    dispatch => bindActionCreators(actionCreators, dispatch)
), connect(
    state => state.users_list,
    dispatch => bindActionCreators(actionCreatorsUser.actionCreators, dispatch)
))(UserList);
