import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { utils } from 'near-api-js'
import { deposit } from '../../../near-api';

import {
    setWatchVideo,
} from '../../../reducers/ThemeOptions';

import {
    setOxyadsTokenBalance,
} from '../../../reducers/WalletOptions';

import {
    Row, Col,
    CardHeader,
    Progress,
    TabContent,
    TabPane,
    Table,
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Card, CardBody,
    CardTitle,
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
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class NewCampaignDashboard extends Component {
    constructor() {
        super();

        let transHash = "";

        const params = new URLSearchParams(window.location.search)
        
        for (const param of params) {
            console.log("pqrq: ", param)
            if (param) {
                transHash = param;
            }
        }
        
        console.log(transHash)

        if (transHash && transHash[0] == "transactionHashes") {
            console.log("ok: ", transHash[0]);
            this.state = {
                dropdownOpen: false,
                saving: false,
                ratioNearUsd : 1,
                deposit: 1,
                budgets: ["< $1,000", " < $5,000", "< $15,000", "$50,000+"],
                analyzed: true,
                transactionHash: transHash[1],
            };
        } else {
            console.log(transHash[0]);
            this.state = {
                dropdownOpen: false,
                saving: false,
                ratioNearUsd : 1,
                budgets: ["< $1,000", " < $5,000", "< $15,000", "$50,000+"],
                analyzed: false,
                transactionHash: "",
            };
        }

        this.toggle = this.toggle.bind(this);
        this.depositCampaign = this.depositCampaign.bind(this);
        this.saveCampaign = this.saveCampaign.bind(this);
        this.getRatioNearUsd = this.getRatioNearUsd.bind(this);
        
        setTimeout(() => {
            this.getRatioNearUsd();
        }, 500);
    }

    getRatioNearUsd() {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd")
        .then((response) => response.json())
        .then(data => {
            const near2usd = data['near']['usd'];
            let buds = [1000, 5000, 15000, 50000];            

            const newBuds = this.state.budgets.map((v, i) => {
                return v + " ( " + (Math.round(buds[i] / near2usd  * 100) / 100) + "Ⓝ )";
                // return (Math.round(v / near2usd  * 100) / 100);
            });

            console.log('depost: ', Math.round(150 / near2usd  * 100) / 100);

            this.setState(prevState => ({
                ratioNearUsd: near2usd,
                budgets: newBuds,
                deposit: (Math.round(150 / near2usd  * 100) / 100),
            }));
        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    depositCampaign() {
        let amount = this.state.deposit;
        console.log("amount:  ", amount);
        deposit(amount, "FFHNFH6599FHFHF6788966FD").then((data) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    saveCampaign() {
        // validate data
        this.setState(prevState => ({
            saving: !prevState.saving
        }));
        // send data to server

        setTimeout(() => {
            this.setState(prevState => ({
                analyzed: true,
                saving: false,
            }));
        }, 3000);
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
                                heading="Run a Campaign"
                                subheading="We're here to answer any questions or to help you launch a OxyAds campaign. Simply fill out our form and we’ll be in touch."
                                icon="pe-7s-car icon-gradient bg-mean-fruit"
                            />
                            
                            {this.state.saving && <div className="mt-3 mb-3">We are analyzing your ad campaign request. Please wait, it may take a moment.</div>}
                            {this.state.saving && <Progress className="progress-bar-sm mt-3 mb-3" animated value={75} />}
                            
                            {this.state.analyzed && <Row>
                                <Col md="12" lg="6">
                                    <Card className="mb-3">
                                        <CardBody>
                                            <div className="mb-3">Thanks! Our system estimated your ad campaign request:</div>
                                            <div>
                                            <Table className="mb-0" bordered>
                                                    <tbody>
                                                    <tr>
                                                        <th scope="row">Campaign Id</th>
                                                        <td>FFHNFH6599FHFHF6788966FD</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Product Name</th>
                                                        <td>Starbucks</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Budget</th>
                                                        <td>$300 - {this.state.deposit * 2 + "Ⓝ"}</td>
                                                    </tr>
                                                    <tr>
                                                    <th scope="row">CPM</th>
                                                    <td>$0.3</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Impressions</th>
                                                        <td>1,000,0000</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">From</th>
                                                        <td>25/08/2022</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">To</th>
                                                        <td>05/09/2022</td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                                <FormText color="muted">
                                                    We calculate the current budget and make settelement at the end of each week.
                                                </FormText>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md="12" lg="6">
                                    <Card className="mb-3">
                                        <CardBody>
                                            {this.state.transactionHash && 
                                                <div className="mb-3">Thank you for your deposit. We start your campaign very soon.</div>
                                            }

                                            {!this.state.transactionHash && 
                                                <div className="mb-3">You need to deposit to start your campaign:</div>
                                            }
                                            <div>
                                            <Table className="mb-0" bordered>
                                                        <tbody>
                                                        <tr>
                                                            <th scope="row">Total</th>
                                                            <td>$300 - {this.state.deposit * 2 + "Ⓝ"}</td>
                                                        </tr>
                                                    <tr>
                                                        <th scope="row">Deposit</th>
                                                        <td>$150 - {this.state.deposit + "Ⓝ"}</td>
                                                    </tr>
                                                    {this.state.transactionHash && 
                                                        <tr>
                                                            <th scope="row">Transaction Hash</th>
                                                            <td>{this.state.transactionHash}</td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                    
                                                    <th scope="row">
                                                        <Button onClick={() => this.depositCampaign()} color="primary" className="mt-1">
                                                            Deposit
                                                        </Button>
                                                        </th>
                                                        <td></td>
                                                    </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            }

                            {!this.state.analyzed &&  <Row>
                                <Col md="12" lg="6">
                                    <Card className="mb-3">
                                        <CardHeader className="card-header-tab">
                                            <div className="card-header-title">
                                                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                                Tell us about the product
                                            </div>
                                        </CardHeader>

                                        <CardBody>
                                            <Form>
                                                <FormGroup>
                                                    <CardTitle>Product Name</CardTitle>
                                                    <Input type="text" name="name" id="name" placeholder=""/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>What’s the URL of the product you’re promoting?</CardTitle>
                                                    <Input type="text" name="url" id="url"
                                                        placeholder="https://"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>Description</CardTitle>
                                                    <Input type="textarea" name="description" id="description"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>Category</CardTitle>
                                                    <Input type="select" name="category" id="category">
                                                        <option value="1">Accounting/Bookkeeping Services</option>
                                                        <option value="2">Advertising Services</option>
                                                        <option value="3">Architectural/Surveying Services</option>
                                                        <option value="4">Clothing Rental</option>
                                                        <option value="5">Commercial Equipment</option>
                                                        <option value="100">Other</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>What’s your campaign budget?</CardTitle>
                                                    <Input type="select" name="budget" id="budget">
                                                        {this.state.budgets.map((value, index) => {
                                                            return (
                                                                <option key={index} value={value}>{value}</option>
                                                            )
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                                
                                                <FormGroup>
                                                    <CardTitle>Tell us a bit about your marketing goals</CardTitle>
                                                    <Input type="textarea" name="text" id="goals"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>Pictures/Videos of product</CardTitle>
                                                    <Input type="file" name="file" id="exampleFile"/>
                                                    <FormText color="muted">
                                                        Pictures/Videos of product.
                                                    </FormText>
                                                </FormGroup>
                                                <Button onClick={() => this.saveCampaign()} color="primary" className="mt-1">
                                                    {this.state.saving && "Saving ..."}
                                                    {!this.state.saving && "Submit"}
                                                </Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md="12" lg="6">
                                    <Card className="mb-3">
                                        <CardHeader className="card-header-tab">
                                            <div className="card-header-title">
                                                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                                Who are you trying to target ?
                                            </div>
                                        </CardHeader>

                                        <CardBody>
                                            <Form>
                                                <FormGroup>
                                                    <CardTitle>Locations</CardTitle>
                                                    <Input type="select" name="locations" id="locations" multiple>
                                                        <option>Global</option>
                                                        <option>USA</option>
                                                        <option>France</option>
                                                        <option>Vietnam</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>Ages</CardTitle>
                                                    <Input type="select" name="Ages" id="Ages" multiple>
                                                        <option>5-12</option>
                                                        <option>12-18</option>
                                                        <option>18-30</option>
                                                        <option>30-45</option>
                                                        <option>45-60</option>
                                                    </Input>
                                                </FormGroup>
                                                
                                                 <div>   
                                                    <CardTitle>Gender</CardTitle>
                                                    <FormGroup>
                                                        <div>
                                                            <FormGroup check>
                                                                <Input type="checkbox" />
                                                                <Label check>
                                                                    Male
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup check>
                                                                <Input type="checkbox" />
                                                                <Label check>
                                                                    Female
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup check>
                                                                <Input type="checkbox" />
                                                                <Label check>
                                                                    Other
                                                                </Label>
                                                            </FormGroup>
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                                <FormGroup>
                                                    <CardTitle>Impression Goal</CardTitle>
                                                    <Input type="number" name="impression" id="impression" placeholder="1000000"/>
                                                </FormGroup>
                                                <FormGroup>
                                                    <CardTitle>DATE RANGE</CardTitle>
                                                    <Label for="from">From</Label>
                                                    <Input type="text" name="from" id="from" placeholder="20/08/2022"/>
                                                    <Label for="from">To</Label>
                                                    <Input type="text" name="to" id="to" placeholder="20/08/2022"/>
                                                </FormGroup>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            }
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    watchVideo: state.ThemeOptions.watchVideo,
    oxyadsTokenBalance: state.WalletOptions.oxyadsTokenBalance,
});

const mapDispatchToProps = dispatch => ({
    setWatchVideo: videoId => dispatch(setWatchVideo(videoId)),
    setOxyadsTokenBalance: tokens => dispatch(setOxyadsTokenBalance(tokens)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaignDashboard);
