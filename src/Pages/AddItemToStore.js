import React, { useState } from 'react'
import firebase from '../firebase';
import Swal from 'sweetalert2';
import StateDisctrict from '../Component/StateDisctrict';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import ProductHeader from '../Component/ProductHeader';
function AddItemToStore() {
    const [{ user, category, crops }] = useDataLayerValue()
    const [itemDetail, setItemDetail] = useState({
    })

    let name, value;
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        setItemDetail({ ...itemDetail, [name]: value });
    }
    const imgExtRemover = () => {
        var fileName = itemDetail.item_image.name;
        return fileName.split('.').pop()
    }


    const addItemInQueue = (e) => {
        e.preventDefault()
        var TIME_STEMP = Date.now()
        // console.log(itemDetail)
        firebase.storage().ref("items/").child(`${TIME_STEMP}.${imgExtRemover()}`).put(itemDetail.item_image, () => {
        }).then(() => {
            firebase.storage().ref('/items').child(`${TIME_STEMP}.${imgExtRemover()}`).getDownloadURL().then((event) => {
                delete itemDetail.item_image

                firebase.database().ref('item-to-verify').push({ ...itemDetail, imgUrl: event, sellerUID: user.userAuthData.uid, timeStamp: TIME_STEMP }).then(() => {
                    Swal.fire("Item Registerd Successfully!", '', 'success')
                })
            })
        })
    }
    return (
        <>
            <ProductHeader />
            <div className="container mt-5">
                <br /> <br />
                <form className="my-4" action="" onSubmit={addItemInQueue}>
                    <label className="form-label">Category</label>
                    <select onChange={handleFormChanges} className="form-control" name="category" id="">
                        <option value="">Select Category</option>
                        {
                            category.map((item, index) => {
                                return (
                                    <option key={index} value={item.categorieName}>{item.categorieName}</option>
                                )
                            })
                        }
                    </select>
                    <div className="form-group my-4">
                        <label className="form-label">Item Name</label>
                        <select name="cropName" className="inputs-reg"
                            disabled={itemDetail.category === undefined || itemDetail.category === "" ? true : false}
                            onChange={handleFormChanges} id="inputState">
                            <option value="">Item Name</option>
                            {
                                crops.map((item, index) => {
                                    if (item.category === itemDetail.category) {
                                        return <>
                                            <option value={item.cropName}>{item.cropName}</option>
                                        </>
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6 my-4">
                            <label className="form-label">Price</label>
                            <input onChange={handleFormChanges}
                                required
                                className="form-control" name="price" type="number" placeholder="Enter Item Price" />
                        </div>
                        <div className="form-group col-lg-6 my-4">
                            <label className="form-label">Unit</label>
                            <select name="unit" className="form-control" onChange={handleFormChanges} >
                                <option value="kg">KG</option>
                                <option value="quintal">quintal</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group my-4">
                        <label className="form-label">Available Quantity for sell</label>
                        <input onChange={handleFormChanges}
                            required
                            className="form-control" name="quantity" type="number" />
                    </div>
                    <h5>Is this product is oraganic?</h5>
                    <input type="radio" onChange={handleFormChanges} class="form-check-input" id="Yes" name="organic" value="yes" />
                    <label class="form-check-label" for="Yes"> Yes </label>


                    <input type="radio" onChange={handleFormChanges} class="form-check-input" id="No" name="organic" value="no" />
                    <label class="form-check-label" for="No"> No</label>
                    {
                        itemDetail.organic === "yes" &&
                        <div className="form-group my-4">
                            <label className="form-label">Your Organic Certificate No.</label>
                            <input onChange={handleFormChanges}
                                required
                                className="form-control" name="certificateNo" type="number" />
                        </div>
                    }
                    <div className="form-group my-4">
                        <label className="form-label">Item Image</label>
                        <input onChange={(e) => { setItemDetail({ ...itemDetail, item_image: e.target.files[0] }) }}
                            required
                            className="form-control" name="item_image" type="file" />
                    </div>


                    <button className="btn  btn-success" type="submit"  >Add Item <i className="fa fa-upload"></i></button>

                </form>
            </div>
        </>
    )
}

export default AddItemToStore