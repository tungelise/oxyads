import React, { useState, useRef, useEffect } from 'react';
import './Newtab.css';
import './Newtab.scss';
import Suggestions from './components/Suggestions';

const Newtab = () => {

  const [minute, setMinute] = useState("20");
  const [hour, setHour] = useState("10");
  const [greeting, setGreeting] = useState("Good Morning");
  const [name, setName] = useState("Alex");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ 'type': 'oxy_new_tab', 'data': '' }, (response) => {
        console.log('send new_tab: new_tab', response);
      });
    });

    /*
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      console.log('popup oxy_result_nb_track_blocked', message);
      if (message.type == "oxy_result_nb_track_blocked") {
        if (message && message['data']) {
          setTrackerBlocked(message['data']);
        }
        sendResponse({ "rs": "ok" });
      }
    });
    */
  }, []);

  setInterval(() => {
    var today = new Date();
    setHour((today.getHours() < 10 ? "0" + today.getHours() : today.getHours()));
    setMinute((today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()));

    if (today.getHours() < 12) {
      setGreeting("Good Morning");
    } else if (today.getHours() < 19) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, 60);

  return (
    <div className="App container">

      <div className="wallpaper wallpaper--active"></div>

      <div className="blocks">
        <div className="widget">
          <div className="block_1 row">
            <div className="col-2">
              <div className="title">Balance</div>
              <div className="info">74 points</div>
            </div>
            <div className="col-2">
              <div className="title">Opened today</div>
              <div className="info">3 Tabs</div>
            </div>
            <div className="col-2">
              <div className="title">Mode</div>
              <div className="info">Rewards</div>
            </div>
            <div className="col-2">
              <div className="title">Trackers blocked</div>
              <div className="info">42.59k</div>
            </div>
          </div>

          <div className="c-bookmarks">
            <h2 className="widget__heading">Shortcuts</h2>
            <ol className="list">
              <li className="bookmark bookmark--add" title="Add Shortcut">
                <div type="button" className="bookmark__click">
                  <div className="bookmark__icon">+</div>
                  <div className="bookmark__name">Add Shortcut</div>
                </div>
              </li>
            </ol>
          </div>

          <div>
            <div className="title">Suggestions</div>
            <Suggestions />
          </div>
        </div>

        <div className="time">
          <div className="inner">
            <div className="clock">
              <span className="unit unit--hours">{hour}</span>
              <span className="sep">:</span>
              <span className="unit unit--minutes">{minute}</span>
            </div>

            <div className="c-greeting">
              <div className="c-greeting__intro">
                <span className="greeting__hi">{greeting} </span>
                <span className="greeting__name">{name}</span>
              </div>
              <div className="c-link mt-3">
                <a className="c-account-link" href="http://app.oxyads.com:6001/#/dashboards/profile">View my Dashboard</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Newtab;
