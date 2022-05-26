import React from 'react'
import { Carousel } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import carso1 from "../assets/images/carso1.png"
import carso2 from "../assets/images/carso2.png"
import carso3 from "../assets/images/carso3.png"

function MyCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
               <div className="img-block">
                   
               </div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <div className="img-block">
                   
               </div>

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <div className="img-block">
                   
               </div>

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default MyCarousel