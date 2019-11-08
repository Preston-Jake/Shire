import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../api/emissions'
import { VictoryPie, VictoryStack, VictoryBar } from 'victory'

// the message their are estimated of 3 trillion trees on the planet 
// shire is target to provoce thought leaders into action 
// the US is responsible C02 emissions is costing over a 1/5 of all tree on this planet 
// from an adult population that only makes up 3% of the worlds population
// 200 Billion 
// for the thought leader in this country we need to carry this message forward 
// that we are sparking the match that will plundge this world into chaos and destruction 
// the horrors of WW1 will not even compare to the destruct if nothing is done 
// it time to put the pin back into the gernade and live at peace as human beings 
// It's time to take action 
// this app is a small step but might provoke some cause for concern
// the breakup of your carbon emissions pie
// the percentage under or over the US population bar 


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
            <div className="shire-body">
                {totalEmissions() > 47399 && <h2 className="shire-emissions-orange">{`${totalEmissions()}lbs C0`}<sub>2</sub></h2>}
                {totalEmissions() < 47399 && <h2 className="shire-emissions-green">{`${totalEmissions()}lbs C0`}<sub>2</sub></h2>}
                <span className="shire-span">per year</span>
                {totalEmissions() > 47399 && <p className="shire-result">{totalEmissions() - 47399}lbs over US National Avg</p>}
                {totalEmissions() < 47399 && <p className="shire-result">{totalEmissions() - 47399}lbs under US National Avg</p>}
                <svg viewBox="0 0 336 336">
                    <VictoryPie
                        standalone={false}
                        width={336} height={336}
                        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                        data={[
                            { x: "Home", y: totalHomeEmissions() },
                            { x: "Vehicle", y: totalVehicleEmissions() },
                            { x: "Waste", y: totalWasteEmissions() }
                        ]}
                        innerRadius={68} labelRadius={100}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                    />

                </svg>
                <span className="shire-info">The US use a quater of the Earth's 3 Trillion Trees</span>
                <span className="shire-info">It takes {Math.round(totalEmissions() / 48)} trees to covert your CO<sub>2</sub> Emissions</span>

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