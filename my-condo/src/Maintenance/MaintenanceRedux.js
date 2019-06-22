import React from 'react';
import './Maintenance.css';

import { insert, edit, remove } from '../Reducers/entities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AmenityForm from './Forms/AmenityForm';
import ReservationForm from './Forms/ReservationForm';
import List from './List/List';

class Maintenance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formIsActive: false,
            formEntity: {},
            entityName: this.props.entityName
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

    onInsert = (entity) => {
        this.props.insert(this.state.entityName, entity);
    };

    onEdit = (entity) => {
        this.props.edit(this.state.entityName, entity);
    };

    onDelete = (id) => {
        this.props.remove(this.state.entityName, id);
    };

    capitalizeEntityName = () => {
        console.log('entityName: ', this.state.entityName);
        let entityName = this.state.entityName;
        return entityName.charAt(0).toUpperCase() + entityName.slice(1);
    };

    getFormHtml = () => {
        switch (this.state.entityName) {
            case 'amenities':
                return <AmenityForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />;

            case 'reservations':
                return <ReservationForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />

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
                            <List entities={this.props.entities[this.state.entityName]} onEdit={this.onFormLoad} onDelete={this.onDelete} />
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToPropsDefault(state) {
    return {
        errorMessage: state.entities.errorMessage,
        entities: state.entities,
        entityName: 'default'
    };
}

function mapStateToPropsAmenities(state) {
    return {
        errorMessage: state.entities.errorMessage,
        entities: state.entities,
        entityName: 'amenities'
    };
}

function mapStateToPropsReservations(state) {
    return {
        errorMessage: state.entities.errorMessage,
        entities: state.entities,
        entityName: 'reservations'
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        insert,
        edit,
        remove
    }, dispatch);
}

const AmenitiesMaintenance = connect(
    mapStateToPropsAmenities,
    mapDispatchToProps
)(Maintenance);

const ReservationsMaintenance = connect(
    mapStateToPropsReservations,
    mapDispatchToProps
)(Maintenance);

const DefaultMaintenance = connect(
    mapStateToPropsDefault,
    mapDispatchToProps
)(Maintenance);

export default DefaultMaintenance;
export {
    AmenitiesMaintenance,
    ReservationsMaintenance
};