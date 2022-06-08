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
import Swal from 'sweetalert2';
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
    const [{ user }] = useDataLayerValue()
    const userData = user.userData
    const farmerData = userData.farmerData
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
        delete formData.phone
        firebase.database().ref('users/').child(userData.userId).set({ ...userData, ...formData }).then(() => {
            Swal.fire("Your profile has update successfully!", "", "success")
        })
        // console.log({ ...userData, ...formData })
    }
    const objectLength = obj => Object.entries(obj).length

    const ProgressBar = () => {


        if (userData.userType === "farmer") {
            if (userData.farmerData === undefined) {
                return <div className="form-group align-items-center flex-column">
                    <h1>Make Your profile now </h1>
                    <Link to="/create-farmer-profile">
                        <button className="btn btn-success">Make Farmer Profile</button>
                    </Link>
                </div>
            }
            else {
                return <>
                    <div className="my-3" >
                        <h4>Complete Your farmer profile to unlock your store</h4>
                        <p className="text-right">You have complited your <b className="text-dark">{(objectLength(userData.farmerData) / 4 * 100).toFixed(1)}%</b> farmer Profile</p>
                        <div className="progress-bar">
                            <div style={{ width: `${objectLength(userData.farmerData) / 4 * 100}%` }} className="progress-bar-child"></div>
                        </div>
                    </div>
                </>
            }
        }
        else if (userData.userType === "cooperate") {
            if (userData.cooperateData) {
                return <>
                    <div className="my-3 text-center" >
                        <h4>Complete Your profile to unlock your store</h4>
                        <h1>Make Your profile now </h1>
                        <Link to="/create-cooprate-profile" >
                            <button className="btn btn-success">Make Your Profile</button>
                        </Link>
                    </div>
                </>
            }
            else {

                return (
                    <>
                        <div className="my-3 text-center" >
                            <h4>Complete Your profile to unlock your store</h4>
                            {/* <p className="text-right">You have complited your <b className="text-dark">{(objectLength(userData.cooperateData) / 1 * 100).toFixed(1)}%</b> Profile</p>
                            <div className="progress-bar">
                                <div style={{ width: `${objectLength(userData.cooperateData) / 1 * 100}%` }} className="progress-bar-child"></div>
                            </div> */}

                            <Link to="/create-cooprate-profile"><button className="btn btn-success">Create Profile</button></Link>
                        </div>
                    </>
                )
            }
        }

    }
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

                        </div>
                    </div>
                </div>
            </form>
            {/* {userData.userType !== "consumer" && <ProgressBar />} */}
            {
                user.userData.farmerData && <AdvanceProfileSettings />
            }
            {
                userData.userType === "cooperate" && <AdvanceProfileSettingsCO />
            }
        </>
    )
}
const AdvanceProfileSettingsCO = () => {
    const [{ user, crops, category }] = useDataLayerValue()
    const userData = user.userData;
    const [formData, setFormData] = useState([])
    let name, value;
    const userAuthData = user.userAuthData;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const upDataProfile = (e) => {
        const newFormData = {...userData.cooperateData, ...formData}
        e.preventDefault()
        Object.keys(newFormData).map((col) =>{
            if(newFormData[col]===""){
                delete newFormData[col]
            }
        } )
        firebase.database().ref('users').child(user.userAuthData.uid).child("cooperateData").set(newFormData).then(() => {
            Swal.fire("Profile Updated Successfully!", '', 'success').then(() => { window.location.replace('/profile') })
        })
        // console.log(formData)
    } 
    const type = [{
     value: "Manufacturer",
     text: "Manufacturer"
    },
    {
        value: "Seller-Vendors-Distributor",
        text: "Seller/Vendors/Distributor"
    },
    {
        value: "FPO-SHG",
        text: "FPO (Farmer Producer Orgnisation)/SHG (Self Help Group)"
    }]
    if (user.userData.cooperateData===undefined) {
        return <Link to="/create-cooprate-profile"><button className="btn btn-success">fuck Profile</button></Link>
    }
   
    else {
        return (
            <>
                <div className="profile registration">
                    <form onSubmit={upDataProfile}>
                        <div id="wrapper">
                            <legend>Advance Profile</legend>
                            <div>
                                <input onChange={handleFormChanges} defaultValue={userData.cooperateData.name} required className="inputs-reg" type="text" name="name" id="name" placeholder="Company Name" />
                            </div>
                            <select onChange={handleFormChanges} defaultValue={userData.cooperateData.company_type} required className="inputs-reg" name="company_type" id="company-type">
                                {
                                type.map((item, index)=>{
                                    return <option selected={item.value===userData.cooperateData.company_type} value={item.value}>{item.text}</option>
                                })
                                }
                            </select>
                            <div>
                                <input onChange={handleFormChanges} defaultValue={userData.cooperateData.contact_person_name} required className="inputs-reg" type="text" name="contact_person_name" id="contact-person-name"
                                    placeholder="Contact Person Name" />
                            </div>
                            <div>
                                <input onChange={handleFormChanges} defaultValue={userData.cooperateData.contact_person_email} required className="inputs-reg" type="text" name="contact_person_email" id="contact-person-email"
                                    placeholder="Contact Person Email" />
                            </div>
                            <div>
                                <input onChange={handleFormChanges} defaultValue={userData.cooperateData.contact_person_phone} required className="inputs-reg" type="phone " max="9999999999" min="1000000000" maxlength="10" minlength="10" name="contact_person_phone"
                                    id="contact-person-phone" placeholder="Contact Person Phone" />
                            </div>
                            <div>
                                <input onChange={handleFormChanges} defaultValue={userData.cooperateData.address} required className="inputs-reg" type="text" name="address" id="address"
                                    placeholder="Company Address (Please provide full address)" />
                                <br />
                                <div>
                                    <input onChange={handleFormChanges} className="inputs-reg" type="number" name="gst" id="gst" placeholder="GST IN (optional)" />
                                </div>
                                <div>
                                    <input onChange={handleFormChanges} className="inputs-reg" type="number" name="iso" id="iso"
                                        placeholder="ISO Certification Number (optional)" />
                                </div>
                                <div>
                                    <input onChange={handleFormChanges} className="inputs-reg" type="text" name="website" id="website"
                                        placeholder="Company Website (optional)" />
                                </div>

                            </div>



                            {/* <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} /> */}
                            <br />
                            <input className="inputs-reg" value="Submit" id="submit" type="submit" />
                            <br /><br />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
const AdvanceProfileSettings = () => {
    const [{ user, crops, category }] = useDataLayerValue()
    const userData = user.userData;
    const farmerCrops1 = userData.farmerData.crops[0]

    const [formData, setFormData] = useState([
    ])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000)
        setFormData(
            {
                ...farmerCrops1
            }
        )
    }, [])

    let name, value;
    const userAuthData = user.userAuthData;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const updateFarmerData = (e) => {
        e.preventDefault()

        var uid = userAuthData.uid
        var farmerData = {
            ...formData, crops: [{
                cropName: formData.cropName,
                cropType: formData.cropType,
                dateOfSowing: formData.dateOfSowing,
                fieldArea: formData.fieldArea,
                fieldSizeUnit: formData.fieldSizeUnit
            }],

        }

        delete farmerData.cropName
        delete farmerData.cropType
        delete farmerData.dateOfSowing
        delete farmerData.fieldArea
        delete farmerData.fieldSizeUnit
        // console.log({ ...userData.farmerData, ...farmerData })
        firebase.database().ref('users').child(uid).child("farmerData").set({ ...userData.farmerData, ...farmerData }).then(() => {
            Swal.fire("Farmer Profile Updated Successfully!", '', 'success')
        })
    }


    if (userData.userType === "farmer") {

        if (isLoading === true) {
            return <Loading />
        }
        else {

            if (user.userData.farmerData) {

                return (
                    <form onSubmit={updateFarmerData}>
                        <div className="container">

                            <div className="crops">
                                <h3>Crops</h3>
                                <div className="form-group">
                                    <select name="cropType" className="form-control" onChange={handleFormChanges} id="inputState">
                                        {
                                            category.map((item, index) => {
                                                if (item.categorieName == farmerCrops1.cropType) {
                                                    return <>
                                                        <option selected={true} value={item.categorieName}>{item.categorieName}</option>
                                                    </>
                                                }
                                                else {
                                                    return <option value={item.categorieName}>{item.categorieName}</option>
                                                }

                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <select name="cropName" className="form-control"
                                    onChange={handleFormChanges} id="inputState">
                                    {
                                        crops.map((item, index) => {

                                            if (item.category === formData.cropType) {
                                                if (item.cropName == farmerCrops1.cropName) {
                                                    return <>
                                                        <option selected={true} value={item.cropName}>{item.cropName}</option>
                                                    </>
                                                }
                                                else {
                                                    return <option value={item.cropName}>{item.cropName}</option>
                                                }
                                            }

                                        })
                                    }
                                </select>
                            </div>
                            <h5>
                                Date of Sowing
                            </h5>
                            <div className="form-group">
                                <input defaultValue={farmerCrops1.dateOfSowing} onChange={handleFormChanges} className="form-control" type="date" name="dateOfSowing" id="dateOfSowing" placeholder="Date of sowing" />
                            </div>
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="form-group">
                                        <input defaultValue={farmerCrops1.fieldArea} required onChange={handleFormChanges} className="form-control" type="number" name="fieldArea" placeholder="Are of your farm" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <select name="fieldSizeUnit" className="form-control"
                                            onChange={handleFormChanges} id="inputState">
                                            <option selected={farmerCrops1.fieldSizeUnit === "hectare" ? true : false} value="hectare">Hectare</option>
                                            <option selected={farmerCrops1.fieldSizeUnit === "acre" ? true : false} value="acre">Acre</option>
                                            <option selected={farmerCrops1.fieldSizeUnit === "bigha" ? true : false} value="bigha">Bigha</option>
                                            <option selected={farmerCrops1.fieldSizeUnit === "katta" ? true : false} value="katta">Katta</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <h4 className='mr-4'>
                                    Do you have KCC
                                </h4>
                                <input onChange={handleFormChanges} type="radio" defaultChecked={userData.farmerData.kcc === "yes" ? true : false} id="kcc_yes" name="kcc" value={"yes"} /><label htmlFor="kcc_yes">Yes</label>
                                <input onChange={handleFormChanges} type="radio" defaultChecked={userData.farmerData.kcc === "no" ? true : false} id="kcc_no" name="kcc" value={"no"} /><label htmlFor="kcc_no">No</label>
                            </div>
                            <div className="d-flex">
                                <h4 className='mr-4'>
                                    Do you have Crop Insurance
                                </h4>
                                <input defaultValue={userData.cooperateData.name} required onChange={handleFormChanges} type="radio" id="crop_insurance_yes" defaultChecked={userData.farmerData.cropInsurance === "yes" ? true : false} name="cropInsurance" value={"yes"} /><label htmlFor="crop_insurance_yes">Yes</label>
                                <input defaultValue={userData.cooperateData.name} required onChange={handleFormChanges} type="radio" id="crop_insurance_no" defaultChecked={userData.farmerData.cropInsurance === "no" ? true : false} name="cropInsurance" value={"no"} /><label htmlFor="crop_insurance_no">No</label>
                            </div>
                            <div className="d-flex">
                                <h4 className='mr-4'>
                                    Do you use chemical fertilizers?
                                </h4>
                                <input defaultValue={userData.cooperateData.name} required onChange={handleFormChanges} defaultChecked={userData.farmerData.chemicalFertilizers === "yes" ? true : false} type="radio" id="chemical_fertilizer_yes" name="chemicalFertilizers" value={"yes"} /><label htmlFor="chemical_fertilizer_yes">Yes</label>
                                <input defaultValue={userData.cooperateData.name} required onChange={handleFormChanges} defaultChecked={userData.farmerData.chemicalFertilizers === "no" ? true : false} type="radio" id="chemical_fertilizer_no" name="chemicalFertilizers" value={"no"} /><label htmlFor="chemical_fertilizer_no">No</label>
                            </div>
                            {/* <StateDisctrict formData={formData} handleFormChanges={handleFormChanges} /> */}
                            <br />
                            <input className="form-control" value="Submit" id="submit" type="submit" />
                            <br /><br />
                            <div id="recaptcha-container"></div>

                        </div>
                    </form>
                )
            }
            else {
                window.location.replace("/create-farmer-profile")
            }
        }
    }
    else {
        return ("")
    }
}
export default Profile;