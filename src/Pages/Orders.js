import React from 'react'
import ProfileComon from '../Component/ProfileComon'

function Orders() {
    return (
        <body>
            <br />
            <br />
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <ProfileComon />
                    <div className="col-md-8">
                        <div className="p-3 py-5">

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text">My Orders</h4>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">Tomato - <span id="quantuity">2</span>Kg</h3>
                                            <img className="img-fluid" src="https://frontiersinblog.files.wordpress.com/2021/07/frontiers-in-sustainalble-food-systems-tomato-fruits-send-electrical-warnings-to-the-rest-of-the-plant-when-attacked-by-insects.jpg" alt="" />
                                            <br />
                                            <p className="btn">Arriving on : 12-06-2022</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">Tomato - <span id="quantuity">2</span>Kg</h3>
                                            <img className="img-fluid" src="https://frontiersinblog.files.wordpress.com/2021/07/frontiers-in-sustainalble-food-systems-tomato-fruits-send-electrical-warnings-to-the-rest-of-the-plant-when-attacked-by-insects.jpg" alt="" />
                                            <br />
                                            <p className="btn">Arriving on : 12-06-2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">Tomato - <span id="quantuity">2</span>Kg</h3>
                                            <img className="img-fluid" src="https://frontiersinblog.files.wordpress.com/2021/07/frontiers-in-sustainalble-food-systems-tomato-fruits-send-electrical-warnings-to-the-rest-of-the-plant-when-attacked-by-insects.jpg" alt="" />
                                            <br />
                                            <p className="btn">Arriving on : 12-06-2022</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">Tomato - <span id="quantuity">2</span>Kg</h3>
                                            <img className="img-fluid" src="https://frontiersinblog.files.wordpress.com/2021/07/frontiers-in-sustainalble-food-systems-tomato-fruits-send-electrical-warnings-to-the-rest-of-the-plant-when-attacked-by-insects.jpg" alt="" />
                                            <br />
                                            <p className="btn">Arriving on : 12-06-2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </body>
    )
}

export default Orders