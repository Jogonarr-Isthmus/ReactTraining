import React from 'react';
import './List.css';

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
                        <td className="tableActions"><button type="button" className="btn btn-sm btn-danger" onClick={() => props.onDelete(entityIndex)}>Delete</button></td>
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
        <table className="table table-striped table-bordered table-hover table-condensed">
            <thead>
                {getHeaders()}
            </thead>
            <tbody>
                {getRows()}
            </tbody>
        </table>
    </div>
  );
}

export default List;