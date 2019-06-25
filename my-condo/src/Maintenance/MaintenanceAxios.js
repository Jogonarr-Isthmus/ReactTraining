import React from 'react';
import './Maintenance.css';

import Axios from 'axios';
import { connect } from 'react-redux';

import UserForm from './Forms/UserForm';
import HouseForm from './Forms/HouseForm';
import List from './List/List';

class Maintenance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formIsActive: false,
            formEntity: {},
            entityName: this.props.entityName,
            entities: []
        };
    }

    componentDidMount = () => {
        this.onListRefresh();
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

        this.onListRefresh();
    };

    onListRefresh = () => {
        if (this.props.loggedUser.studentID) {
            const url = this.props.baseApiUrl + this.state.entityName + '?studentID=' + this.props.loggedUser.studentID;

            Axios.get(url)
                .then(response => {
                    console.log('Axios.get - url: ', url);
                    console.log('Axios.get - response: ', response);

                    this.setState({
                        entities: response.data[this.singularizeEntityName()]
                    });
                })
                .catch(error => {
                    console.error('Axios.get - url: ', url);
                    console.error('Axios.get - error: ', error);
                });
        }
    };

    onInsert = (entity) => {
        if (this.props.loggedUser.studentID) {
            const data = {
                [this.singularizeEntityName()]: { ...entity }
            };
            const url = this.props.baseApiUrl + this.state.entityName + '?studentID=' + this.props.loggedUser.studentID;

            Axios.post(url, data)
                .then(response => {
                    console.log('Axios.post - url: ', url);
                    console.log('Axios.post - data: ', data);
                    console.log('Axios.post - response: ', response);

                    this.onFormClose();
                })
                .catch(error => {
                    console.error('Axios.post - url: ', url);
                    console.error('Axios.post - data: ', data);
                    console.error('Axios.post - error: ', error);

                    this.onFormClose();
                });
        }
    };

    onEdit = (entity) => {
        if (this.props.loggedUser.studentID) {
            const data = {
                [this.singularizeEntityName()]: { ...entity }
            };
            const url = this.props.baseApiUrl + this.state.entityName + '/' + data._id + '?studentID=' + this.props.loggedUser.studentID;

            Axios.put(url, data)
                .then(response => {
                    console.log('Axios.put - url: ', url);
                    console.log('Axios.post - data: ', data);
                    console.log('Axios.put - response: ', response);

                    this.onFormClose();
                })
                .catch(error => {
                    console.error('Axios.put - url: ', url);
                    console.error('Axios.put - data: ', data);
                    console.error('Axios.put - error: ', error);

                    this.onFormClose();
                });
        }
    };

    onDelete = (id) => {
        if (this.props.loggedUser.studentID) {
            const url = this.props.baseApiUrl + this.state.entityName + '/' + id + '?studentID=' + this.props.loggedUser.studentID;

            Axios.delete(url)
                .then(response => {
                    console.log('Axios.delete - url: ', url);
                    console.log('Axios.delete - response: ', response);

                    this.onListRefresh();
                })
                .catch(error => {
                    console.error('Axios.delete - url: ', url);
                    console.error('Axios.delete - error: ', error);

                    this.onListRefresh();
                });
        }
    };

    capitalizeEntityName = () => {
        let entityName = this.state.entityName;
        return entityName.charAt(0).toUpperCase() + entityName.slice(1);
    };

    singularizeEntityName = () => {
        let entityName = this.state.entityName;
        const lastIndex = entityName.lastIndexOf("s");
        return entityName.substring(0, lastIndex);
    };

    getFormHtml = () => {
        switch (this.state.entityName) {
            case 'users':
                return <UserForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />;

            case 'houses':
                return <HouseForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />

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
                            <List entities={this.state.entities} onEdit={this.onFormLoad} onDelete={this.onDelete} />
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToPropsDefault(state) {
    return {
        baseApiUrl: state.app.baseApiUrl,
        loggedUser: state.auth.loggedUser
    };
}

function mapStateToPropsUsers(state) {
    return {
        baseApiUrl: state.app.baseApiUrl,
        loggedUser: state.auth.loggedUser,
        entityName: 'users'
    };
}

function mapStateToPropsHouses(state) {
    return {
        baseApiUrl: state.app.baseApiUrl,
        loggedUser: state.auth.loggedUser,
        entityName: 'houses'
    };
}

const UsersMaintenance = connect(
    mapStateToPropsUsers
)(Maintenance);

const HousesMaintenance = connect(
    mapStateToPropsHouses
)(Maintenance);

const DefaultMaintenance = connect(
    mapStateToPropsDefault
)(Maintenance);

export default DefaultMaintenance;
export {
    UsersMaintenance,
    HousesMaintenance
};