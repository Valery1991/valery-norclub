import React from 'react';
import './css/App.css';

class PolicyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            models: [],
            premiumCost: 0
        };
    }

    componentDidMount() {
        this.getCarBrands();
    }

    getCarBrands() {
        fetch('https://its-testcase-api.azurewebsites.net/api/car/brands', {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
            .then(response => response.json())
            .then(result => this.setState({ brands: result }));
    }

    getCarModels(brandId) {
        fetch('https://its-testcase-api.azurewebsites.net/api/car/models/' + brandId, {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
            .then(response => response.json())
            .then(result => this.setState({ models: result }));
    }

    getPremiumCost() {
        fetch('https://its-testcase-api.azurewebsites.net/api/calculator/premium?modelId=1&period.start=18-01-2019&period.end=18-12-2019&kilometers=1000&owners=1', {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
            .then(response => response.json())
            .then(result => this.setState({ premiumCost: result }));
    }

    createPolicy() {
        let data = {
            modelId: 1,
            period: {
                start: '18-01-2019',
                end: '18-12-2019'
            },
            owners: 1,
            kilometers: 1000
        };

        fetch('https://its-testcase-api.azurewebsites.net/api/policy', {
            method: 'POST',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            },
            body: JSON.stringify(data)
        })
            .then(result => console.log(result));
    }

    render() {
        return (
            <div className={this.props.hideForm}>
                <div className="row justify-content-center">
                    <div className="col-5">

                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="car-brand-select">Car Brand</label>
                                        <select className="form-control" id="car-brand-select">
                                            <option>Brand</option>
                                            <option>Brand</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="car-model-select">Car Model</label>
                                        <select className="form-control" id="car-model-select" disabled>
                                            <option default>Select a brand first...</option>
                                        </select>
                                    </div>
                                    <div className="form-group form-row">
                                        <div className="col">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input type="date" className="form-control" id="startDate" placeholder="Start date" />
                                        </div>

                                        <div className="col">
                                            <label htmlFor="endDate">End Date</label>
                                            <input type="date" className="form-control" id="endDate" placeholder="End date" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default PolicyForm;