"use client"
import React, { useState, useEffect } from 'react';
import { GET, POST } from "../api/Settings/page";
import styles from './AccountSettings.module.css';

const AccountSettings: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState<any>({}); // State variable to store user data

  useEffect(() => {
    // Fetch user data when component mounts
    async function fetchUserData() {
      try {
        const response = await GET(); // Call the GET function to fetch user data
        const data = await response.json();
        setUserData(data[0]); // Update state with fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  const handleModifyClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    setIsEditable(false);
    try {
      // Assuming userData contains a userID property and the updated user data
      const { userID, ...newData } = userData;
      const response = await POST(userID, newData);
      const result = await response.json();
      console.log(result.message); // Log the response message
    } catch (error) {
      console.error("Error saving user data:", error);
    }
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
                          <div className={`mt-12 max-md:mt-10 ${styles.fontMiddleSection}`}>Basic Information</div>
                          <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                            <div className="my-auto text-base">Username:</div>
                            {isEditable ? (
                                <input
                                  type="text"
                                  value={userData.username}
                                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                />
                              ) : (
                                userData.username
                            )}
                          </div>
                          <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                            <div className="my-auto text-base">Name:</div>
                            {isEditable ? (
                                <input
                                  type="text"
                                  value={userData.name}
                                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                              ) : (
                                userData.name
                            )}
                          </div> 
                          <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                            <div className="my-auto text-base">Date of birth:</div>
                            {isEditable ? (
                                <input
                                  type="text"
                                  value={userData.dob}
                                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                                />
                              ) : (
                                userData.dob
                            )}
                          </div> 
                          <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                            <div className="my-auto text-base">Business:</div>
                            {isEditable ? (
                                <input
                                  type="text"
                                  value={userData.business}
                                  onChange={(e) => setUserData({ ...userData, business: e.target.value })}
                                />
                              ) : (
                                userData.business
                            )}
                          </div> 
                          <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                            <div className="my-auto text-base">Member Since:</div>
                            {isEditable ? (
                                <input
                                  type="text"
                                  value={userData.memberSince}
                                  onChange={(e) => setUserData({ ...userData, memberSince: e.target.value })}
                                />
                              ) : (
                                userData.memberSince
                            )}
                          </div>  
                        </div>
                        <div className={`mt-12 max-md:mt-10 ${styles.fontMiddleSection}`}>Email Address</div>
                        <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                          <div className="my-auto text-base">Email:</div>
                          {isEditable ? (
                              <input
                                type="text"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                              />
                            ) : (
                              userData.email
                          )}
                        </div>
                        <div className={`mt-12 max-md:mt-10 ${styles.fontMiddleSection}`}>Phone Number</div>
                        <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                          <div className="text-base">Phone Number:</div>
                          {isEditable ? (
                              <input
                                type="text"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                              />
                            ) : (
                              userData.phone
                          )}
                        </div>
                      </div>
                      <div className={`mt-12 max-md:mt-10 ${styles.fontMiddleSection}`}>Region Settings</div>
                      <div className="flex gap-5 justify-between self-start mt-9 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                        <div className="text-base">Country:</div>
                        {isEditable ? (
                              <input
                                type="text"
                                value={userData.country}
                                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                              />
                            ) : (
                              userData.country
                          )}
                        </div>
                      <div className="flex gap-5 justify-between self-start mt-12 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                        <div className="text-base">Language:</div>
                        {isEditable ? (
                              <input
                                type="text"
                                value={userData.language}
                                onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                              />
                            ) : (
                              userData.language
                          )}
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
                <div className={`mt-12 max-md:mt-10 ${styles.aboutContainer}`}>
                  <div className="text-base">About:</div>
                  {isEditable ? (
                    <input
                      type="text"
                      value={userData.about}
                      onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                    />
                  ) : (
                    <div className={styles.aboutText}>{userData.about}</div>
                  )}
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
