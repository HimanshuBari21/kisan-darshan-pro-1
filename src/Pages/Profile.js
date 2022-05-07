import '../style/Profile.css'
import ProductHeader from '../Component/ProductHeader';
import firebase from '../firebase'
import { useEffect, useState } from 'react';
import ProfileComon from '../Component/ProfileComon';
import Loading from '../Component/Loading';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import StateDisctrict from '../Component/StateDisctrict';
import StateDisctrictEdit from '../Component/StateDisctrictEdit';
import { Link } from 'react-router-dom';
function Profile() {
    const [{ user }] = useDataLayerValue()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000)
    }, [])


    if (isLoading === true) {
        return <Loading />
    }
    else {
        if (user.userAuthData === null) {
            window.location.replace('/login')
        }
        if (user.userData === null) {
            window.location.replace('/register')
        }
        return (
            <ProfileSec />
        );
    }
}

const ProfileSec = () => {
    const [{ user}] = useDataLayerValue()
    const userData = user.userData
    const farmerData=userData.farmerData
    const [formData, setFormData] = useState({
        address: userData.address,
        district: userData.district,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        state: userData.state,
    })
    let name, value;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const updateProfile = (e) => {
        e.preventDefault()
        firebase.database().ref('users/').child(userData.userId).set({ ...userData, ...formData })
        // console.log({ ...userData, ...formData })
    }
    const objectLength = obj => Object.entries(obj).length
    return (
        <>
            <ProductHeader />

            <form onSubmit={updateProfile} className="container profile-page mt-5 rounded bg-white  mb-5">
                <div className="row">
                    <ProfileComon />
                    <div className="col-md-8">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text">General Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="btn-block"><label className="labels">Name</label>
                                    <input name="name" onChange={handleFormChanges} type="text" className="form-control" placeholder="Name" value={formData.name} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Mobile Number</label>
                                    <input disabled name="phone" onChange={handleFormChanges} type="text" className="form-control" placeholder="" value={formData.phone} />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Address Line</label>
                                    <input name="address" onChange={handleFormChanges} type="text" className="form-control" placeholder="" value={formData.address} />
                                </div>

                                <div className="col-md-12">
                                    <label className="labels">Email ID</label>
                                    <input name="email" onChange={handleFormChanges} type="text" className="form-control" placeholder="" value={formData.email} />
                                </div>
                                <StateDisctrictEdit handleFormChanges={handleFormChanges} formData={formData} />



                                {/* <div className="col-md-12">
                        <label className="labels">Block No.</label>
                        <input onChange={handleFormChanges} type="text" className="form-control" placeholder="" value={userData.pincode} />
                    </div> */}

                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="submit">
                                    Update Profile
                                </button>
                            </div>
                            {
                                userData.farmerData === undefined
                                    ?
                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                        <h1>Make Your profile now </h1>
                                        <Link to="/farmer-profile-create">
                                            <button className="btn btn-success">Make Farmer Profile</button>
                                        </Link>
                                    </div>
                                    :
                                    <>
                                        <div className="my-3" >
                                            <h4>Complete Your farmer profile to unlock your store</h4>
                                            <p className="text-right">You have complited your <b className="text-dark">{(objectLength(userData.farmerData) / 4 * 100).toFixed(1)}%</b> farmer Profile</p>
                                            <div className="progress-bar">
                                                <div style={{ width: `${objectLength(userData.farmerData) / 4 * 100}%` }} className="progress-bar-child"></div>
                                            </div>
                                        </div></>
                            }

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default Profile;