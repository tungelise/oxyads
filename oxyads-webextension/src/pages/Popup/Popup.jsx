import React, { useState, useRef, useEffect } from 'react';
import { getHostname } from '../../services/util';
import './Popup.css';

const Popup = () => {

  const [trackerBlocked, setTrackerBlocked] = useState(0);
  const [hostname, setHostname] = useState("");
  const [mode, setMode] = useState(1);
  const [point, setPoint] = useState(74);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs);
      if (tabs && tabs[0]) {
        setHostname(getHostname(tabs[0]['url']));
        console.log('popup: request get_nb_track_blocked on ', tabs[0]['id']);

        chrome.runtime.sendMessage({ 'type': 'get_nb_track_blocked', 'data': '' + tabs[0]['id'] }, (response) => {
          console.log('popup: get_nb_track_blocked', response);
          if (response && response['rs']) {
            setTrackerBlocked(response['rs']);
          }
        });
      }
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      console.log('popup oxy_result_nb_track_blocked', message);
      if (message.type == "oxy_result_nb_track_blocked") {
        if (message && message['data']) {
          setTrackerBlocked(message['data']);
        }
        sendResponse({ "rs": "ok" });
      }
    });
  }, []);

  const toggleMode = (mode) => {
    setMode(mode);
  }

  return (
    <div className="popup">
      <header className="header">
        <h1 className="heading">OxyAds</h1>

        <div className="">
          <div className="">
            <button type="button" onClick={() => setMode(1)} className={`btn ${mode == 1 ? "btn-primary" : "btn-light"}`}>Rewards</button>
            <button type="button" onClick={() => setMode(2)} className={`btn ${mode == 2 ? "btn-primary" : "btn-light"}`}>Privacy</button>
          </div>
        </div>
      </header>

      <section className="section">
        <a href="" className="c-balance">
          <div className="c-balance__value"> {point} </div>
          <div className="c-balance__label">Points</div>
        </a>
      </section>
      <section className="section  section--counter">
        <div className="c-counter">
          <div className="c-counter__blocked">

            {mode == 1 &&
              <div className="c-counter__section">
                <span className="c-counter__section--count">0</span>
                <p className="c-counter__section--title">Ads Replaced</p>
              </div>
            }

            <div className="c-counter__section">
              <span className="c-counter__section--count">{trackerBlocked}</span>
              <p className="c-counter__section--title">Trackers Blocked</p>
            </div>
          </div>
          <div className="c-counter__active">{hostname}</div>
        </div>
      </section>
      <div className="c-dashboard-links">
        <div className="link link--prefs text-center">
          <a href="http://app.oxyads.com:6001/#/dashboards/profile">Preferences</a>
        </div>
        <div className="link link--marketplace text-center">
          <a href="http://app.oxyads.com:6001/#/dashboards/marketplace">Marketplace</a>
        </div>
      </div>
    </div>
  );
};

export default Popup;
