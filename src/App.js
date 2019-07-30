import React from 'react';
import PolicyForm from './PolicyForm';
import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            policies: [],
            hideForm: 'hidden'
        };

        this.createPolicyForm = this.createPolicyForm.bind(this);
    }

    componentDidMount() {
        this.getPolicies();
    }

    getPolicies() {
        fetch('https://its-testcase-api.azurewebsites.net/api/policy?page=0&size=15', {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
            .then(response => response.json())
            .then(result => this.setState({ policies: result }));
    }

    createPolicyForm() {
        this.setState({ hideForm: '' });
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <table className="table table-light table-striped table-hover">
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

                    <div className="row justify-content-center">
                        <div className="col-2">

                            <button type="button" className="btn btn-info" onClick={this.createPolicyForm}>Create new policy</button>

                        </div>
                    </div>

                    <br />

                    <PolicyForm hideForm={this.state.hideForm} />
                </div>
            </>
        );
    }
}

export default App;