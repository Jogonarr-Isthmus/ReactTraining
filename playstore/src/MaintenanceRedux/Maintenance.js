import React from 'react';
import './Maintenance.css';

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

    onFormLoad = (entity) => {
        this.setState({
            formIsActive: true,
            formEntity: entity
        });
    };

    onFormClose = () => {
        this.setState({
            formIsActive: false,
            formEntity: {}
        });
    };

    capitalizeEntityName = () => {
        let entityName = this.props.entityName;
        return entityName.charAt(0).toUpperCase() + entityName.slice(1);
    };

    getFormHtml = () => {
        switch (this.props.entityName) {
            case 'users':
                return <UserForm entityName={this.props.entityName} entity={this.state.formEntity} onClose={this.onFormClose} />;

            case 'games':
                return <GameForm entityName={this.props.entityName} entity={this.state.formEntity} onClose={this.onFormClose} />

            default:
                return <div>Form not defined yet.</div>
        }
    };

    render() {
        return (
            <div className="Maintenance">
                <h3>{this.capitalizeEntityName()} <small>Maintenance</small></h3>
                {this.state.formIsActive
                    ? this.getFormHtml()
                    : (
                        <div>
                            <div className="MaintenanceHeader">
                                <button className="btn btn-sm btn-success" onClick={() => this.onFormLoad({})}>+ New</button>
                            </div>
                            <List entities={this.props.entities[this.props.entityName]} onEdit={this.onFormLoad} />
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

export default connect(
    mapStateToProps
)(Maintenance);