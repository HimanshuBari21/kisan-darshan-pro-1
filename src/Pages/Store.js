import React, { useEffect, useState } from 'react';
import ProductHeader from '../Component/ProductHeader';
import '../style/products.css';
import { useParams, useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import Loading from '../Component/Loading';
import '../style/Cart.css';
import Swal from 'sweetalert2';
import Spinner from 'react-spinner-material';
import { useDataLayerValue } from '../DataLayer/DataLayer';

function Store() {
    const [{ products, category }] = useDataLayerValue()
    const Params = useParams()
    useEffect(() => {
        const loadData = () => {
            // firebase.database().ref('items/').on('value', (snapshot) => {
            //     var snapVal = snapshot.val();
            //     const rowItemsArr = [];

            //     for (let id in snapVal) {
            //         rowItemsArr.push({ id, ...snapVal[id] })
            //     }


            //     firebase.database().ref('categories/').on('value', (snapshot) => {
            //         var snapVal = snapshot.val();
            //         const rowCateArr = [];

            //         for (let id in snapVal) {
            //             rowCateArr.push({ id, ...snapVal[id] })
            //         }

            //         setItemsData({ itemData: rowItemsArr, category: rowCateArr })

            //     })
            // })
        }
        loadData()
        return () => {
            loadData()
        }
    }, [])
    return (
        <>
            <ProductHeader />
            {
                products.length > 0 ? Params.category !== undefined ? <FilteredProducts itemsData={products} /> : <AllProduct itemsData={products} /> : <Loading />
            }
        </>
    )
}
const AllProduct = (props) => {
    const [{ products, category }, dispatch] = useDataLayerValue()

    const itemsData = props.itemsData
    if (itemsData) {
        return (
            <div className="py-5" >
                <hr />
                {
                    category.map((category, indexs) => {
                        const newData = itemsData.filter(item =>
                            item.category.includes(category.categorieName)
                        )
                        if (newData.length) {
                            return (
                                <div key={indexs}>
                                    <h3 className="text-center mt-4">
                                        {category.categorieName}
                                    </h3>
                                    <div className="card-wrap">
                                        {

                                            newData.map((item, index) => {
                                                if (item.category === category.categorieName) {
                                                    return (
                                                        <ProductCard index={index} data={item} />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>

                            )
                        }

                    })
                }

            </div>
        )
    }
    else {
        return <Loading />
    }

}
const FilteredProducts = (props) => {
    const [{ category, products }] = useDataLayerValue()
    const Params = useParams()
    const itemsData = props.itemsData
    var filteredData = []
    category.map((category, indexs) => {
        if (products.length) {
            if ((category.categorieName).toLowerCase() === Params.category) {
                products.map((item, index) => {
                    if (item.category === category.categorieName) {
                        filteredData.push(item)
                    }
                })
            }

        }
    })

    if (itemsData) {
        if (filteredData.length) {
            return (
                <>
                    <div className="py-5" >
                        <hr />
                        <div>
                            <h3 className="text-center mt-4">
                                {Params.category.toUpperCase()}
                            </h3>
                            <div className="card-wrap">
                                {
                                    filteredData.map((item, index) => {
                                        return (

                                            <ProductCard index={index} data={item} />

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
            <>
            <br /><br /><br /><br />
            <h1>Nothing in this category</h1>
            </>
                )
        }
    }
    else {
        return <Loading />
    }

}
const QualityControl = (props) => {
    // const [currentQuantity, setCurrentQuantity] = useState(1)
    const increase = () => {
        props.setCurrentQuantity(props.currentQuantity + 1)
    }
    const decrease = () => {
        if (props.currentQuantity > 1) {
            props.setCurrentQuantity(props.currentQuantity - 1)
        }
    }
    return (
        <div className="quantity-control">
            <button onClick={decrease} className="btn btn-primery">
                -
            </button>
            <input type="number" value={props.currentQuantity} onChange={e => props.setCurrentQuantity(e.target.value)} maxLength={2} />
            <button onClick={increase} className="btn btn-primery">
                +
            </button>
        </div>
    )
}
const ProductCard = (props) => {
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const navigate = useNavigate()
    const [{ user }, dispatch] = useDataLayerValue()
    var itemData = props.data

    const addToCart = () => {
        const userId = user.userAuthData
        if (userId === null) {
            window.location.replace('/login')
        }
        else {
            if (user.userData === null) {
                window.location.replace("/register")
            }
            else {
                var userCartData = user.userData.cart
                var rawCartData = [];
                for (let id in userCartData) {
                    rawCartData.push({ id, ...userCartData[id] })
                }
                var dublicate = rawCartData.filter((item) => item.itemId === itemData.id).length
                if (dublicate <= 0) {
                    firebase.database().ref('users').child(userId.uid).child('cart').push({
                        itemId: itemData.id,
                        quantity: currentQuantity
                    }).then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added to cart',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }).catch((error) => {
                        console.log(error.code)
                    })
                }
                else {
                    Swal.fire({
                        title: "To increase the quantity to cart.",
                        text: "",
                        icon: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Go to cart <i class="fa fa-shopping-cart"></i>'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/cart")
                        }
                      })
                    // Swal.fire("To increase the quantity to cart.", '', "warning")
                }
            }
        }
    }
    return (
        <div key={`arrayElement${props.index}`} className="card products">
            <div className="img-box" >
                <img loading="lazy" className="card-img-top img-fluid" src={itemData.imgUrl} alt="Card image cap" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{itemData.name}</h5>
                <p className="price">&#8377;{itemData.price}</p>
                <div className="d-flex justify-content-center">
                    {/* <QualityControl currentQuantity={currentQuantity} setCurrentQuantity={setCurrentQuantity} /> */}
                </div>
                <br />
                <div className="row">
                    {
                        isAdding === true ? <Spinner radius={20} color={"#333"} stroke={2} visible={true} /> : ""
                    }
                    <button onClick={addToCart} className="btn remove btn-success"><i className="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
export default Store;
export { AllProduct }