import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';

const Hero = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        handleGetItems();
    }, []);

    const handleGetItems = () => {
        fetch('https://fakestoreapi.com/products/')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
            })
            .catch((error) => {
                console.log(error);
                message.error('Network Problem');
            });
    };

    const handleFilterItems = (prop) => {
        try {
            const filteredItems = data.filter((item) => item.category === prop);
            setFilteredData(filteredItems);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <Container fluid style={{ height: '100vh' }} className="mt-5">
                <Row style={{ backgroundColor: '#fff' }}>
                    <Col md={6} className="h-90 d-flex align-items-center justify-content-center p-5 text-white">
                        <img
                            src="https://printmagic.net.au/wp-content/uploads/2021/02/Shopping-Girl2-e1612179006739.png"
                            alt="Left Image"
                            className="img-fluid"
                        />
                    </Col>
                    <Col md={6} className="h-90 d-flex align-items-center justify-content-center">
                        <div>
                            <p>
                                -----<strong>NEW TREND</strong>
                            </p>
                            <h1>
                                AUTUMN SALE STYLISH <br /> <strong>WOMEN</strong>{' '}
                            </h1>
                            <p>
                                <strong>DISCOVER MORE-----</strong>
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                <div className="btn btn-success m-1" onClick={handleGetItems}>
                    All
                </div>
                <div className="btn btn-success m-1" onClick={() => handleFilterItems("men's clothing")}>
                    Men's clothing
                </div>
                <div className="btn btn-success m-1" onClick={() => handleFilterItems("jewelery")}>
                    Jewelry
                </div>
                <div className="btn btn-success m-1" onClick={() => handleFilterItems("electronics")}>
                    Electronics
                </div>
                <div className="btn btn-success m-1" onClick={() => handleFilterItems("women's clothing")}>
                    Women's clothing
                    </div>
                <br />
                <hr />
                <Row>
                    <div className="row">
                        {filteredData.map((item) => (
                            <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                                <div className="card shadow p-2 mx-auto m-1" style={{ width: '16rem', height: '33rem' }}>
                                    <img className="card-img-top" style={{ height: '300px' }} src={item.image} alt="Card image cap" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5>{item.title}</h5>
                                            <RatingStars rating={item.rating.rate} />
                                        </div>
                                        <div className="mt-2">
                                            <button className="btn btn-success" onClick={() => Navigate(`detail/${item.id}`)}>
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Hero;
