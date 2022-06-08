import React from 'react'

import '../style/home.css'
import ProductHeader from '../Component/ProductHeader'
import { AllProduct } from './Store'
import { useDataLayerValue } from '../DataLayer/DataLayer'
import Footer from '../Component/Footer'
import { Link } from 'react-router-dom'
import MyCarousel from '../Component/Carousel'


function HomePage() {
    const [{ products }, dispatch] = useDataLayerValue()
    return (
        <>
            <ProductHeader />
            <MyCarousel />
            <br />
            <div className="Home">

                <br />
                <div className="container">
                    <AllProduct itemsData={products} />
                </div>
                <div className="call-us">
                    <div className="call-img">
                        <img
                            src="https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3VzdG9tZXIlMjBzZXJ2aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            loading="lazy"
                            alt="Customer Care Executive"
                        />
                    </div>
                    <div className="call-para">
                        <h3>Need Help? Talk with us</h3>
                        <p>
                            If you have any Query feel free <br /> to call
                            <a href="tel:+919424824272">+91 94248 24272</a> <br /> or Mail <a href="mailto:pksharma211@gmail.com">pksharma211@gmail.com</a><br />
                            <Link to="/contact">Leave a Messege here</Link>
                        </p>
                    </div>
                </div>
                <Footer />
            </div>

        </>

    )
}

export default HomePage