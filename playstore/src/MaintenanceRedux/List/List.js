import React from 'react';
import './List.css';

import { remove } from '../../Reducers/entities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function List(props) {
    const getHeaders = () => {
        let headers;

        if (props.entities && props.entities.length > 0) {
            const entity = props.entities[0];
            headers = (
                <tr>
                    {
                        Object.keys(entity).map((property, propertyIndex) => {
                            return (<th key={propertyIndex}>{property}</th>);
                        })
                    }
                    <th>Actions</th>
                </tr>
            )
        } else {
            headers = <tr></tr>;
        }

        return headers;
    }

    const getRows = () => {
        let rows;

        if (props.entities && props.entities.length > 0) {
            rows = props.entities.map((entity, entityIndex) => {
                return (
                    <tr key={entityIndex}>
                        {
                            Object.keys(entity).map((property, propertyIndex) => {
                                return (<td key={propertyIndex}>{entity[property]}</td>);
                            })
                        }
                        <td className="tableActions">
                            <button type="button" className="btn btn-sm btn-primary" onClick={() => props.onEdit(entity)}>Edit</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => props.remove(props.entityName, entity.Id)}>Delete</button>
                        </td>
                    </tr>
                )
            })
        } else {
            rows = <tr></tr>;
        }

        return rows;
    }

    return (
        <div>
            {props.entities && props.entities.length > 0
                ? (
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                            {getHeaders()}
                        </thead>
                        <tbody>
                            {getRows()}
                        </tbody>
                    </table>
                )
                : (<span>No records found...</span>)
            }
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        remove
    }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(List);