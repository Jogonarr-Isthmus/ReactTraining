import React from 'react';
import './Maintenance.css';

import { insert, edit, remove } from '../Reducers/entities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserForm from './Forms/UserForm';
import GameForm from './Forms/GameForm';
import List from './List/List';

class Maintenance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formIsActive: false,
            formEntity: {}
        };
    }

    insertEntity = (entity) => {
        this.props.insert(this.props.entityName, entity);
    };

    loadEditForm = (entity) => {
        this.setState({
            formIsActive: true,
            formEntity: entity
        });
    };

    editEntity = (entity) => {
        this.props.edit(this.props.entityName, entity);
    };

    deleteEntity = (id) => {
        this.props.remove(this.props.entityName, id);
    };

    onFormClose = () => {
        this.setState({
            formEntity: {},
            formIsActive: false
        });
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    getFormHtml = () => {
        switch (this.props.entityName) {
            case 'users':
                return <UserForm entity={this.state.formEntity} onInsert={this.insertEntity} onEdit={this.editEntity} onClose={this.onFormClose} />;

            case 'games':
                return <GameForm entity={this.state.formEntity} onInsert={this.insertEntity} onEdit={this.editEntity} onClose={this.onFormClose} />

            default:
                return <div>Form not defined yet.</div>
        }
    };

    render() {
        return (
            <div className="Maintenance">
                <h3>{this.capitalizeFirstLetter(this.props.entityName)} <small>Maintenance</small></h3>
                {this.state.formIsActive
                    ? this.getFormHtml()
                    : (
                        <div>
                            <div className="MaintenanceHeader">
                                <button className="btn btn-sm btn-success" onClick={() => this.setState({ formIsActive: true })}>+ New {this.capitalizeFirstLetter(this.props.entityName)}</button>
                            </div>
                            <List entities={this.props.entities[this.props.entityName]} onEdit={this.loadEditForm} onDelete={this.deleteEntity} />
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.entities.errorMessage,
        entities: state.entities
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        insert,
        edit,
        remove
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Maintenance);