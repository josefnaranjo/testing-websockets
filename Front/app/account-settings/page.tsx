import React from 'react';

const AccountDetails: React.FC = () => {
  return (
    <div className="roboto flex flex-col items-center px-16 pt-5 pb-11 bg-white max-md:px-5 ">
      <div className="py-4 pr-12 pl-3.5 max-w-full border border-black border-solid w-[1109px] max-md:pr-5 bg-gradient-to-b from-green-100 via-green-300 ">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
              <div className="pr-32 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow py-9 pr-px mr-0 w-full text-4xl text-black rounded border border-white shadow-xl border-solid max-md:mt-10 max-md:max-w-full bg-gradient-to-bl from-green-100 via-green-300 to-emerald-700">
                      <div className="self-center text-emerald-800">
                        User Settings
                      </div>
                      <div className="flex flex-col justify-between mt-7 max-md:max-w-full">
                        <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                          About Me
                        </button>
                        <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                          Privacy Settings
                        </button>
                        <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                          Devices
                        </button>
                        <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                          Friend Requests
                        </button>
                      </div>
                      <div className="self-center mt-6 mb-6 text-emerald-800">
                        App Settings
                      </div>
                      <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                        Customize
                      </button>
                      <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                        Language
                      </button>
                      <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                        Advanced
                      </button>
                      <button type="button" className="ml-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-green-700 bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-9 py-3.5 whitespace-nowrap border max-w-[90%] max-md:px-5 max-md:max-w-full dark:bg-green-600 hover:bg-yellow-300 dark:focus:ring-green-800">
                        Chat
                      </button>
                      <button type="button" className="mt-auto mx-4 justify-center items-start focus:outline-none text-white text-2xl hover:text-amber-400 hover:bg-red-800 bg-green-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full px-9 py-3.5 whitespace-nowrap border max-md:px-5 max-md:max-w-full dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Sign Out
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col justify-between mt-3.5 text-black max-md:mt-10">
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex flex-col justify-between self-start text-base">
                          <div className="text-3xl text-emerald-800">Basic Information</div>
                          <div className="mt-9">[Username]</div>
                          <div className="mt-9 ">[Name]</div>
                          <div className="mt-9">[Date of Birth]</div>
                          <div className="mt-9">[Business]</div>
                          <div className="mt-9">[Member Since]</div>
                        </div>
                        <div className="mt-14 text-3xl max-md:mt-10 text-emerald-800">Email Address</div>
                        <div className="flex gap-5 justify-between self-start mt-12 whitespace-nowrap max-md:pr-5 max-md:mt-10">
                        <div className="my-auto text-base">[Email]</div>
                        <button className="justify-center px-6 py-3 text-xs rounded-xl bg-emerald-400 hover:bg-orange-400 max-md:px-5">Modify</button>
                        </div>
                        <div className="mt-12 text-3xl max-md:mt-10 text-emerald-800">Phone Number</div>
                        <div className="flex justify-between items-center mt-2 max-md:mt-10"> {/* Flex container with justify-between */}
                        <div className="text-base ">[Phone Number]</div>
                        <button className="px-6 py-3 text-xs rounded-xl bg-emerald-400 hover:bg-orange-400 max-md:px-5">Modify</button>
                    </div>
                  </div>
                      <div className="mt-6 text-3xl text-emerald-800">Region Settings</div>
                      <div className="mt-8 text-base">[Country]</div>
                      <div className="flex gap-5 justify-between self-start mt-3.5 whitespace-nowrap">
                        <div className="self-start mt-4 text-base">
                          [Language]
                        </div>
                        <button className="justify-center px-6 py-3 text-xs rounded-xl bg-emerald-400 hover:bg-orange-400 max-md:px-5">
                          Modify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="justify-center self-end px-5 py-3.5 mt-14 mr-40 text-xs text-black bg-red-400 rounded-xl max-md:pr-5 max-md:mt-10 max-md:mr-2.5 hover:bg-red-600">
                Delete Account
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-10">
              <div className="flex flex-col pr-px pl-8 max-md:pl-5">
                <div className="flex overflow-hidden relative flex-col items-end self-start px-16 pt-20 pb-36 ml-0 aspect-square max-w-[236px] max-md:px-5">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/86bb4ecfb1535e254e4314bbcb4638396e57940199e9369d6a1260ca6e6284a2?apiKey=15594f3247654119829779c6d3e94932&"
                    className="object-cover absolute inset-0 size-full"
                    style={{ zIndex: 1 }} // Set the zIndex to 1 for the first image
                  />
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b873e2ddaae8e5ec6710a8b2e9cf768f18c81211abc65b6cb2224148aff6181?apiKey=15594f3247654119829779c6d3e94932&"
                    className="mt-28 mr-8 w-6 aspect-square max-md:mt-10"
                    style={{ zIndex: 2 }} // Set the zIndex to 2 for the second image
                  />
                </div>
                <div className="self-center mt-10 ml-px text-base text-black">
                  About...
                </div>
              </div>
              <button className="flex items-center justify-center mt-10 mb-1.5 text-sm text-black whitespace-nowrap rounded-xl bg-emerald-400 hover:bg-orange-400 px-5 py-3.5 max-md:px-5 max-md:mt-10">
                Change Profile Picture
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
