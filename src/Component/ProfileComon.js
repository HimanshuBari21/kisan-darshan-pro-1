import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserDataProvider } from '../App'
import { useDataLayerValue } from '../DataLayer/DataLayer'
import firebase from '../firebase'
const firestore = firebase.firestore()
function ProfileComon() {
    const [{ user }] = useDataLayerValue()
    const userData = user.userData
    return (
        <div className="col-md-4">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="mb-5 rounded-circle" width="150px" src="https://www.coverallweb.in/images/team1.jpg" />
                <span className="font-weight-bold text-capitalize">{userData.name}</span>
                <span className="text-black-50"> <a href="tel:+91 8849959488">{userData.phone}</a> </span>
                <span className="text-black-50"> <a href="mailto:himanshubari789@mail.com">{userData.email}</a> </span>
            </div>
            <br />

            <div className="d-flex flex-wrap justify-content-center">
                <NavLink className="btn profile-nav-btn btn-primary" to="/profile">Profile</NavLink>
                <NavLink className="btn profile-nav-btn btn-primary" to="/orders">My Orders</NavLink>
            </div>
        </div>
    )



}

export default ProfileComon