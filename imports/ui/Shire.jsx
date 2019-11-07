import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../api/emissions'


const Shire = (props) => {
    const totalHomeEmissions = () => {
        if (props.Emissions === undefined) {
            return null
        } else {
            const electric = props.Emissions.Electric * 11.2 * 12;
            const naturalGas = props.Emissions.NaturalGas * 11.75 * 12;
            const propane = props.Emissions.Propane * 5.6 * 12;
            const fuelOil = props.Emissions.FuelOil * 5 * 12;
            const totalHome = naturalGas + electric + fuelOil + propane
            return totalHome
        }
    }
    const totalVehicleEmissions = () => {
        if (props.Emissions === undefined) {
            return null
        } else {
            const vehicles = props.Emissions.Vehicles;
            let totalVehicle = 0
            vehicles.forEach(v => {
                totalVehicle = totalVehicle + (((v.mpw * 52) / v.mpg) * 19.87)
            })
            return totalVehicle
        }
    }
    const totalWasteEmissions = () => {
        if (props.Emissions === undefined) {
            return null
        } else {
            let totalWaste = props.Emissions.HouseholdSize * 696
            if (props.Emissions.Aluminum === true) {
                totalWaste = totalWaste - (89 * props.Emissions.HouseholdSize)
            }
            if (props.Emissions.Plastic === true) {
                totalWaste = totalWaste - (39 * props.Emissions.HouseholdSize)
            }
            if (props.Emissions.Glass === true) {
                totalWaste = totalWaste - (25 * props.Emissions.HouseholdSize)
            }
            if (props.Emissions.newspaper === true) {
                totalWaste = totalWaste - 119
            }
            if (props.Emissions.magazines === true) {
                totalWaste = totalWaste - 27
            }
            return totalWaste
        }
    }

    const totalEmissions = () => {
        if (props.Emissions === undefined) {
            return null
        } else if (props.Emissions.Vehicles.length <= 0) {
            return 0
        } else {
            let totalEmissions = 0
            totalEmissions = totalEmissions + totalHomeEmissions() + totalWasteEmissions() + totalVehicleEmissions()
            return (Math.round(totalEmissions))
        }
    }

    console.log(props)
    return (
        <div className="shire-wrapper">
            <div className="shire-header">

            </div>
            <div className="shrire-body">
                <h2 className="shire-emissions">{totalEmissions()}</h2>
            </div>
        </div>
    )
}
export default withTracker(() => {
    const emissionsId = sessionStorage.getItem('emissionsId');
    console.log(emissionsId)
    return {
        // Emissions: Emissions.find({}).fetch(),
        Emissions: Emissions.findOne({ _id: emissionsId })
    };
})(Shire);