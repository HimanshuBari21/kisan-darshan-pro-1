import React from 'react'
import praveen from '../assets/images/praveen.jpg'
import himanshu from '../assets/images/himanshu.jpg'
import dhiraj from '../assets/images/dhiraj.jpg'
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
                <p className="col-12 text-justify">The Goal of our Website is to provide a Platform for Farmers, Wholesaler, Bulk Buyers, and Daily Consumers, This Website helps farmer showcase their resources, agricultural activities and sell farm produce to Consumers and Corporates directly which brings the overall cost within the range for all; while also delivering them Fresh Products. The website also helps in connecting industry experts, market and farmers which will result in balancing market demand and farm production. Safety, hygiene and punctual delivery are our Responsibility. <br/><br/> -Team eKisandarshan. <br/><br/><i>Jai Jawan, Jai Kishan - Lal Bahadur Shastris</i></p>
            </header>
            <div className="container">
                <div className="row">
                    <article className="col-lg-6">
                        <figure className="tm-person">
                            <img src={praveen} style={{maxWidth: "200px"}} alt="Image" className="img-fluid tm-person-img" />
                            <figcaption className="tm-person-description">
                                <h4 className="tm-person-name">Mr. Praveen Sharma</h4>
                                <p className="tm-person-title">Founder and Owner</p>
                                <div>
                                    <a href="https://twitter.com" className="tm-social-link"><i className="fab fa-twitter tm-social-icon"></i></a>
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article className="col-lg-6">
                        <figure className="tm-person">
                            <img src={himanshu} alt="Image" style={{maxWidth: "200px"}} className="img-fluid tm-person-img" />
                            <figcaption className="tm-person-description">
                                <h4 className="tm-person-name">Himanshu Bari</h4>
                                <p className="tm-person-title">UI UX Designer and R&D</p>
                                <div>
                                    
                                    <a href="https://twitter.com" className="tm-social-link"><i className="fab fa-twitter tm-social-icon"></i></a>
                                    
                                   
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article className="col-lg-12">
                        <figure className="tm-person">
                            <img src={dhiraj} alt="Image" style={{maxWidth: "200px"}} className="img-fluid tm-person-img" />
                            <figcaption className="tm-person-description">
                                <h4 className="tm-person-name">Dhiraj Prajapati</h4>
                                <p className="tm-person-title">Full Stack Developer</p>
                                <div>
                                    <a href="https://www.linkedin.com/in/dhiraj-prajapati-web-dev/" className="tm-social-link"><i className="fab fa-linkedin tm-social-icon"></i></a>
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
