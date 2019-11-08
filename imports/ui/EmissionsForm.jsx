import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
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
            Magazine,
        }, function (err, id) {
            if (err) {
                return err
            }
            if (id) {
                sessionStorage.setItem('emissionsId', id)
                location = '/shire'
            }
        })
    }

    const [HouseholdSize, setHouseholdSize] = useState(0);
    const [Electric, setElectric] = useState(0);
    const [NaturalGas, setNaturalGas] = useState(0);
    const [Propane, setPropane] = useState(0);
    const [FuelOil, setFuelOil] = useState(0);

    const [Vehicles, setVehicles] = useState([]);
    const handleVehicleMPG = (e, idx) => {
        let vehicle = [...Vehicles][idx]
        vehicle.mpg = parseInt(e.target.value);
        [...Vehicles].splice(idx, 0, vehicle)
    }
    const handleVehicleMPW = (e, idx) => {
        let vehicle = [...Vehicles][idx]
        vehicle.mpw = parseInt(e.target.value);
        [...Vehicles].splice(idx, 0, vehicle)
    }

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
                        <input className="input-orange home-input" type="number" placeholder="Household size" required={true} onChange={(e) => setHouseholdSize(parseInt(e.target.value))} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Electric" required={true} onChange={(e) => setElectric(parseInt(e.target.value))} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Natural Gas" required={true} onChange={(e) => setNaturalGas(parseInt(e.target.value))} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Propane" required={true} onChange={(e) => setPropane(parseInt(e.target.value))} />
                        <input className="input-orange home-input" type="number" placeholder="Avg. $/Monthly: Fuel Oil" required={true} onChange={(e) => setFuelOil(parseInt(e.target.value))} />
                    </fieldset>
                    <fieldset className="emissions-field" name="vehicles">
                        <h3>Vehicle</h3>
                        <div className="vehicle-btn-wrapper">
                            <button className="btn-hz-green" onClick={(e) => addVehicle(e)}>ADD VEHICLE</button>

                        </div>

                        {Vehicles.map((val, idx) => {
                            return (
                                <fieldset className="vehicle-field" key={idx}>
                                    <p className="vehicle-label">{`Vehicle ${idx + 1}`}</p>
                                    <input className="input-orange" type="number" name="mpg" placeholder="avg. Miles Per Gallon" onChange={(e) => handleVehicleMPG(e, idx)} />
                                    <input className="input-orange" type="number" name="mpw" placeholder="avg. Miles Per Week" onChange={(e) => handleVehicleMPW(e, idx)} />
                                </fieldset>
                            )
                        })}
                        {Vehicles.length > 0 && <button className="btn-hz-orange" onClick={(e) => { removeVehicle(e) }}>REMOVE</button>}
                    </fieldset>
                    <fieldset className="emissions-field" name="waste">
                        <h3>Waste</h3>
                        <p className="waste-info">Check off your recycling*</p>
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
                            <span className="checkbox-title">Magazine</span>
                        </label>
                    </fieldset>
                    <button className="btn-hz-green" onClick={handleSubmit}>Shire</button>
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