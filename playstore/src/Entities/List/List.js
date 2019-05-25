import React from 'react';
import './List.css';

function List(props) {
    const getHeaders = () => {
        let rows;

        if (props.entities && props.entities.length > 0) {
            return (
                <tr>
                    {
                        Object.keys(props.entities[0]).map((val, k) => {
                            return (<th>{val}</th>);
                        })
                    }
                </tr>
            )
        } else {
            rows = <tr></tr>;
        }

        return rows;
    }

    const getRows = () => {
        let rows;

        if (props.entities && props.entities.length > 0) {
            rows = props.entities.map((entity, entityIndex) => {
                return (
                    <tr>
                        {
                            Object.keys(entity).map((property, propertyIndex) => {
                                return (<td>{entity[property]}</td>);
                            })
                        }
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
        <h3>{props.title}</h3>
        <table>
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