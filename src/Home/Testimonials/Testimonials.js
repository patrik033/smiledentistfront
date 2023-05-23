/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import logo from "../../img/nedladdning.svg";
import { Container, Spinner } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { TestimonialData } from "../../StaticData/StaticData";
function Testimonials() {
    const [post, setPost] = useState(null);
    const [waiter, setWaiter] = useState(false);

    useEffect(() => {
        setPost(TestimonialData);
        setWaiter(true);
    }, []);

    if (waiter === false) {
        return (
            <div>
                <h1>Loading...<Spinner animation="border" /></h1>
            </div>
        );
    }
    else {
        return (
            <Carousel>
                {post.map((testimonial) => (
                    <Carousel.Item key={testimonial.Id}>
                        <Container className="w-100">
                            <img
                                className=" fluid d-block w-100"
                                src={logo}
                                alt="logo" />
                        </Container>
                        <Carousel.Caption>
                            <h3>{testimonial.Review}</h3>
                            <div>
                                <Rating readOnly defaultValue={testimonial.Rating}></Rating>
                            </div>
                            <h2>{testimonial.Name}</h2>
                            <p>{testimonial.Profession}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }
}
export default Testimonials;