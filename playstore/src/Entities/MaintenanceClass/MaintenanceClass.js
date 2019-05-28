import React from 'react';
import './MaintenanceClass.css';
import UserForm from '../Forms/UserForm.js';
import GameForm from '../Forms/GameForm.js';
import List from '../List/List.js';

class MaintenanceClass extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            entities: this.props.entities
        };
    }

    getMaxId = () => {
        let maxId = 0;

        this.state.entities.forEach(function (entity, entityIndex) {
            if (entity.Id >= maxId) {
                maxId = entity.Id;
            }
        });

        return maxId;
    };

    insertEntity = (newEntity) => {
        if (newEntity.Name && newEntity.Name !== '') {
            console.log('Insert new Entity to [' + this.props.entityName + 's].');

            console.log('[' + this.props.entityName + 's]: ', this.state.entities);

            let newId = this.getMaxId() + 1;
            newEntity.Id = newId;

            console.log('New Entity = ', newEntity);

            let updatedEntities = this.state.entities;
            updatedEntities.push(newEntity);
                
            this.setState({
                entities: updatedEntities
            });

            console.log('[' + this.props.entityName + 's]: ', this.state.entities);
        }
    };

    deleteEntity = (index) => {
        console.log('Delete Entity from [' + this.props.entityName + 's].');

        console.log('[' + this.props.entityName + 's]: ', this.state.entities);

        console.log('Index to delete = ', index);
        
        if (index >= 0) {
            let updatedEntities = this.state.entities;
            updatedEntities.splice(index, 1);

            this.setState({
                entities: updatedEntities
            });
        }

        console.log('[' + this.props.entityName + 's]: ', this.state.entities);
    };

    render() {
        let entityForm = '';
        switch(this.props.entityName) {
            case 'User':
                entityForm = <UserForm onInsert={this.insertEntity}></UserForm>;
                break;
            case 'Game':
                entityForm = <GameForm onInsert={this.insertEntity}></GameForm>;
                break;
            default:
                entityForm = <div></div>;
        }

        return (
            <div className="MaintenanceClass">
                <h3>{this.props.entityName}s <small>Class</small></h3>
                {entityForm}
                <List entities={this.state.entities} onDelete={this.deleteEntity}></List>
            </div>
        );
    }
}

export default MaintenanceClass;