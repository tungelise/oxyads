import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.css';

import {
    setWatchVideo,
} from '../../../reducers/ThemeOptions';

import {
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown,
    faCartShopping
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            viewTotal: 300000,

        };
        this.toggle1 = this.toggle1.bind(this);
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render() {
        let {
            watchVideo,
        } = this.props;

        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className="TabsAnimation"
                        appear={true}
                        timeout={0}
                        enter={false}
                        exit={false}>
                        
                        <div>
                            <PageTitle
                                heading="Profile"
                                subheading="Brands pay to show you what you’re interested in.
                                By completing your preferences you will see ads that are based on what you like and you’ll earn quicker because of it."
                                icon="pe-7s-car icon-gradient bg-mean-fruit"
                            />

                            
                            <Card className="mb-3">
                                <CardBody>
                                    
                                <div className="title text-center mb-5">
                                    <h1>About you</h1>
                                </div>
                                
                                    <Form>
                                    <Row>
                                        <Col className="mt-2" md="6" lg="6">
                                            <FormGroup row>
                                                <Label for="dateOfBirth" sm={3} size="lg">Date of Birth</Label>
                                                <Col sm={5}>
                                                    <Input type="select" name="select" id="dateOfBirth">
                                                        <option>January</option>
                                                        <option>Februry</option>
                                                    </Input>
                                                </Col>
                                                <Col sm={4}>
                                                    <Input type="select" name="select" id="yearOfBirth">
                                                        <option>1990</option>
                                                        <option>1991</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" lg="6">
                                            <FormGroup row>
                                                <Col >
                                                    <Label for="gen" size="lg">Gender</Label>
                                                    <Button color="info" className="mt-1 ml-2">Male</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">Female</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">Other</Button>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col md="6" lg="6">
                                            <FormGroup row>
                                                <Col >
                                                    <Label for="gen" size="lg">Profession</Label>
                                                    <Button color="secondary" className="mt-1 ml-2">Student</Button>
                                                    <Button color="info" className="mt-1 ml-2">Employed</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">UnEmployed</Button>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" lg="6">
                                            <FormGroup row>
                                                <Col >
                                                    <Label for="gen" size="lg">Income</Label>
                                                    <Button color="secondary" className="mt-1 ml-2">0-29K</Button>
                                                    <Button color="info" className="mt-1 ml-2">30-45K</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">45K-60K</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">60K+</Button>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        </Row>
                                        <Col md="6" lg="6">
                                            <FormGroup row>
                                                <Col >
                                                    <Label for="gen" size="lg">Have you used an AdBlocker before</Label>
                                                    <Button color="info" className="mt-1 ml-2">Yes</Button>
                                                    <Button color="secondary" className="mt-1 ml-2">No</Button>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Form>
                                
                            </CardBody>
                            </Card>
                            

                            <div className="categories__inner">
                                <h2 className="categories__heading">
                                    Preferences
                                </h2>

                            <Row>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Lifestyle</h3>
                                        </div>

                                        <img className="" src={'http://0.0.0.0:8000/fashion.png'} /> 
                                        
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Mens Fashion<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Female Fashion<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Trends<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Skin Care<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Grooming<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Discounts / Sales<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Luxury goods<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Accessories<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'http://0.0.0.0:8000/food.png'} /> 
                                        
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Organic<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Vegetarian<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Vegan<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Coffee<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Cooking<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Eating Out<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Beer / Wine<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Digital</h3>
                                        </div>
                                        <img className="icon-ad" src={'http://0.0.0.0:8000/tech.png'} /> 
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Android<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">iOS<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Virtual Reality<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Wearable Tech<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'http://0.0.0.0:8000/game.png'} /> 
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Computer Gaming<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Mobile Gaming<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Video Games<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Blockchain Games<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Explore</h3>
                                        </div>
                                        <img className="icon-ad" src={'http://0.0.0.0:8000/travel.png'} /> 
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Adventure Holidays<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Backpacking<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Luxury Holidays<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Worldwide<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'http://0.0.0.0:8000/vr.png'} /> 
                                        <div className="mt-2">
                                            <button className="mb-2 me-2 btn btn-light">Android<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">iOS<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Virtual Reality<span className="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button className="mb-2 me-2 btn btn-light">Wearable Tech<span className="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    watchVideo: state.ThemeOptions.watchVideo,
});

const mapDispatchToProps = dispatch => ({
    xemWatchVideo: videoId => dispatch(setWatchVideo(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
