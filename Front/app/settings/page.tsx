"use client"
import React, { useState } from 'react';
import styles from './AccountSettings.module.css';

const AccountSettings: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState('');

  const handleModifyClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    // Add code to save the updated values to backend
  };

  const handleCancelClick = () => {
    setIsEditable(false);
    // Add code to reset the form or discard changes
  };
  
  const userStgsBtns = [
    { text: 'About Me' },
    { text: 'Privacy Settings' },
    { text: 'Devices' },
    { text: 'Friend Requests' },
  ];

  const appStgsBtns = [
    { text: 'Customize' },
    { text: 'Language' },
    { text: 'Advanced' },
    { text: 'Chat' },
  ];
  
  return (
    <div className={`roboto ${styles.container}`}>
      <div className={`py-4 pr-12 pl-3.5 ${styles.header}`}>
        <div className={`flex gap-5 max-md:flex-col max-md:gap-0 ${styles.contentWrapper}`}>
          <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
              <div className="pr-32 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className={`flex flex-col w-3/5 max-md:ml-0 max-md:w-full ${styles.leftSection}`}>
                    <div className={styles.leftContainer}>
                      <div className={styles.fontLeftMenu}>
                        User Settings
                      </div>
                      <div className={styles.buttonsLeftMenu}>
                        {userStgsBtns.map((button, index) => (
                          <button 
                            key={index} 
                            type="button" 
                            className={styles.leftBtns}
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                      <div className={`mt-8 mb-6 ${styles.fontLeftMenu}`}>
                        App Settings
                      </div>
                      <div className={styles.buttonsLeftMenu}>
                        {appStgsBtns.map((button, index) => (
                          <button 
                            key={index} 
                            type="button" 
                            className={styles.leftBtns}
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                      <button type="button" className={styles.signOutBtn}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                  <div className={`flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full ${styles.rightSection}`}>
                    <div className="flex flex-col justify-between mt-3.5 text-black max-md:mt-10">
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex flex-col justify-between self-start text-base">
                          <div className={styles.fontMiddleSection}>Basic Information</div>
                          <div className="mt-9">
                            <div className="text-base text-black">Username:</div>
                            {isEditable ? (
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            ) : (
                              username
                            )}
                          </div>
                          <div className="mt-9 ">[Name]</div>
                          <div className="mt-9">[Date of Birth]</div>
                          <div className="mt-9">[Business]</div>
                          <div className="mt-9">[Member Since]</div>
                        </div>
                        <div className="mt-14 max-md:mt-10">Email Address</div>
                        <div className="flex gap-5 justify-between self-start mt-12 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                          <div className="my-auto text-base">[Email]</div>
                        </div>
                        <div className={`mt-12 max-md:mt-10 ${styles.fontMiddleSection}`}>Phone Number</div>
                        <div className="flex gap-5 justify-between items-center mt-2 max-md:mt-10">
                          <div className="text-base ">[Phone Number]</div>
                        </div>
                      </div>
                      <div className={`mt-6 ${styles.fontMiddleSection}`}>Region Settings</div>
                      <div className="mt-8 text-base">[Country]</div>
                      <div className="flex gap-5 justify-between self-start mt-3.5 whitespace-nowrap">
                        <div className="self-start mt-4 text-base">
                          [Language]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center ml-auto mt-6">
                <div className="flex">
                  {isEditable ? (
                    <>
                      <button
                        className={styles.bottomMenuBtnsPos}
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        className={styles.bottomMenuBtnsNeg}
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.bottomMenuBtnsPos}
                        onClick={handleModifyClick}
                      >
                        Modify
                      </button>
                      <button
                        className={styles.bottomMenuBtnsNeg}
                      >
                        Delete Account
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full mr-2">
            <div className="flex flex-col max-md:mt-10">
              <div className="flex flex-col pr-px pl-8 max-md:pl-5">
                <div className="flex overflow-hidden relative flex-col items-end self-start px-16 pt-20 pb-36 ml-0 aspect-square max-w-[236px] max-md:px-5">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=100 100w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=200 200w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=400 400w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=800 800w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=1200 1200w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=1600 1600w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=2000 2000w, 
                    https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&"
                    className="object-cover absolute inset-0 size-full"
                    style={{ zIndex: 1 }}
                  />
                </div>
                <div className="self-center mt-10 ml-px text-base text-black">
                  About...
                </div>
              </div>
              <button className={styles.changeProfilePicBtn}>
                Change Profile Picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
