
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from '../Component/Loading';
import ProductHeader from '../Component/ProductHeader';
import StateDisctrict from '../Component/StateDisctrict';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
import '../style/registration.css'
function CooprateProfileCreate() {
    const [{ user, crops, category }] = useDataLayerValue()
    const [formData, setFormData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(user.userData.cooperateData)
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
    const createCooperateAccount = (e) => {
        e.preventDefault()
        firebase.database().ref('users').child(user.userAuthData.uid).child("cooperateData").set(formData).then(() => {
            Swal.fire("Profile Created Successfully!", '', 'success').then(() => { window.location.replace('/profile') })
        })
        // console.log(formData)
    }


    if (isLoading === true) {
        return <Loading />
    }
    else { }
    if (userAuthData !== null) {
        if (user.userData !== null) {
            if (user.userData.userType === "cooperate") {
                if (user.userData.cooperateData===undefined) {
                    return (
                        <>
                            <div className="registration">
                                <form onSubmit={createCooperateAccount}>
                                    <div id="wrapper">
                                        <legend>Complete Profile</legend>
                                        <div>
                                            <input onChange={handleFormChanges} required className="inputs-reg" type="text" name="name" id="name" placeholder="Company Name" />
                                        </div>
                                        <select onChange={handleFormChanges} required className="inputs-reg" name="company_type" id="company-type">
                                                <option value="">Company Type</option>
                                                <option value="Manufacturer">Manufacturer</option>
                                                <option value="Seller-Vendors-Distributor">Seller/Vendors/Distributor</option>
                                                <option value="FPO-SHG">FPO (Farmer Producer Orgnisation)/SHG (Self Help Group)</option>
                                            </select>
                                        <div>
                                            <input onChange={handleFormChanges} required className="inputs-reg" type="text" name="contact_person_name" id="contact-person-name"
                                                placeholder="Contact Person Name" />
                                        </div>
                                        <div>
                                            <input onChange={handleFormChanges} required  className="inputs-reg" type="text" name="contact_person_email" id="contact-person-email"
                                                placeholder="Contact Person Email" />
                                        </div>
                                        <div>
                                            <input onChange={handleFormChanges} required className="inputs-reg" type="phone " max="9999999999" min="1000000000" maxlength="10" minlength="10" name="contact_person_phone"
                                                id="contact-person-phone" placeholder="Contact Person Phone" />
                                        </div>
                                        <div>
                                            <input onChange={handleFormChanges} required className="inputs-reg" type="text" name="address" id="address"
                                                placeholder="Company Address (Please provide full address)" />
                                            <br />
                                            <div>
                                                <input onChange={handleFormChanges} className="inputs-reg" type="number" name="gst" id="gst" placeholder="GST IN (optional)" />
                                            </div>
                                            <div>
                                                <input onChange={handleFormChanges}  className="inputs-reg" type="number" name="iso" id="iso"
                                                    placeholder="ISO Certification Number (optional)" />
                                            </div>
                                            <div>
                                                <input onChange={handleFormChanges} className="inputs-reg" type="text" name="website" id="website"
                                                    placeholder="Company Website (optional)" />
                                            </div>

                                        </div>

                                        <div>
                                            <input type="checkbox" name="agree" id="agree" required />
                                            <label for="agree">I agree to the terms and condition mentioned in privacy policy and agreement statement</label>
                                            <br />
                                        </div>



                                        {/* <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} /> */}
                                        <br />
                                        <input className="inputs-reg" value="Submit" id="submit" type="submit"  />
                                        <br /><br />
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
            else {
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

export default CooprateProfileCreate