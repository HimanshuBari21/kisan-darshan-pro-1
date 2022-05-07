import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import firebase from './firebase';
import KDIndex from './Pages/KDIndex';
import LoginPage from './Pages/LoginPage';
import Profile from './Pages/Profile';
import { useDataLayerValue } from './DataLayer/DataLayer';
import Store from './Pages/Store';
import Cart from './Pages/Cart';
import RegistrationPage from './Pages/RegistrationPage';
import PlaceOrder from './Pages/PlaceOrder';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import FarmerDataForm from './Pages/FarmerDataFrom';
import FarmerStore from './Pages/FarmerStore';
import AddItemToStore from './Pages/AddItemToStore';
function App() {
    const [{ user }, dispatch] = useDataLayerValue()
    var currentUser = firebase.auth().currentUser
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const loadData = () => {
            firebase.database().ref('categories/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const rowCateArr = [];

                for (let id in snapVal) {
                    rowCateArr.push({ id, ...snapVal[id] })
                }

                // setCategory(rowCateArr)
                dispatch({
                    type: 'SET_CATE_LIST',
                    data: rowCateArr
                })
                dispatch({
                    type: "SET_USER",
                    data: firebase.auth().currentUser
                })
            })
            firebase.database().ref('items/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const rawItemsList = [];
                for (let id in snapVal) {
                    rawItemsList.push({ id, ...snapVal[id] })
                }
                dispatch({
                    type: "SET_PRODUCTS",
                    data: rawItemsList
                })
                firebase.database().ref('crops/').on('value', (snapshot) => {
                    var snapVal = snapshot.val();
                    const rawCropsList = [];
                    for (let id in snapVal) {
                        rawCropsList.push({ id, ...snapVal[id] })
                    }
                    console.log(rawCropsList)
                    dispatch({
                        type: "SET_CROPS_LIST",
                        data: rawCropsList
                    })
                })
               
            })

           

        }
        loadData()
        return () => {
            loadData()
        }
    }, [])
    useEffect(()=>{
        
        const loadData = () => {
           
            firebase.database().ref('/item-to-verify').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const rawToVerifyList = [];
                for (let id in snapVal) {
                    rawToVerifyList.push({ id, ...snapVal[id] })
                }
                console.log(rawToVerifyList)
                dispatch({
                    type: "SET_ITEM_TO_VERIFY",
                    data: rawToVerifyList
                })
               
            })
        }
        loadData()
        return ()=>{
            loadData()
        }
    },[])
    if (currentUser) {
        firebase.database().ref('users/').child(currentUser.uid).on('value', (snapshot) => {
            const rawUserData = snapshot.val();
            dispatch({
                type: "SET_USER_DATA",
                data: rawUserData
            })
        })

    }

    return (
        <Routes>
            <Route exact path="/" element={<KDIndex />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/store/:category" element={<Store />} />
            <Route exact path="/store" element={<Store />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/register" element={<RegistrationPage />} />
            <Route exact path="/place-order" element={<PlaceOrder />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/farmer-profile-create" element={<FarmerDataForm />} />
            <Route exact path="/farmer/store" element={<FarmerStore />} />
            <Route exact path="farmer/add-item-to-store" element={<AddItemToStore />} />
            {/*<Route exact path="/contact" element={<ContactPage />} />
      <Route exact path="/about" element={<AboutPage />} />
      <Route exact path="/orders" element={<Orders />} />
      <Route exact path="/change-password" element={<ChangePassword />} /> */}
            <Route
                path="*"
                element={<Navigate to="/home" replace />}
            />
        </Routes>
    );
}

export default App;
