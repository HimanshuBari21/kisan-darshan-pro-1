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
                products.length > 0 ? Params.category !== undefined ? <><br /><br /> <FilteredProducts itemsData={products} /></> : <AllProduct itemsData={products} /> : <Loading />
            }
        </>
    )
}
const AllProduct = (props) => {
    const [{ products, category }, dispatch] = useDataLayerValue()

    const itemsData = props.itemsData
    if (itemsData) {
        return (
            <div  >
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
    const [{ category, crops, products }] = useDataLayerValue()
    const Params = useParams()
    const itemsData = props.itemsData
    var filteredData = []
    category.map((category, indexs) => {
        if (products.length) {
            if ((category.categorieName).toLowerCase() === Params.category.toLowerCase()) {
                products.map((item, index) => {
                    if (item.category === category.categorieName) {
                        filteredData.push(item)
                    }
                })
            }

        }
    })
    var newList = []
    crops.map((item) => {
        if (item.category.toLowerCase() === Params.category.toLowerCase()) {
            filteredData.map((item0, index) => {
                if (item0.name === item.cropName) {
                    newList.push({ ...item0 })
                }
            })

        }
    }
    )
    var avilItemInCate = []
    newList.map((item) => {
        avilItemInCate.push(item.name)
    })
    avilItemInCate = avilItemInCate.filter((c, index) => {
        return avilItemInCate.indexOf(c) === index;
    })
    if (itemsData) {
        if (filteredData.length) {
            return (
                <>
                    <div className="py-5" >
                        <hr />
                        <div>
                            {/* <h3 className="text-center mt-4">
                                {Params.category.toUpperCase()}
                            </h3> */}

                            {
                                avilItemInCate.map((item) => {

                                    return (
                                        <>
                                            <h3 className="text-left mt-4 mx-5">
                                                <h1>{item}</h1>
                                            </h3>
                                            <div className="card-wrap">
                                                {
                                                    filteredData.map((item0, index) => {
                                                        if (item === item0.name) {
                                                            return (
                                                                <>
                                                                    <ProductCard index={index} data={item0} />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </>
                                    )

                                })
                            }

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

const ProductCard = (props) => {
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const [sellerAdd, setSellerAdd] = useState([])
    const navigate = useNavigate()
    const [{ user }, dispatch] = useDataLayerValue()
    var itemData = props.data

    useEffect(() => {
        firebase.database().ref('users/').child(itemData.sellerUID).on('value', (snapshot) => {
            setSellerAdd(snapshot.val());
        })
    }, [])

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
    const showDetial = () => {
        delete sellerAdd.farmerData
        delete sellerAdd.product_for_sell
        delete sellerAdd.item_rejected
        delete sellerAdd.phone


        const theDetial = () => {
            var detail = ""
            Object.keys(sellerAdd).map((col) => { detail = detail + `${col}: ${sellerAdd[col]} <br>` })
            return detail
        }

        Swal.fire("The detail", `<div class="text-left">${theDetial()}</div>`, "info")
    }
    return (
        <>
            <div class="product">
                <div className="img-box-pro">
                    <img onClick={showDetial} src={itemData.imgUrl} alt="wheat" class="pro-img" />
                    {
                        itemData.organic === "yes" && <><div className="green-box"></div></>
                    }
                </div>
                <div class="pro-detail">
                    <h3 class="pro-name">{itemData.name}</h3>
                    <h3 class="pro-price"> ₹ {itemData.price}</h3>
                    <p class="pro-desc"> <i className="fa-solid fa-map-marker-alt"></i> {sellerAdd.district}, {sellerAdd.state}</p>
                    <button onClick={addToCart} className="btn remove btn-success"><i className="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                </div>
            </div>

        </>
    )
}
export default Store;
export { AllProduct }