
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from '../Component/Loading';
import ProductHeader from '../Component/ProductHeader';
import StateDisctrict from '../Component/StateDisctrict';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
import '../style/registration.css'
function RegistrationPage() {
    const [{ user }] = useDataLayerValue()
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
    const registrUser = (e) => {
        e.preventDefault()
        var uid = userAuthData.uid
        firebase.database().ref('users').child(uid).set({ ...formData, userId: uid, phone: userAuthData.phoneNumber }).then(() => {
            Swal.fire("User Registed Successfully!", '', 'success').then(() => { window.location.replace('/profile') })
        })
    }


    if (isLoading === true) {
        return <Loading />
    }
    else { }
    if (userAuthData !== null) {
        if (userData === null) {
            return (
                <>
                    <div className="registration">
                        <form onSubmit={registrUser}>
                            <div id="wrapper">
                                <legend>Registration</legend>
                                <div className="d-flex justify-content-center">
                                    <input required onChange={handleFormChanges} className="inputs-reg" type="text" name="name" id="name" placeholder="Your Name" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <select required name="userType" className="inputs-reg" onChange={handleFormChanges} id="inputState">
                                        <option value="">Select your Type</option>
                                        <option value="consumer">I want to Buy (Consumer)</option>
                                        <option value="farmer">I want to Sell and Buy (Farmer)</option>
                                        <option value="cooperate">I want to Sell and Buy (Seller/ Manufacturer)</option>

                                    </select>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input required onChange={handleFormChanges} className="inputs-reg" type="text" name="address" id="address" placeholder="Address" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input onChange={handleFormChanges} className="inputs-reg" type="email" name="email" id="email" placeholder="Email (optional)" />
                                </div>
                                <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} />
                                <br />
                                <div className="d-flex">
                                    <label for="agree"><input required type="checkbox" name="agree" id="agree" />I agree to the terms and condition mentioned in <a href="">privacy policy and agreement statement</a>.</label>
                                    <br />
                                </div>
                                <input className="inputs-reg" value="Submit" id="submit" type="submit" />
                                <br /><br />
                                <div id="recaptcha-container"></div>

                            </div>
                        </form>
                    </div>
                </>
            )
        }
        else {
            window.location.replace("/home")
        }
    }
    else {
        window.location.replace("/login")
    }
}

export default RegistrationPage