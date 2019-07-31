import React from 'react';

class PolicyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            models: [],
            premiumCost: 0
        };

        this.getCarBrands = this.getCarBrands.bind(this);
        this.getCarModels = this.getCarModels.bind(this);
        this.getPremiumCost = this.getPremiumCost.bind(this);
        this.createPolicy = this.createPolicy.bind(this);
        this.setDateRange = this.setDateRange.bind(this);
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
        .then(result => this.setState({ brands: result }))
        .catch(error => console.error(error));
    }

    getCarModels(event) {
        const brandId = event.currentTarget.value;

        fetch('https://its-testcase-api.azurewebsites.net/api/car/models/' + brandId, {
            method: 'GET',
            headers: {
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            }
        })
        .then(response => response.json())
        .then(result => this.setState({ models: result }))
        .catch(error => console.error(error));
    }

    getPremiumCost() {
        const id = document.getElementById('car-model-select').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const owners = document.getElementById('owners').value;
        const kilometers = document.getElementById('kilometers').value;

        const isFormValid = document.querySelector('#policy-form').reportValidity();

        if (isFormValid) {
            const queryString = '?modelId=' + id + '&period.start=' + startDate + '&period.end=' + endDate
            + '&kilometers=' + kilometers + '&owners=' + owners;

            fetch('https://its-testcase-api.azurewebsites.net/api/calculator/premium' + queryString, {
                method: 'GET',
                headers: {
                    'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
                }
            })
            .then(response => response.json())
            .then(result => this.setState({ premiumCost: result }))
            .catch(error => console.error(error));
        }
    }

    createPolicy(e) {
        e.preventDefault();

        const id = document.getElementById('car-model-select').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const owners = document.getElementById('owners').value;
        const kilometers = document.getElementById('kilometers').value;

        const data = {
            modelId: id,
            period: {
                start: startDate,
                end: endDate
            },
            owners: owners,
            kilometers: kilometers
        };

        fetch('https://its-testcase-api.azurewebsites.net/api/policy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '0ec8d823-e24b-40f8-b364-2b286d4b8fc4'
            },
            body: JSON.stringify(data)
        })
        .then(this.props.getPolicies())
        .catch(error => console.error(error));
    }

    setDateRange(event) {
        const value = event.currentTarget.value;
        const endDateInput = document.getElementById('endDate');

        endDateInput.min = this.calculateDate(value, 120);
        endDateInput.max = this.calculateDate(value, 720);
    }

    calculateDate(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate.toISOString().split('T')[0]; // convert to YYYY-mm-dd format because min/max on input needs this format
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Create new policy
                </div>
                <div className="card-body">
                    <form id="policy-form" onSubmit={this.createPolicy}>
                        <div className="form-group">
                            <label htmlFor="car-brand-select">Car Brand</label>
                            <select className="form-control" id="car-brand-select" onChange={this.getCarModels} required>
                                <option hidden value="">Select a brand</option>
                                {this.state.brands.map((brand) => {
                                    return (
                                        <option key={brand.name} value={brand.id}>{brand.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="car-model-select">Car Model</label>
                            <select className="form-control" id="car-model-select" required>
                            <option default hidden value="">Select a model</option>
                                {this.state.models.map((model) => {
                                    return (
                                        <option key={model.name} value={model.id}>{model.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group form-row">
                            <div className="col">
                                <label htmlFor="startDate">Start Date</label>
                                <input type="date" className="form-control" id="startDate" onChange={this.setDateRange} required />
                            </div>

                            <div className="col">
                                <label htmlFor="endDate">End Date</label>
                                <input type="date" className="form-control" id="endDate" required />
                            </div>
                        </div>
                        <div className="form-group form-row">
                            <div className="col">
                                <label htmlFor="owners">Owners</label>
                                <input type="number" min="1" max="10" className="form-control" id="owners" required />
                            </div>

                            <div className="col">
                                <label htmlFor="kilometers">Kilometers</label>
                                <input type="number" min="1000" max="50000" className="form-control" id="kilometers" required />
                            </div>
                        </div>

                        <ul className={this.state.premiumCost > 0 ? 'list-group list-group-flush' : 'hidden'}>
                            <li className="list-group-item">Your premium costs: {this.state.premiumCost}</li>
                        </ul>

                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.getPremiumCost}>Check premium costs</button>
                            <button type="submit" className="btn btn-info">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PolicyForm;