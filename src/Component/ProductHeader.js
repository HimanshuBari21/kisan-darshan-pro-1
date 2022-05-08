import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style/navbar.css';
import firebase from '../firebase'
import { useDataLayerValue } from '../DataLayer/DataLayer';
function ProductHeader() {
    const [{ category, user }] = useDataLayerValue()
    const userData = user.userData

    const objectLength = obj => Object.entries(obj).length

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">eKisan Darshan</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-expanded="false">
                                Categories
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                {
                                    category.map((item, index) => {

                                        if (item.categorieName) {
                                            return (
                                                <span key={index}>
                                                    <NavLink className="dropdown-item" to={`/store/${(item.categorieName).toLowerCase()}`}>{item.categorieName}</NavLink>
                                                </span>
                                            )
                                        }
                                    }

                                    )
                                }
                            </div>
                        </li>
                       
                        <li className="nav-item">
                            {
                                <NavLink className="nav-link" to="/cart"><i className="fa fa-shopping-cart"></i> Cart</NavLink>
                            }
                        </li>

                        <li className="nav-item">
                            {user.userAuthData === null ?
                                ""
                                :
                                <NavLink className="nav-link" to="/profile"><i className="fa fa-user"></i> Profile</NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                user.userAuthData === null ?
                                    <div className="nav-link" style={{ cursor: "pointer" }} onClick={() => { window.location.replace('/login') }} >
                                        Login
                                    </div>
                                    : <div className="nav-link" style={{ cursor: "pointer" }} onClick={() => { firebase.auth().signOut().then(() => { window.location.reload() }) }} >
                                        Sign Out
                                    </div>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
            {user.userData !== null && user.userData.userType === "farmer" && <div className="ex-nav">
                <nav>

                    {
                        userData.farmerData && objectLength(userData.farmerData) !== 0 ?
                            <><Link to="/farmer/store"><button className="btn btn-success"><i class="fa-solid fa-store"></i> My Store</button></Link></>
                            :
                            <><Link to="/profile"><button className="btn btn-danger"><i class="fa-solid fa-store-slash"></i>Store is locked</button></Link></>

                    }

                </nav>
            </div>}

        </>
    );
}

export default ProductHeader;