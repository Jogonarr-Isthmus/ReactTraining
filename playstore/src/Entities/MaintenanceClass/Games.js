import React from 'react';
import './Maintenance.css';

import Form from '../Forms/GameForm.js';
import List from '../List/List.js';

class Games extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entities: this.props.entities,
            formIsActive: false,
            formEntity: {}
        };
    }

    insertEntity = (newEntity) => {
        console.log('Insert new Entity to [Games].');
        console.log('[Games]: ', this.state.entities);

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

        console.log('[Games]: ', this.state.entities);
    };

    loadEditForm = (entity, index) => {
        this.setState({
            formIsActive: true,
            formEntity: { ...entity, Index: index }
        });
    };

    editEntity = (entity) => {
        let { Index: index, ...entityToUpdate } = entity;

        console.log('Edit existing Entity on [Games].');
        console.log('[Games]: ', this.state.entities);
        console.log('Entity = ', entityToUpdate);

        let updatedEntities = [...this.state.entities];
        updatedEntities[index] = entityToUpdate;

        this.setState({
            entities: updatedEntities
        });

        console.log('[Games]: ', this.state.entities);
    };

    deleteEntity = (id) => {
        console.log('Delete Entity from [Games].');
        console.log('[Games]: ', this.state.entities);
        console.log('Id to delete = ', id);

        if (id) {
            let updatedEntities = [...this.state.entities].filter(entity => entity.Id !== id);

            this.setState({
                entities: updatedEntities
            });
        }

        console.log('[Games]: ', this.state.entities);
    };

    onFormClose = () => {
        this.setState({
            formEntity: {},
            formIsActive: false
        });
    };

    render() {
        return (
            <div className="Maintenance">
                <h3>Games <small>Class</small></h3>
                {this.state.formIsActive
                    ? <Form entity={this.state.formEntity} onInsert={this.insertEntity} onEdit={this.editEntity} onClose={this.onFormClose} />
                    : (
                        <div>
                            <div className="MaintenanceHeader">
                                <button className="btn btn-sm btn-success" onClick={() => this.setState({ formIsActive: true })}>+ New Games</button>
                            </div>
                            <List entities={this.state.entities} onEdit={this.loadEditForm} onDelete={this.deleteEntity}></List>
                        </div>
                    )
                }
            </div>
        );
    }
}

Games.defaultProps = {
    entities: [
        { Id: 1, Name: 'Quake', Rating: '9.0', Type: 'FPS' },
        { Id: 2, Name: 'COD', Rating: '9.5', Type: 'FPS' },
        { Id: 3, Name: 'Mario Kart', Rating: '8.0', Type: 'Racing' },
        { Id: 4, Name: 'Grim Fandango', Rating: '10.0', Type: 'Adventure' }
    ],
};

export default Games;