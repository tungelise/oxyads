import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';

import {
    faCalendarAlt,
    faAngleDown,
    faEye

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import 'react-toastify/dist/ReactToastify.css';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

import {
    setEthMetamaskConnected,
    setEthWalletAddress,
    setOxyadsTokenBalance
} from '../../../reducers/WalletOptions';
import Web3 from 'web3';
import { signInWithNearWallet, signOutNearWallet } from '../../../near-api';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

        this.detectCurrentProvider = this.detectCurrentProvider.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.onConnectNear = this.onConnectNear.bind(this);
        this.onDisconnectNear = this.onDisconnectNear.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.checkConnectedWallet = this.checkConnectedWallet.bind(this);
        this.checkConnectedWallet();
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    checkConnectedWallet = () => {
        let {ethWalletAddress, setEthWalletAddress, setOxyadsTokenBalance} = this.props;
        const userData = JSON.parse(localStorage.getItem('nyinf'));
        if (userData != null) {
          setEthWalletAddress(userData.account);
          setOxyadsTokenBalance(userData.oxyadsTokenBalance);
        }
    }

    detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
          provider = window.ethereum;
        } else if (window.web3) {
          // eslint-disable-next-line
          provider = window.web3.currentProvider;
        } else {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
        }
        return provider;
    };

    onConnectNear = async () => {
        signInWithNearWallet();
    }

    onConnect = async () => {
        try {
          let {ethWalletAddress, setEthWalletAddress} = this.props;
          
          const currentProvider = this.detectCurrentProvider();
          if (currentProvider) {
            if (currentProvider !== window.ethereum) {
              console.log(
                'Non-Ethereum browser detected. You should consider trying MetaMask!'
              );
            }

            await currentProvider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(currentProvider);
            const userAccount = await web3.eth.getAccounts();
            const chainId = await web3.eth.getChainId();
            let account = userAccount[0];
            let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
            ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei

            const usrInfo = {
                // account: account,
                account: account,
                balance: ethBalance,
                connectionid: chainId,
                oxyadsTokenBalance: 0
            };
            window.localStorage.setItem('nyinf', JSON.stringify(usrInfo));
            
            // saveUserInfo(ethBalance, account, chainId);
            console.log('userinfo: ', ethBalance, account, chainId);
            setEthWalletAddress(account);

            if (userAccount.length === 0) {
              console.log('Please connect to meta mask');
            }
          }
        } catch (err) {
          console.log(
            'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
          );
        }
    };

    onDisconnectNear = () => {
        signOutNearWallet();
    };
    
    onDisconnect = () => {
        let {ethWalletAddress, setEthWalletAddress, oxyadsTokenBalance} = this.props;
        window.localStorage.removeItem('nyinf');
        setEthWalletAddress('');
    };

    render() {
        // get state here
        let {
            ethWalletAddress,
            oxyadsTokenBalance
        } = this.props;

        return (
            <Fragment>
                <div className="header-btn-lg pe-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">

                            <div className="widget-content-right header-user-info ms-3">
                                {window.location.hostname == 'advertiser.oxyads.com' && !window.walletConnection.isSignedIn() && (
                                    <Button className="btn-shadow p-1" size="sm" onClick={this.onConnectNear} color="info">
                                        Connect Wallet Near
                                    </Button>
                                )}

                                {window.location.hostname == 'advertiser.oxyads.com' && window.walletConnection.isSignedIn() && (
                                    <>
                                        <span>{window.accountId}</span>
                                        <Button className="btn-shadow p-1 m-2" size="sm" onClick={this.onDisconnectNear} color="danger">
                                            Disconnect
                                        </Button>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    ethMetamaskConnected: state.WalletOptions.ethMetamaskConnected,
    ethWalletAddress: state.WalletOptions.ethWalletAddress,
    oxyadsTokenBalance: state.WalletOptions.oxyadsTokenBalance,
});

const mapDispatchToProps = dispatch => ({
    setEthMetamaskConnected: connected => dispatch(setEthMetamaskConnected(connected)),
    setEthWalletAddress: add => dispatch(setEthWalletAddress(add)),
    setOxyadsTokenBalance: add => dispatch(setOxyadsTokenBalance(add)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);