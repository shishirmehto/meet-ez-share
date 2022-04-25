import React, { useEffect, useState } from 'react';
import './Popup.css';
import MeetIcon from '../../assets/img/meet.svg';

const Popup = () => {
  const [emailId, setEmailId] = useState('');
  const [userInfo, setUserInfo] = useState({
    firstName: 'shishir',
    lastName: 'Mehto',
    initials: 'S',
    color: 'black',
  });
  const [meetId, setMeetId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //on mount check email id

    chrome.storage.sync.get(['meetID'], (result) => {
      console.log('Value currently is ' + result.meetID);
      setMeetId(result.meetID);
    });

    chrome.storage.sync.get(['emailId'], (result) => {
      console.log('Value currently is ' + result);
      setEmailId(result.emailId);
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === 'something_completed') {
        setIsLoading(false);
        setMeetId(request.meetID);
        setEmailId(request.mail);
      }
      if (request.msg === 'copy_link') {
        this.handleCopyToClipboard();
      }
      if (request.msg === 'user_changed') {
        setIsLoading(false);
      }
      if (request.msg === 'btn_press') {
        setIsLoading(true);
      }
    });

    return () => {
      //on unmount can remove the email id
    };
  }, []);

  const handleCreateMeeting = () => {
    console.log('will create a meeting');
    setIsLoading(true);
    chrome.runtime.sendMessage({ message: 'get_event' });
  };

  const handleCopyToClipboard = () => {
    console.log('this will copy to clipboard');
    let content = document.getElementById('con');
    content.select();
    document.execCommand('copy');
  };

  // const loginUser = () => {
  //   setEmailId('shishir.mehto@gmail.com');
  //   setMeetId('abc@123');
  // };

  // const logoutUser = () => {
  //   setEmailId('');
  //   setMeetId('');
  // };

  const switchUser = () => {
    setEmailId('');
    setMeetId('');
    setIsLoading(true);

    chrome.storage.sync.set({ meetID: '' }, function () {
      console.log('Value is set to null');
    });
    chrome.storage.sync.set({ email: '' }, function () {
      console.log('Value is set to null');
    });

    chrome.runtime.sendMessage({ message: 'switch_user' });
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <div className="profile">
          <p onClick={switchUser} className="profile-options">
            Switch user
          </p>
        </div>
      </div>

      <div>{emailId && <p className="footer">Logged in as: {emailId}</p>}</div>

      <div className="content">
        <div className="container">
          <div className="meet">
            <div className="icon">
              <img src={MeetIcon} width="40px" alt="" />
            </div>
            <button
              className="meet-button"
              onClick={handleCreateMeeting}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <span>&#x2b; &nbsp;New meeting</span>
              )}
            </button>
          </div>
          <div className="shortcut">
            <p className="clipboard-para">
              Click above button create a new meeting
            </p>
          </div>
        </div>
        {meetId && (
          <div className="clipboard">
            <div>
              <input
                className="clipboard-input"
                id="con"
                onClick={handleCopyToClipboard}
                value={`${meetId}`}
                readOnly="readOnly"
              />
              <p className="clipboard-para">Click above to copy the Link</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
