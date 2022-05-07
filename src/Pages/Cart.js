import ProductHeader from '../Component/ProductHeader';
import '../style/products.css';
import "../style/Cart.css";
import { useState, useEffect } from "react";
import firebase from "../firebase";
import { useDataLayerValue } from "../DataLayer/DataLayer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Component/Loading";
import emptyCart from '../assets/images/emptyCart.svg'
function Cart() {
    const [{ user }, dispatch] = useDataLayerValue()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => { setIsLoading(false) }, 2000)
    }, [])

    if (isLoading === true) {
        return <Loading />
    }
    else {
        if (user.userAuthData === null) {
            return (
                <>
                    <ProductHeader />
                    <div className="no-login-cart">
                        <div className="circle">
                            <i className="fa fa-arrow-right-to-bracket"></i>
                        </div>
                        <h3>Please Login to see cart</h3>
                        <Link to={'/login'}><button className="btn btn-success">Login <i className="fa fa-arrow-right-to-bracket"></i></button></Link>
                    </div>
                </>
            )
        }
        else {
            if (user.userData !== null) {
                return <>
                    <UserCartComp />
                </>
            }
            else {
                return (
                    <>
                        <ProductHeader />
                        <div className="no-login-cart">
                            <div className="circle">
                                <i className="fa fa-user"></i>
                            </div>
                            <h3>Please Register to see cart</h3>
                            <Link to={'/register'}><button className="btn btn-success">Register</button></Link>
                        </div>
                    </>
                )
            }
        }
    }
}

const UserCartComp = () => {
    const [{ user, products }, dispatch] = useDataLayerValue()
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        const loadData = () => {
            const filterCart = () => {
                var cartData = user.userData.cart
                var rawCartData = [];
                for (let id in cartData) {
                    rawCartData.push({ id, ...cartData[id] })
                }
                return rawCartData
            }
            if (filterCart().length > 0) {
                setCartData(filterCart())
            }
            // console.log(filterCart())
        }
        loadData()
        return (() => {
            loadData()
            loadData()
        })
    }, [])

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
    const PlaceOrder_Navigate = () => {
        navigate('/place-order', { state: { cartData: TEMP_TOTAL_ARR, cartTotalPrice: cartTotalPrice, cartId: rawCartData } })
    }
    if (rawCartData.length) {
        return (
            <>
                <ProductHeader />

                <div className="cart cart1 mt-5 pt-5">
                    {
                        rawCartData.map((item, index1) => {
                            return (
                                <>
                                    {
                                        products.map((product, index) => {
                                            if (item.itemId === product.id) {
                                                return <CartProduct cartId={item} index={index} data={product} />
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
                <div className="card total">
                    <table className="billing">
                        <tbody>
                            <tr>
                                <td>Total:</td>
                                <td className="amount">{cartTotalPrice}</td>
                            </tr>
                            <tr>
                                <td>Tax(18% GST):</td>
                                <td className="amount">{Math.fround(cartTotalPrice * (18 / 100)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="net font-weight-bold">Net Total:</td>
                                <td className="net amount font-weight-bold">{cartTotalPrice + cartTotalPrice * (18 / 100)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="d-flex justify-content-center" onClick={PlaceOrder_Navigate}>
                        <button className="btn btn-primary profile-button" type="button">Place Order</button>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <ProductHeader />
                <div style={{ height: "100vh" }} className="d-flex justify-content-center w-100 flex-column align-items-center">
                    <img style={{ width: 400, height: 'auto' }} src={emptyCart} alt="empty cart" />
                    <h3>No items in cart</h3>
                    <Link to="/products">
                        <button className="btn-dark btn">Continue Shoping <i className="fa fa-shopping-bag"></i></button>
                    </Link>
                </div>
            </>
        )
    }
}

const QualityControl = (props) => {
    const [{ user }, dispatch] = useDataLayerValue()
    const [currentQuantity, setCurrentQuantity] = useState(props.cartId.quantity)
    const increase = () => {
        setCurrentQuantity(currentQuantity + 1)
        firebase.database().ref('users/').child(user.userAuthData.uid).child('cart').child(props.cartId.id).set({ ...props.cartId, quantity: currentQuantity + 1 })
    }
    const decrease = () => {
        if (currentQuantity > 1) {
            setCurrentQuantity(currentQuantity - 1)
            firebase.database().ref('users/').child(user.userAuthData.uid).child('cart').child(props.cartId.id).set({ ...props.cartId, quantity: currentQuantity - 1 })
        }
    }
    return (
        <div className="quantity-control">
            <button onClick={decrease} className="btn btn-primery">
                -
            </button>
            <input type="number" value={currentQuantity} onChange={e => setCurrentQuantity(e.target.value)} maxLength={2} />
            <button onClick={increase} className="btn btn-primery">
                +
            </button>
        </div>
    )
}
const CartProduct = (props) => {
    const [{ user }, dispatch] = useDataLayerValue()
    var productData = props.data
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
    console.log(props.index)
    return (
        <div className="card products" key={props.index}>
            <div className="cart-img">
            <img className="card-img-top" src={productData.imgUrl} alt="Card image cap" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{productData.name}</h5>
                <p className="price">Rs. {productData.price}</p>
                <div className="row">
                    <QualityControl cartId={props.cartId} />
                </div>
                <br />
                <div className="row">
                    <div className="col-xs-2"><button className="btn remove btn-danger" onClick={deleteItem}><i className="fa-solid fa-trash"></i> Remove Item</button></div>
                </div>
            </div>
        </div>
    )
}
export default Cart;
export { QualityControl }
