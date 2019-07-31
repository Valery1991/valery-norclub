import React from 'react';
import PolicyTable from './PolicyTable';
import PolicyForm from './PolicyForm';
import './css/App.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            policies: [],
            index: 0
        };

        this.getPolicies = this.getPolicies.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }

    componentDidMount() {
        this.getPolicies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.index !== prevState.index) {
            this.getPolicies(this.state.index);
        }
    }

    getPolicies(index) {
        const page = index ? index : 0;

        fetch('https://its-testcase-api.azurewebsites.net/api/policy?page=' + page + '&size=10', {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
            .then(response => response.json())
            .then(result => this.setState({ policies: result }))
            .catch(error => console.error(error));
    }

    setIndex(e) {
        const id = e.currentTarget.id;

        if (id === 'previous-page' && this.state.index !== 0) {
            this.setState(prevState => ({
                index: prevState.index - 1
            }));
        } else if (id === 'next-page') {
            this.setState(prevState => ({
                index: prevState.index + 1
            }));
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-md-8">
                            <PolicyTable data={this.state.policies} />

                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" id="previous-page" href="#" onClick={this.setIndex}>Previous</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" id="next-page" href="#" onClick={this.setIndex}>Next</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-4">
                            <PolicyForm getPolicies={this.getPolicies} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;