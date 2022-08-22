import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
    setWatchVideo,
} from '../../../reducers/ThemeOptions';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
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
    faCartShopping,
    faEye
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import nft1 from '../../../assets/images/nft-imgs/1.jpg';
import nft2 from '../../../assets/images/nft-imgs/2.jpg';
import nft3 from '../../../assets/images/nft-imgs/3.jpg';
import nft4 from '../../../assets/images/nft-imgs/4.jpg';
import nft5 from '../../../assets/images/nft-imgs/5.jpg';
import nft6 from '../../../assets/images/nft-imgs/6.jpg';

const data2 = [
    {name: 'Page A', uv: 5400, pv: 5240, amt: 1240},
    {name: 'Page B', uv: 7300, pv: 4139, amt: 3221},
    {name: 'Page C', uv: 8200, pv: 7980, amt: 5229},
    {name: 'Page D', uv: 6278, pv: 4390, amt: 3200},
    {name: 'Page E', uv: 3189, pv: 7480, amt: 6218},
    {name: 'Page D', uv: 9478, pv: 6790, amt: 2200},
    {name: 'Page E', uv: 1289, pv: 1980, amt: 7218},
    {name: 'Page F', uv: 3139, pv: 2380, amt: 5150},
    {name: 'Page G', uv: 5349, pv: 3430, amt: 3210},
];

const nftData = [
    {
        'id': 27609,
        't': 'Make your next move with an impressive portfolio website. Start your free trial.',
        'l': '',
        'i': 'http://0.0.0.0:8000/e7f4726f-ba2d-4605-8999-50261cac8dc7.png',
        'v': 'http://0.0.0.0:8000/e7f4726f-ba2d-4605-8999-50261cac8dc7.png',
        'price' : '10'
    },
    {
        'id': 61650,
        't': 'Get 8% off video-games & accessories.',
        'l': '',
        'i': 'http://0.0.0.0:8000/139cf0ee-0d69-426c-8108-4e2a86e68659.png',
        'v': 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        'price' : '20'
    },
    {
        'id': 62661,
        't': "Get 25% off Yumi's tasty vitamin gummies",
        'l': '',
        'i': 'http://0.0.0.0:8000/5ab983e3-bcf5-4270-b5db-8317950056b2.png',
        'v': 'https://download.samplelib.com/mp4/sample-5s.mp4',
        'price' : '35'
    },
    {
        'id': 32058,
        't': '20% Off + Free Shipping on your Freedom Order.',
        'l': '',
        'i': 'http://0.0.0.0:8000/3519f660-76a5-48ee-b146-c8141408633b.png',
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '16'
    },
    {
        'id': 32059,
        't': 'Get 30 days free + 25% off Fiit.',
        'l': '',
        'i': 'http://0.0.0.0:8000/e5951545-d59e-4b4d-98ba-3db48f832e92.jpeg',
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '8'
    },
    {
        'id': 32078,
        't': 'Get up off your next wireless Jabra headphones.',
        'l': '',
        'i': 'http://0.0.0.0:8000/52632b71-d44c-4e8e-9f71-7a4c470d3cbf.png',
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '25'
    },
];

class NftDashboard extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',
            viewTotal: 300000,

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    watchVideo(videoId) {
        let {watchVideo, xemWatchVideo} = this.props;
        console.log('watch video now: ', videoId);
        xemWatchVideo(videoId);
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
                                heading="Marketplace"
                                subheading="Redeem your points here! Find great deals, or purchase items with your OxyAds points."
                                icon="pe-7s-car icon-gradient bg-mean-fruit"
                            />

                            <div className="text-center">
                                <h2>Featured</h2>
                            </div>
                            <Row>
                                <Col md="12 text-center card mb-3 widget-chart card-border">
                                    <div className="c-product-item__body text-center">
                                        <img loading="lazy" className="c-product-item__img" src={'http://0.0.0.0:8000/911fbd84-3cf1-413f-b22e-e877f18c8e2b.png'} /> 
                                    </div>
                                    <div className="widget-numbers">
                                        5 points
                                    </div>
                                    <div className="widget-subheading">
                                        Get 3 Months of Amazon Music
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-center mt-2">
                                <h2>Exclusive Offers</h2>
                            </div>

                            <Row>
                                {nftData.map((value, index) => {
                                    return (
                                        <Col key={value.id} md="4">
                                            <div className="card mb-3 widget-chart card-border">
                                                <img className="icon-ad" 
                                                        src={value.i}
                                                />
                                                <div className="widget-numbers">
                                                    {value.price} points
                                                </div>
                                                <div className="widget-subheading">
                                                    {value.t}
                                                </div>
                                                <div className="icon-wrapper rounded-circle mt-2 carbon-example">
                                                    <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                    <i className="lnr-cart icon-gradient bg-premium-dark"> </i>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(NftDashboard);
