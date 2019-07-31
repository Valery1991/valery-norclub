import React from 'react';

const PolicyTable = (props) => {
    const policies = props.data;
    const row = policies.map((policy) => {
        return (
            <tr key={policy.id}>
                <th scope="row">{policy.id}</th>
                <td>{policy.car.brand}</td>
                <td>{policy.car.model}</td>
                <td>{new Date(policy.period.start).toLocaleDateString()}</td>
                <td>{new Date(policy.period.end).toLocaleDateString()}</td>
                <td>{policy.insuranceDetails.owners}</td>
                <td>{policy.insuranceDetails.kilometers}</td>
            </tr>
        )
    });

    return (
        <table className="table table-light table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Car Brand</th>
                    <th scope="col">Car Model</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Owners</th>
                    <th scope="col">Kilometers</th>
                </tr>
            </thead>
            <tbody>
                {row}
            </tbody>
        </table>
    )
}

export default PolicyTable;