import React, { useState, useRef } from 'react';
import { callApi } from '../../../services/http';
import './suggestions.css';

const Suggestions = (props) => {
    const [state, setState] = useState({
        loading: false,
    });

    return (
        <div className="mt-2 c-suggestions">
            <ol className="list">
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://www.google.com" title="https://www.google.com">
                        <div className="bookmark__icon">
                            <img width="16" height="16" src="https://static-02.veve.com/rc/36x36/29c5e4f4b49b5cfe.png" />
                        </div>
                        <div className="bookmark__name">Lazada</div>
                    </a>
                </li>
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://www.google.com" title="https://www.google.com">
                        <div className="bookmark__icon">
                            <img width="16" height="16" src="https://static-02.veve.com/rc/36x36/37e01dbac4e5e2d2.png" />
                        </div>
                        <div className="bookmark__name">Tiki</div>
                    </a>
                </li>
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://www.google.com" title="https://www.google.com">
                        <div className="bookmark__icon">
                            <img width="16" height="16" src="https://static-02.veve.com/rc/36x36/52c4891cd0d31637.png" /></div>
                        <div className="bookmark__name">AliExpress</div>
                    </a>
                </li>
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://www.google.com" title="https://www.google.com">
                        <div className="bookmark__icon"><img width="16" height="16" src="https://www.google.com/s2/favicons?sz=32&amp;domain_url=www.google.com" alt="https://www.google.com" /></div>
                        <div className="bookmark__name">Google</div>
                    </a>
                </li>
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://en.wikipedia.org/wiki/Main_Page" title="https://en.wikipedia.org/wiki/Main_Page">
                        <div className="bookmark__icon"><img width="16" height="16" src="https://www.google.com/s2/favicons?sz=32&amp;domain_url=en.wikipedia.org" alt="https://en.wikipedia.org/wiki/Main_Page" /></div>
                        <div className="bookmark__name">Wikipedia</div>
                    </a>
                </li>
                <li className="bookmark bookmark--link">
                    <a className="bookmark__click" href="https://www.ebay.co.uk/" title="https://www.ebay.co.uk/">
                        <div className="bookmark__icon">
                            <img width="16" height="16" src="https://tabs.gener8ads.com/kayak-icon.c32be092.png" /></div>
                        <div className="bookmark__name">eBay</div>
                    </a>
                </li>
            </ol>
        </div>
    );
};

export default Suggestions;
