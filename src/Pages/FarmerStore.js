import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ProductHeader from '../Component/ProductHeader'
import { useDataLayerValue } from '../DataLayer/DataLayer'
import firebase from "../firebase"
function FarmerStore() {
  const [{ user, itemToVerify, products }] = useDataLayerValue()
  const navigate = useNavigate()
  const removeItem = (e, id) => {
    switch (e) {
      case "queue":
        firebase.database().ref('item-to-verify').child(id).remove().then(() => {
          Swal.fire("Item remove successfully")
        })
      case "fromStore":
        firebase.database().ref('items').child(id).remove().then(() => {
          Swal.fire("Item remove successfully")
        })
      default:
    }
  }
  if (user.userAuthData === null) {
    navigate("/login")
  }
  else {
    if (user.userData === null) {
      navigate("/register")
    }
    else {
      if (user.userData.userType == "cooperate") {
        const farmerProductsInQueue = []
        itemToVerify.map(
          (item) => {
            if (item.sellerUID === user.userAuthData.uid) {
              farmerProductsInQueue.push({ ...farmerProductsInQueue, item })
            }
          }
        )
        const farmerProductVerified = []
        products.map(
          (item) => {
            if (item.sellerUID === user.userAuthData.uid) {
              farmerProductVerified.push({ ...farmerProductVerified, item })
            }
          }
        )
        const farmerProductRejected = [];
        for (let id in user.userData.item_rejected) {
          farmerProductRejected.push({ id, ...user.userData.item_rejected[id] })
        }

        console.log(farmerProductsInQueue)
        if (user.userData.product_to_sell === undefined) {
          return (
            <>
              <ProductHeader />
              <br />  <br /> <br />
              <div className="container farmer-store">
                <h5>Item In Queue</h5>
                {farmerProductsInQueue.length ? farmerProductsInQueue.map((item, index) => {
                  var item = item.item
                  return (
                    <div className="card products" key={index}>
                      <div className="cart-img">
                        <img className="card-img-top" style={{ width: "100%!important" }} src={item.imgUrl} alt="Card image cap" />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.cropName}</h5>
                        <p className="price">Rs. {item.price}</p>
                        <div className="row">
                          {/* <QualityControl cartId={props.cartId} /> */}
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-xs-2"><button onClick={() => removeItem("queue", item.id)} className="btn remove btn-danger"><i className="fa-solid fa-trash"></i> Remove Item</button></div>
                        </div>
                      </div>
                    </div>
                  )
                })
                  : <h6>No Items in Queue</h6>
                }
                <br /><br />
                <div>
                  <h5>Your Rejected Products </h5>
                  {
                    farmerProductRejected.length ?
                      farmerProductRejected.map((item, index) => {
                        return (
                          <div className="card products" key={index}>
                            <div className="cart-img">
                              <img className="card-img-top" style={{ width: "100%!important" }} src={item.imgUrl} alt="Card image cap" />
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">{item.cropName}</h5>
                              <p className="price">Rs. {item.price}</p>
                              <div className="row">
                                {/* <QualityControl cartId={props.cartId} /> */}
                              </div>
                              <div>
                                <b>Reason:</b>{item.reason === "img" ? "Your img was perfect" : 'You product is over priced'}
                              </div>
                              <br />

                            </div>
                          </div>
                        )
                      })
                      :
                      <h6>No Productes are rejected</h6>
                  }
                </div>
                <br /><br />
                <div className="d-flex add-items justify-content-between">
                  <h5>Your Products For Sell</h5>
                  <Link to={'/coorperate/add-item-to-store'}>
                    <button className="btn-success btn" style={{ margin: "0 !important" }}>
                      <i className="fa-solid fa-plus"></i>
                      Add Item To Sell
                    </button>
                  </Link>
                </div>
                {
                  farmerProductVerified.length ?
                    <div className="card-wrap">
                      {
                        farmerProductVerified.map((item, index) => {
                          var item = item.item
                          return (
                            <div className="card products" key={index}>
                              <div className="cart-img">
                                <img className="card-img-top" style={{ width: "100%!important" }} src={item.imgUrl} alt="Card image cap" />
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="price">Rs. {item.price}</p>
                                <div className="row">
                                  {/* <QualityControl cartId={props.cartId} /> */}
                                </div>
                                <br />
                                {/* <div className="row">
                                  <div className="col-xs-2"><button onClick={() => removeItem("fromStore", item.id)} className="btn remove btn-danger"><i className="fa-solid fa-trash"></i> Remove Item</button></div>
                                </div> */}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    : <div className="no-login-cart">
                      <div className="circle">
                        <i class="fa-solid fa-store"></i>
                      </div>
                      <h3>No Items in your store</h3>
                      <Link to={'/farmer/add-item-to-store'}><button className="btn btn-success">Add Items to Sell</button></Link>
                    </div>
                }

              </div>

            </>
          )
        }
        else {

        }
      }
      else {
        navigate("/home")
      }
    }
  }
}

export default FarmerStore