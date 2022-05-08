import React from 'react'
import userImage from '../assets/images/user-logo.jpg'
import farmerGirl from '../assets/images/farmer-girl.jpg'
import Footer from '../Component/Footer'
import "../style/home.css"
import "../style/templatemo-style.css"
import ProductHeader from '../Component/ProductHeader'
function AboutPage() {
    return (
        <>
            <ProductHeader />
            <header className="row tm-welcome-section">
                <h2 className="col-12 text-center tm-section-title">About Kishan Darshan</h2>
                <p className="col-12 text-center">
                The Goal of our Website is to provide a Platform for Farmers, Wholesaler, Bulk Buyers, and Daily Consumers, This Website helps farmer sell their Products to Consumers and Corporates Directly by eliminating Brokerage and, Extra Costs which will result into Low Prices of Products, while also delivering them Fresh Products (Fruits, Vegetables, Grains, and Pulses).

Corporates can directly buy products from Farmer with Rates that satisfies Farmer as well as Corporate and of Course Daily Buyer (Consumer) can also buy products mentioned above.

Of course safety, hygiene and punctual delivery is our Responsibility.

Team eKisandarshan. 

Jai Jawan, Jai Kishan - Lal Bahadur Shastris
                </p>
            </header>
            <div className="container">
                <div className="row">
                    <article className="col-lg-6">
                        <figure className="tm-person">
                            <img src={userImage} alt="Image" className="img-fluid tm-person-img" />
                            <figcaption className="tm-person-description">
                                <h4 className="tm-person-name">Mr. Praveen Sharma</h4>
                                <p className="tm-person-title">Founder</p>
                                <p className="tm-person-about">Vivamus cursus leo nec sem feugiat sagittis.
                                    Duis ut feugiat odio, sit amet accumsan
                                    odio.</p>
                                <div>
                                    <a href="https://fb.com" className="tm-social-link"><i className="fab fa-facebook tm-social-icon"></i></a>
                                    <a href="https://twitter.com" className="tm-social-link"><i className="fab fa-twitter tm-social-icon"></i></a>
                                    <a href="https://instagram.com" className="tm-social-link"><i className="fab fa-instagram tm-social-icon"></i></a>
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article className="col-lg-6">
                        <figure className="tm-person">
                            <img src={userImage} alt="Image" className="img-fluid tm-person-img" />
                            <figcaption className="tm-person-description">
                                <h4 className="tm-person-name">Valentina Martin</h4>
                                <p className="tm-person-title">Culinary Director</p>
                                <p className="tm-person-about">Praesent non vulputate elit. Orci varius
                                    natoque penatibus et magnis montes, nascetur ridiculus mus.</p>
                                <div>
                                    <a href="https://fb.com" className="tm-social-link"><i className="fab fa-facebook tm-social-icon"></i></a>
                                    <a href="https://twitter.com" className="tm-social-link"><i className="fab fa-twitter tm-social-icon"></i></a>
                                    <a href="https://instagram.com" className="tm-social-link"><i className="fab fa-instagram tm-social-icon"></i></a>
                                    <a href="https://youtube.com" className="tm-social-link"><i className="fab fa-youtube tm-social-icon"></i></a>
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <div className="bg-img-fix">
                        {/* Empty Space */}
                    </div>
                    {/* <div className="tm-container-inner tm-features">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="tm-feature">
                                    <i className="fas fa-4x fa-pepper-hot tm-feature-icon"></i>
                                    <p className="tm-feature-description">Donec sed orci fermentum, convallis lacus id, tempus elit. Sed eu neque accumsan, porttitor arcu a, interdum est. Donec in risus eu ante.</p>
                                    <a href="index.html" className="tm-btn tm-btn-primary">Read More</a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="tm-feature">
                                    <i className="fas fa-4x fa-seedling tm-feature-icon"></i>
                                    <p className="tm-feature-description">Maecenas pretium rutrum molestie. Duis dignissim egestas turpis sit. Nam sed suscipit odio. Morbi in dolor finibus, consequat nisl eget.</p>
                                    <a href="index.html" className="tm-btn tm-btn-success">Read More</a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="tm-feature">
                                    <i className="fas fa-4x fa-cocktail tm-feature-icon"></i>
                                    <p className="tm-feature-description">Morbi in dolor finibus, consequat nisl eget, pretium nunc. Maecenas pretium rutrum molestie. Duis dignissim egestas turpis sit.</p>
                                    <a href="index.html" className="tm-btn tm-btn-danger">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className="tm-history-inner">
                    <img src={farmerGirl} alt="Image" className="img-fluid tm-history-img"/>
                        <div className="tm-history-text">
                            <h4 className="tm-history-title">How Our Website helps Farmer</h4>
                            <p className="tm-mb-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et voluptatem nulla corporis quasi impedit dolores nemo, eius excepturi nesciunt libero commodi praesentium dolore? Voluptatum, molestias. Vel soluta vero minima fugiat.</p>
                        </div>
                </div> */}
            </div>
            <Footer />
        </>
    )
}

export default AboutPage