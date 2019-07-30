import React from "react";

class App extends React.Component {
    componentDidMount() {
        this.fetchInsurances();
    }

    fetchInsurances() {
        fetch('https://its-testcase-api.azurewebsites.net/api/policy?page=0&size=15', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-api-key',
                'Access-Control-Allow-Methods': 'OPTIONS',
                'x-api-key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(result => console.log(result));
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <table className="table table-striped table-dark">
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                        <td>Test</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;