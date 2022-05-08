import React from 'react'

import '../style/home.css'
import ProductHeader from '../Component/ProductHeader'
import { AllProduct } from './Store'
import { useDataLayerValue } from '../DataLayer/DataLayer'
import Footer from '../Component/Footer'


function HomePage() {
    const [{products}, dispatch] = useDataLayerValue()
    return (
        <>
            <ProductHeader />
            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables.jpg"
                            className="d-block w-100 gallery"
                            alt=""
                        />
                    </div>
                    <div className="carousel-item" data-interval="2000">
                        <img
                            src="https://previews.123rf.com/images/movingmoment/movingmoment1702/movingmoment170200096/71879129-sfondo-di-molti-cereali-e-legumi-in-piatti-di-ceramica-bianca-.jpg"
                            className="d-block w-100 gallery"
                            alt=""
                        />
                    </div>
                    <div className="carousel-item" data-interval="2000">
                        <img
                            src="https://p1.nicelocal.in/preview/MmR8h-I_CUXnvVWZsON03A/630x384x85/1/e/b/original_60903940ddc19b04bf0317f6_6179d4e6827b6.jpg"
                            className="d-block w-100 gallery"
                            alt=""
                        />
                    </div>
                    <div className="carousel-item" data-interval="2000">
                        <img
                            src="https://www.powertiller.in/images/10.jpg"
                            className="d-block w-100 gallery"
                            alt=""
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
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
                            className="img-block"
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