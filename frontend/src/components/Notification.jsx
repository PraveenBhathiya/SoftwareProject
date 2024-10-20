import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Notification = ({ role }) => {
  const navigate = useNavigate();

  const { email } = useContext(UserContext);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [batch, setBatch] = useState("");
  const [description, setDescription] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [notificationCreated, setNotificationCreated] = useState(false);

  const handleNotificationTitle = (event) => {
    setNotificationTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleBatch = (event) => {
    setBatch(event.target.value);
    console.log(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmitClick = async () => {
    setIsFormSubmitted(true);
    if (!notificationTitle || !batch || !description || !email) {
      console.log("Enter all details");
      setValidateError(true);
      setIsFormSubmitted(false);
    }

    const timestamp = Date.now();
    const date = new Date(timestamp);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/notification/create",
        {
          title: notificationTitle,
          batch: Number(batch),
          description: description,
          time: date.toLocaleString(),
          userEmail: email,
          role: role,
        }
      );

      if (response.data.success == true) {
        setNotificationCreated(true);
        setIsFormSubmitted(false);

        setTimeout(() => {
          navigate("/teacherDashboard");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setValidateError(true);
      setIsFormSubmitted(false);
    }
  };

  useEffect(() => {
    if (validateError) {
      setTimeout(() => {
        setValidateError(false);
      }, 3000);
    }
  }, [validateError]);

  // Adding the curretn user email to email list

  return (
    <>
      <div class="max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8 mx-auto">
        <div class="max-w-xl mx-auto">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl">
              Create Notice
            </h1>
            <p class="mt-1 text-gray-600">Start your next Innovation</p>
          </div>

          <div class="mt-12">
            <div>
              <div class="grid gap-4 lg:gap-6">
                <div class="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">
                  <div>
                    <label
                      for="hs-company-hire-us-2"
                      class="block mb-2 text-sm text-gray-700 font-medium"
                    >
                      Title
                    </label>
                    <input
                      value={notificationTitle}
                      onChange={handleNotificationTitle}
                      type="text"
                      name="hs-company-hire-us-2"
                      id="hs-company-hire-us-2"
                      class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    for="hs-lastname-hire-us-2"
                    class="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Batch
                  </label>
                  <form class="w-full mx-auto">
                    <select
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                      value={batch}
                      onChange={handleBatch}
                    >
                      <option selected></option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                    </select>
                  </form>
                </div>

                <div>
                  <label
                    for="hs-about-hire-us-2"
                    class="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Notification Content
                  </label>
                  <textarea
                    value={description}
                    onChange={handleDescription}
                    id="hs-about-hire-us-2"
                    name="hs-about-hire-us-2"
                    rows="4"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  ></textarea>
                </div>
              </div>

              {validateError && (
                <div className="mt-4">
                  <div
                    class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                    role="alert"
                  >
                    <svg
                      class="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Error!</span> Error in adding
                      the project
                    </div>
                  </div>
                </div>
              )}

              {notificationCreated && (
                <div className="mt-4">
                  <div
                    class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                    role="alert"
                  >
                    <svg
                      class="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                      <span class="font-medium">Success!</span> Notice added
                      Successfully
                    </div>
                  </div>
                </div>
              )}

              {isFormSubmitted == false ? (
                <div class="mt-6 grid">
                  <button
                    onClick={() => {
                      handleSubmitClick();
                    }}
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Create new Notice
                  </button>
                </div>
              ) : (
                <div class="mt-6 grid">
                  <button
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-white hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ClipLoader color="#3498db" loading={true} size={20} />
                    Creating ...
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
