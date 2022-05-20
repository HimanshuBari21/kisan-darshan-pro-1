
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from '../Component/Loading';
import ProductHeader from '../Component/ProductHeader';
import StateDisctrict from '../Component/StateDisctrict';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
import '../style/registration.css'
function FarmerDataForm() {
    const [{ user, crops, category }] = useDataLayerValue()
    const [formData, setFormData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000)
    }, [])

    let name, value;
    const userData = user.userData;
    const userAuthData = user.userAuthData;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const createFarmerAccount = () => {
        var uid = userAuthData.uid
        var farmerData = {
            ...formData, crops: [{
                cropName: formData.cropName,
                cropType: formData.cropType,
                dateOfSowing: formData.dateOfSowing,
                fieldArea: formData.fieldArea,
                fieldSizeUnit: formData.fieldSizeUnit
            }]
        }

        delete farmerData.cropName
        delete farmerData.cropType
        delete farmerData.dateOfSowing
        delete farmerData.fieldArea
        delete farmerData.fieldSizeUnit
        console.log(farmerData)
        firebase.database().ref('users').child(uid).child("farmerData").set(farmerData).then(() => {
            Swal.fire("Farmer Profile Created Successfully!", '', 'success').then(() => { window.location.replace('/profile') })
        })
    }


    if (isLoading === true) {
        return <Loading />
    }
    else { }
    if (userAuthData !== null) {
        if (user.userData !== null) {
            if (user.userData.userType === "farmer") {
                if (!user.userData.farmerData) {
                    return (
                        <>
                            <div className="registration">
                                <form>
                                    <div id="wrapper">
                                        <legend>Create Farmer Profile<span className="material-icons">
                                            edit
                                        </span></legend>
                                        <div className="crops">
                                            <h3>Crops</h3>
                                            <div className="d-flex justify-content-center">
                                                <select name="cropType" className="inputs-reg" onChange={handleFormChanges} id="inputState">
                                                    <option value="">Which Type Crop you grow</option>
                                                    {
                                                        category.map((item, index) => {
                                                            return <>
                                                                <option value={item.categorieName}>{item.categorieName}</option>
                                                            </>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <select name="cropName" className="inputs-reg"
                                                disabled={formData.cropType === undefined || formData.cropType === "" ? true : false}
                                                onChange={handleFormChanges} id="inputState">
                                                <option value="">Which Crop you grow</option>
                                                {
                                                    crops.map((item, index) => {
                                                        if (item.category === formData.cropType) {
                                                            return <>
                                                                <option value={item.cropName}>{item.cropName}</option>
                                                            </>
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <h5>
                                            Date of Sowing
                                        </h5>
                                        <div className="d-flex justify-content-center">
                                            <input required onChange={handleFormChanges} className="inputs-reg" type="date" name="dateOfSowing" placeholder="Date of sowing" />
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-9">
                                                <div className="d-flex justify-content-center">
                                                    <input required onChange={handleFormChanges} className="inputs-reg" type="number" name="fieldArea" placeholder="Are of your farm" />
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="d-flex justify-content-center">
                                                    <select name="fieldSizeUnit" className="inputs-reg"
                                                        disabled={formData.cropType === undefined || formData.cropType === "" ? true : false}
                                                        onChange={handleFormChanges} id="inputState">
                                                        <option value="">Unit of Messurement line acre, hactor</option>
                                                        Hectare/acre//Katta
                                                        <option value="hectare">Hectare</option>
                                                        <option value="acre">Acre</option>
                                                        <option value="bigha">Bigha</option>
                                                        <option value="katta">Katta</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <h4 className='mr-4'>
                                                Do you have KCC
                                            </h4>
                                            <input onChange={handleFormChanges} type="radio" id="kcc_yes" name="kcc" value={"yes"} /><label htmlFor="kcc_yes">Yes</label>
                                            <input onChange={handleFormChanges} type="radio" id="kcc_no" name="kcc" value={"no"} /><label htmlFor="kcc_no">No</label>
                                        </div>
                                        <div className="d-flex">
                                            <h4 className='mr-4'>
                                                Do you have Crop Insurance
                                            </h4>
                                            <input onChange={handleFormChanges} type="radio" id="crop_insurance_yes" name="cropInsurance" value={"yes"} /><label htmlFor="crop_insurance_yes">Yes</label>
                                            <input onChange={handleFormChanges} type="radio" id="crop_insurance_no" name="cropInsurance" value={"no"} /><label htmlFor="crop_insurance_no">No</label>
                                        </div>
                                        <div className="d-flex">
                                            <h4 className='mr-4'>
                                                Do you use chemical fertilizers?
                                            </h4>
                                            <input onChange={handleFormChanges} type="radio" id="chemical_fertilizer_yes" name="chemicalFertilizers" value={"yes"} /><label htmlFor="chemical_fertilizer_yes">Yes</label>
                                            <input onChange={handleFormChanges} type="radio" id="chemical_fertilizer_no" name="chemicalFertilizers" value={"no"} /><label htmlFor="chemical_fertilizer_no">No</label>
                                        </div>
                                        {/* <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} /> */}
                                        <br />
                                        <input className="inputs-reg" value="Submit" id="submit" type="button" onClick={createFarmerAccount} />
                                        <br /><br />
                                        <div id="recaptcha-container"></div>

                                    </div>
                                </form>
                            </div>
                        </>
                    )
                }
                else {
                    window.location.replace("/profile")
                }
            }
            else{
                window.location.replace("/")
            }
        }
        else {
            window.location.replace("/home")
        }
    }
    else {
        window.location.replace("/login")
    }
}

export default FarmerDataForm