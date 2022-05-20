
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
    const createCooperateAccount = () => {
        firebase.database().ref('users').child(user.userAuthData.uid).child("cooperateData").set(formData).then(() => {
            Swal.fire("Farmer Profile Created Successfully!", '', 'success').then(() => { window.location.replace('/profile') })
        })
        // console.log(formData)
    }


    if (isLoading === true) {
        return <Loading />
    }
    else { }
    if (userAuthData !== null) {
        if (user.userData !== null) {
            if(user.userData.userType==="cooperate"){
                if (!user.userData.cooprateData) {
                    return (
                        <>
                            <div className="registration">
                                <form>
                                    <div id="wrapper">
                                        <legend>Create Farmer Profile<span className="material-icons">
                                            edit
                                        </span></legend>
                                        <div className="crops">
                                            <div className="d-flex justify-content-center">
                                                <select name="cooperateType" className="inputs-reg" onChange={handleFormChanges} id="inputState">
                                                    <option value="">Select Your type</option>
                                                    <option value="vendors">Vendors</option>
                                                    <option value="manufacturer">Manufacturer</option>
                                                    <option value="FPO">FPO</option>
                                                </select>
                                            </div>
                                        </div>
                                       
    
                                       
                                        {/* <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} /> */}
                                        <br />
                                        <input className="inputs-reg" value="Submit" id="submit" type="button" onClick={createCooperateAccount} />
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

export default CooprateProfileCreate