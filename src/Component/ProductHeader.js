import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../style/navbar.css';
import firebase from '../firebase'
import { useDataLayerValue } from '../DataLayer/DataLayer';
function ProductHeader() {
    const [{ category, user, crops }] = useDataLayerValue()
    const userData = user.userData
    const [moreMenuOpen, setMoreMenuOpen] = useState(false)
    const [subMenuOpen, setSubMenuOpen] = useState({
        isOpen: false,
        currentCategory: null
    })
    const objectLength = obj => Object.entries(obj).length
    const closeMoreMenu = (state, category) => {
        setMoreMenuOpen(state)
        if (state === false) {
            setSubMenuOpen({
                currentCategory: null
            })
        }
    }
    const actOnSubMenu = (state, category) => {
        setSubMenuOpen({
            isOpen: state,
            currentCategory: category
        })
    }
    const closeWelcome = () => {
        localStorage.setItem("visited", true)
        console.log(localStorage.getItem("visited"))
        document.querySelector(".kd-index").style.display = "none"
    }
    
    return (
        <>
            {
                localStorage.getItem("visited") === null && <div className="wellcome-screen">
                    <div className='kd-index'>
                        <main>
                            <i onClick={closeWelcome} class="fa-solid fa-xmark"></i>
                            <h1>Welcome to Kishan Darshan</h1>

                            <h2>Kishan Darshan enables farmers to lead the the world of agricultural system. Here investors, markets, consumers, intellectuals & professionals along with government entities interact seamlessly with farming community.</h2>
                        </main>
                    </div>
                </div>
            }
            <nav className="navbar px-4 navbar-expand-lg  justify-content-between navbar-dark bg-dark">
                <a className="navbar-brand" href="/">eKisan Darshan</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse d-lg-flex justify-content-end navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
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
            {user.userData !== null && user.userData.userType === "cooperate" && <div className="ex-nav">
                <nav>

                    {
                        userData.cooperateData && objectLength(userData.cooperateData) !== 0 ?
                            <><Link to="/cooperate/store"><button className="btn btn-success"><i class="fa-solid fa-store"></i> My Store</button></Link></>
                            :
                            <><Link to="/profile"><button className="btn btn-danger"><i class="fa-solid fa-store-slash"></i>Store is locked</button></Link></>

                    }

                </nav>
            </div>}
            <nav className="more-options">
                <button onClick={() => { closeMoreMenu(true) }}>
                    <i class="fa-solid fa-bars"></i> Categories
                </button>
                {
                    moreMenuOpen === true && <div className="animate-fade">
                        <i onClick={() => { closeMoreMenu(false) }} class="fa-solid fa-xmark close-btn"></i>
                        <div className="nav-category navbar-dark ">
                            <div className="nav-item">
                                <Link to="/" className="nav-link">{user.userData !== null && <><i className="fa-solid fa-user"></i> Hello, {user.userData.name}</>}</Link>
                            </div>
                            {
                                category.map((item, index) => {

                                    if (item.categorieName) {
                                        return (
                                            <span className="nav-item" key={index}>
                                                <div onClick={() => { actOnSubMenu(true, item.categorieName) }} className="nav-link text-capitalize" >{item.categorieName}</div>
                                            </span>
                                        )
                                    }
                                }

                                )
                            }
                            {
                                subMenuOpen.currentCategory !== null && <div className="sub-menu-crop">
                                    <div className="nav-link" onClick={() => { actOnSubMenu(false, null) }} ><i className="fa-solid fa-arrow-left"></i> Back</div>

                                    {
                                        crops.map((item, index) => {
                                            if (item.category === subMenuOpen.currentCategory) {
                                                return <div className="nav-link text-capitalize" >{item.cropName}</div>
                                            }
                                        })
                                    }

                                </div>
                            }
                        </div>
                    </div>
                }
            </nav>
        </>
    );
}

export default ProductHeader;