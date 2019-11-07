import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../api/emissions'


const Shire = (props) => {
    const HomeEmissions = () => { }
    const VehicleEmissions = () => { }
    const WasteEmissions = () => { }

    return (
        <div className="shire-wrapper">
            <div className="shire-header">

            </div>
            <div className="shrire-body">
                <h2 className="shire-emissions"></h2>
            </div>
        </div>
    )
}
export default withTracker(() => {
    const emissionsId = sessionStorage.getItem('emissionsId');
    return {
        // Emissions: Emissions.find({}).fetch(),
        Emission: Emissions.findOne({ _id: emissionsId })
    };
})(Shire);