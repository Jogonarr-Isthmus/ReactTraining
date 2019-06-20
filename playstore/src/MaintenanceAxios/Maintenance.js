import React from 'react';
import './Maintenance.css';

import Axios from 'axios';
import { connect } from 'react-redux';

import UserForm from './Forms/UserForm';
import GameForm from './Forms/GameForm';
import List from './List/List';

class Maintenance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formIsActive: false,
            formEntity: {},
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
            const url = 'http://kyrapps.com:4300/api/' + this.props.entityName + '?studentID=' + this.props.loggedUser.studentID;

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
            const url = 'http://kyrapps.com:4300/api/' + this.props.entityName + '?studentID=' + this.props.loggedUser.studentID;

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
            const url = 'http://kyrapps.com:4300/api/' + this.props.entityName + '/' + data._id + '?studentID=' + this.props.loggedUser.studentID;

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
            const url = 'http://kyrapps.com:4300/api/' + this.props.entityName + '/' + id + '?studentID=' + this.props.loggedUser.studentID;

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
        let entityName = this.props.entityName;
        return entityName.charAt(0).toUpperCase() + entityName.slice(1);
    };

    singularizeEntityName = () => {
        let entityName = this.props.entityName;
        const lastIndex = entityName.lastIndexOf("s");
        return entityName.substring(0, lastIndex);
    };

    getFormHtml = () => {
        switch (this.props.entityName) {
            case 'users':
                return <UserForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />;

            case 'games':
                return <GameForm entity={this.state.formEntity} onInsert={this.onInsert} onEdit={this.onEdit} onClose={this.onFormClose} />

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

function mapStateToProps(state) {
    return {
        loggedUser: state.auth.loggedUser
    };
}

export default connect(
    mapStateToProps,
    null
)(Maintenance);