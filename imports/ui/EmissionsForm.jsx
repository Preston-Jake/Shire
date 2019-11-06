import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../api/emissions'

const EmissionsForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Emissions.insert({
            HouseholdSize,
            Electric,
            NaturalGas,
            Propane,
            FuelOil,
            Vehicles,
            Plastic,
            Aluminium,
            Glass,
            Newspaper,
            Magazine
        })
    }

    const [HouseholdSize, setHouseholdSize] = useState(0);
    const [Electric, setElectric] = useState(0);
    const [NaturalGas, setNaturalGas] = useState(0);
    const [Propane, setPropane] = useState(0);
    const [FuelOil, setFuelOil] = useState(0);

    const [Vehicles, setVehicles] = useState([]);

    const [Plastic, setPlastic] = useState(false);
    const [Aluminium, setAluminium] = useState(false);
    const [Glass, setGlass] = useState(false)
    const [Newspaper, setNewspaper] = useState(false);
    const [Magazine, setMagazine] = useState(false);


    const addVehicle = (e) => {
        e.preventDefault()
        setVehicles([...Vehicles, { mpg: 0, mpw: 0 }])
    }

    const removeVehicle = (e, idx) => {
        e.preventDefault();
        const temp = [...Vehicles];
        temp.pop()
        setVehicles(temp)
    }


    return (
        <div className="emissions-wrapper">
            <div className="emissions-header">
                <h1 className="emissions-title">Shire</h1>
                <img className="emissions-logo" src="../../images/shire.png" alt="shire-logo" />
            </div>
            <h2 className="emissions-subtitle">Looking Behind</h2>
            <p className="emissions-nar">To move forward we need to see where we have been. Submiting this form will give you a baseline of your yearly C0<sub>2</sub> emssions</p>
            <div className="emissions-body">
                <form className="emissions-form">
                    <fieldset className="emissions-field" name="home">
                        <h3>Home</h3>
                        <input className="input-orange home-input" type="number" placeholder="Household size" required={true} onChange={(e) => setHouseholdSize(e.target.value)} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Electric" required={true} onChange={(e) => setElectric(e.target.value)} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Natural Gas" required={true} onChange={(e) => setNaturalGas(e.target.value)} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Propane" required={true} onChange={(e) => setPropane(e.target.value)} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Fuel Oil" required={true} onChange={(e) => setFuelOil(e.target.value)} />
                    </fieldset>
                    <fieldset className="emissions-field" name="vehicles">
                        <h3>Vehicle</h3>
                        <div className="vehicle-btn-wrapper">
                            <button className="btn-lg-green" onClick={(e) => addVehicle(e)}>Add Vehicle</button>
                            {Vehicles.length > 0 && <button className="btn-lg-orange" onClick={(e) => { removeVehicle(e) }}>Remove</button>}
                        </div>

                        {Vehicles.map((val, idx) => {
                            return (
                                <fieldset className="vehicle-field" key={idx}>
                                    <p className="vehicle-label">{`Vehicle ${idx + 1}`}</p>
                                    <input className="input-orange" type="number" name="mpg" placeholder="avg. Miles Per Gallon" />
                                    <input className="input-orange" type="number" name="mpw" placeholder="avg. Miles Per Week" />
                                </fieldset>
                            )
                        })}
                    </fieldset>
                    <fieldset className="emissions-field" name="waste">
                        <h3>Waste</h3>
                        <p className="waste-info">Check off your recycle</p>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={Plastic} onChange={() => { setPlastic(!Plastic) }} />
                            <span className="checkbox-title">Plastic</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={Glass} onChange={() => { setGlass(!Glass) }} />
                            <span className="checkbox-title">Glass</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={Aluminium} onChange={() => { setAluminium(!Aluminium) }} />
                            <span className="checkbox-title">Aluminium</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={Newspaper} onChange={() => { setNewspaper(!Newspaper) }} />
                            <span className="checkbox-title">Newspaper</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" checked={Magazine} onChange={() => { setMagazine(!Magazine) }} />
                            <span className="checkbox-title" s>Magazine</span>
                        </label>
                    </fieldset>
                    <button className="btn-hz-green" onClick={handleSubmit}>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default withTracker(() => {
    return {
        Emissions: Emissions.find({}).fetch(),
    };
})(EmissionsForm);