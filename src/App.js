import React from 'react';
import PolicyTable from './PolicyTable';
import PolicyForm from './PolicyForm';
import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            policies: []
        };

        this.getPolicies = this.getPolicies.bind(this);
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
            .then(result => this.setState({ policies: result }))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <PolicyTable data={this.state.policies} />
                        </div>

                        <div className="col-4">
                            <PolicyForm getPolicies={this.getPolicies} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;