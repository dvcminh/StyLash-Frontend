import React from "react";
import { AddressBook } from "phosphor-react";
import { Link } from "react-router-dom";

import IconEmailOutline from "../../assets/icon/IconEmailOutline";
import IconPhone from "../../assets/icon/IconPhone";
import "./profile.css";

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  
  return (
    <section className="bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="..."
                    src={userData.avatar}
                    className="shadow-xl rounded-full h-auto align-middle border-none w-52 h-52 max-w-100-px max-h-100-px mt-12"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 header">
                {userData.firstname} {userData.lastname}
              </h2>
              <div className="mb-2 text-blueGray-600 mt-14">
                <AddressBook size={24} className="inline-block mr-2 mb-1" />
                {userData.address}
              </div>
              <div className="mb-2 text-blueGray-600 mt-4">
                <IconEmailOutline className="inline-block mr-2 mb-2" />
                {userData.email}
              </div>
              <div className="mb-2 text-blueGray-600 mt-4">
                <IconPhone className="inline-block mr-2 mb-2" />
                {userData.phoneNumber}
              </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  "Fashions fade, style is eternal."
                      <br />- <b>Yves Saint Laurent</b>
                  </p>
                  <Link
                    to="/edit-profile"
                    className="font-normal text-pink-500"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
