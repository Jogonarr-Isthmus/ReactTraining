import React from 'react';
import './Maintenance.css';
import UserForm from '../Forms/UserForm.js';
import GameForm from '../Forms/GameForm.js';
import List from '../List/List.js';

class Maintenance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entities: this.props.entities,
            formIsActive: false,
            formEntity: {}
        };
    }

    insertEntity = (newEntity) => {
        console.log('Insert new Entity to [' + this.props.entityName + 's].');
        console.log('[' + this.props.entityName + 's]: ', this.state.entities);

        let newId = 1;
        if (this.state.entities && this.state.entities.length > 0) {
            const entityIds = this.state.entities.map(entity => entity.Id);
            newId = Math.max(...entityIds) + 1;
        }

        console.log('New Entity = ', newEntity);

        let updatedEntities = this.state.entities;
        updatedEntities.push({ Id: newId, ...newEntity });

        this.setState({
            entities: updatedEntities
        });

        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
    };

    loadEditForm = (entity, index) => {
        this.setState({
            formIsActive: true,
            formEntity: { ...entity, Index: index }
        });
    };

    editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [' + this.props.entityName + 's].');
        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...this.state.entities];
        updatedEntities[index] = entityToUpdate;

        this.setState({
            entities: updatedEntities
        });

        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
    };

    deleteEntity = (id) => {
        console.log('Delete Entity from [' + this.props.entityName + 's].');
        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...this.state.entities].filter(entity => entity.Id !== id);

            this.setState({
                entities: updatedEntities
            });
        }

        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
    };

    onFormClose = () => {
        this.setState({
            formEntity: {},
            formIsActive: false
        });
    };

    getEntityForm = () => {
        let entityForm = '';

        switch (this.props.entityName) {
            case 'User':
                entityForm = <UserForm entity={this.state.formEntity} onInsert={this.insertEntity} onEdit={this.editEntity} onClose={this.onFormClose} />;
                break;
            case 'Game':
                entityForm = <GameForm entity={this.state.formEntity} onInsert={this.insertEntity} onEdit={this.editEntity} onClose={this.onFormClose} />;
                break;
            default:
                entityForm = <div></div>;
        }

        return entityForm;
    };

    render() {
        return (
            <div className="Maintenance">
                <h3>{this.props.entityName}s <small>Class</small></h3>
                {this.state.formIsActive
                    ? this.getEntityForm()
                    : (
                        <div>
                            <div className="MaintenanceHeader">
                                <button className="btn btn-sm btn-success" onClick={() => this.setState({ formIsActive: true })}>+ New {this.props.entityName}</button>
                            </div>
                            <List entities={this.state.entities} onEdit={this.loadEditForm} onDelete={this.deleteEntity} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Maintenance;