import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from '../Component/ProductHeader'
import { useDataLayerValue } from '../DataLayer/DataLayer'
import '../style/placeOrder.css'
import firebase from '../firebase'
import Swal from 'sweetalert2'
import Loading from '../Component/Loading'
const QualityControl = (props) => {
  const [{ user }, dispatch] = useDataLayerValue()
  const [currentQuantity, setCurrentQuantity] = useState(props.cartId.quantity)
  const increase = () => {
    setCurrentQuantity(currentQuantity + 1)
    firebase.database().ref('users/').child(user.userAuthData.uid).child('cart').child(props.cartId.id).set({ ...props.cartId, quantity: currentQuantity + 1 })
  }
  const deleteItem = () => {

    const ItemRef = firebase.database().ref('users/').child(user.userAuthData.uid).child('cart').child(props.cartId.id);
    ItemRef.remove().then(() => {
      Swal.fire(
        'Deleted Successfull',
        "",
        'success'
      )

    }).catch((error) => { console.log(error) })
  }
  const decrease = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1)
      firebase.database().ref('users/').child(user.userAuthData.uid).child('cart').child(props.cartId.id).set({ ...props.cartId, quantity: currentQuantity - 1 })
    }
  }
  return (
    <div className="d-flex">
      <div className="quantity-control" style={{ width: 150 }}>
        <button onClick={decrease} className="btn btn-primery">
          -
        </button>
        <input type="number" value={currentQuantity} onChange={e => setCurrentQuantity(e.target.value)} maxLength={2} />
        <button onClick={increase} className="btn btn-primery">
          +
        </button>
      </div>
      <button className="btn btn-danger" onClick={deleteItem}><i className="fa fa-trash-can"></i></button>
    </div>
  )
}

function PlaceOrder() {
  const [{ user, products }] = useDataLayerValue()
  const navigate = useNavigate()
  const data = useLocation()
  // const rawCartData = data.state.cartData;
  // const cartTotalPrice = data.state.cartTotalPrice
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 2500)
  }, [])
  if (isLoading === true) {
    return <Loading />
  }
  else {
    if(user.userData===null || user.userAuthData===null){
      window.location.replace("/home")
    }
    var userCartData = user.userData.cart
    var rawCartData = [];
    for (let id in userCartData) {
      rawCartData.push({ id, ...userCartData[id] })
    }
    var TEMP_TOTAL_ARR = []
    rawCartData.map((item) => {
      products.map((product, index) => {
        if (item.itemId === product.id) {
          TEMP_TOTAL_ARR.push({ ...product, price: parseFloat(product.price), itemQuantity: parseInt(item.quantity), itemId: item.id })
        }
      })
    })
    var cartTotalPrice = 0;
    for (let i in TEMP_TOTAL_ARR) {

      cartTotalPrice = cartTotalPrice + (TEMP_TOTAL_ARR[i].price * TEMP_TOTAL_ARR[i].itemQuantity)
    }
    const proceedOrder = () => {
      const tempArr = []
      rawCartData.map((item) => {
        tempArr.push({ ...item, userId: user.userAuthData.uid, timeStamp: Date.now() })
      })
      tempArr.map((item) => {
        firebase.database().ref("orders/").push(item)
        firebase.database().ref("users/").child(user.userAuthData.uid).child("orders").push(item)
      })
      Swal.fire("Order placed successfully", "", "success").then(window.location.replace("/home"))

    }
    return (
      <>
        <ProductHeader />
        <div className="container mt-5 pt-4">
          <div>
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6">
                    <h3>Shipping Address <Link to="/profile">Change</Link></h3>
                    <p>
                      {user.userData.name} <br />
                      {user.userData.address} <br />
                      {user.userData.district}, {user.userData.state}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    Payment method <Link to="/">Change</Link>: <br />
                    Pay on delivery (Cash/Card)
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex justify-content-center flex-column">
                <button onClick={proceedOrder} className="btn-success btn">Place Your Order</button>
                <h5>Order Summary</h5>
                <table>
                  <tr>
                    <td>Items</td>
                    <td style={{ textAlign: 'right' }}>&#8377;{cartTotalPrice}</td>
                  </tr>
                  <tr>
                    <td>Tax (18% GST)</td>
                    <td style={{ textAlign: 'right' }}>&#8377;{(cartTotalPrice * (18 / 100)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Grand Total</td>
                    <td style={{ textAlign: 'right' }}>&#8377;{cartTotalPrice + cartTotalPrice * (18 / 100)}</td>
                  </tr>
                </table>
              </div>

            </div>
            <div className="row">
              <div className="col-lg-8">
                {

                  rawCartData.map((item, index1) => {
                    return (
                      <>
                        {
                          products.map((product, index) => {
                            if (item.itemId === product.id) {
                              return (
                                <div className="row">
                                  <div className="col-3">
                                    <img src={product.imgUrl} className="img-fluid" alt="" />
                                  </div>
                                  <div className="col-lg-6">
                                    <h5>{product.name}</h5>
                                    <h5>&#8377;{product.price}</h5>
                                    <QualityControl cartId={item} />

                                  </div>
                                </div>
                              )
                            }
                            else {
                              return ""
                            }
                          })
                        }
                      </>
                    )
                  })

                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PlaceOrder 