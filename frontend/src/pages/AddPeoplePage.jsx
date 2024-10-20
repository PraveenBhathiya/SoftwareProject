import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPeoplePage = () => {
  const navigate = useNavigate();

  // Register
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [teacherRegNumber, setTeacherRegNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [logInError, setLogInError] = useState("");
  const [validateError, setValidateError] = useState(false);
  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value); // Get the name
    console.log(event.target.value);
  };

  const handleTeacherRegNumber = (event) => {
    setTeacherRegNumber(event.target.value); // Get the name
    console.log(event.target.value);
  };

  const handleEmailChangeForLogin = (event) => {
    setEmail(event.target.value); // Get the email for login
    console.log(event.target.value);
  };

  const handlePasswordChangeForLogin = (event) => {
    setPassword(event.target.value); // get the password for login
    console.log(event.target.value);
  };

  const handleSelectChangeForLogin = (event) => {
    console.log(event.target.value);
    setSelectedRole(event.target.value); // Update the state with the selected role
  };

  const handlePhone = (event) => {
    console.log(event.target.value);
    setPhone(event.target.value); // Get the phone number
  };

  const handleTeacherRegisterClick = async () => {
    setIsLoginFormSubmitted(true);
    if (!email || !name || !teacherRegNumber || !phone || !password) {
      setIsLoginFormSubmitted(false);
      setValidateError(true);
      setLogInError("Enter all details");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/registerTeacher",
          {
            name: name,
            indexNumber: teacherRegNumber,
            role: selectedRole,
            email: email,
            phone: phone,
            password: password,
          }
        );

        if (response.data.success) {
          navigate("/adminDashboard");
          setIsLoginFormSubmitted(false);
          toast("Teacher registation successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        setIsLoginFormSubmitted(false);
        setValidateError(true);
        setLogInError("Error in regsitation. Try again");
      }
    }
  };
  return (
    <div>
      <div>
        <div>
          <div class="lg:max-w-lg h-screen items-center  justify-center lg:mx-auto lg:pt-8">
            <div class="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800">
                  Register a Teacher
                </h1>
              </div>

              <div class="mt-4">
                <div class="relative col-span-full mt-12">
                  <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                    <div class="relative ">
                      <input
                        value={name}
                        onChange={handleNameChange}
                        id="hs-hero-signup-form-floating-input-email"
                        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        placeholder="you@email.com"
                      />
                      <label
                        for="hs-hero-signup-form-floating-input-email"
                        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        Full Name
                      </label>
                    </div>
                  </div>
                  <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                    <div class="relative ">
                      <input
                        value={teacherRegNumber}
                        onChange={handleTeacherRegNumber}
                        id="hs-hero-signup-form-floating-input-email"
                        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        placeholder="you@email.com"
                      />
                      <label
                        for="hs-hero-signup-form-floating-input-email"
                        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        Department Reg No
                      </label>
                    </div>
                  </div>
                  <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                    <div class="relative ">
                      <input
                        value={email}
                        onChange={handleEmailChangeForLogin}
                        id="hs-hero-signup-form-floating-input-email"
                        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        placeholder="you@email.com"
                      />
                      <label
                        for="hs-hero-signup-form-floating-input-email"
                        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        Email
                      </label>
                    </div>
                  </div>

                  <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                    <div class="relative ">
                      <input
                        value={phone}
                        onChange={handlePhone}
                        id="hs-hero-signup-form-floating-input-email"
                        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        placeholder="you@email.com"
                      />
                      <label
                        for="hs-hero-signup-form-floating-input-email"
                        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        Mobile Number
                      </label>
                    </div>
                  </div>

                  <div class="relative col-span-full">
                    <div class="relative mb-4 border-2 border-zinc-200 rounded-lg">
                      <input
                        value={password}
                        onChange={handlePasswordChangeForLogin}
                        type="password"
                        id="hs-hero-signup-form-floating-input-new-password"
                        class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        placeholder="********"
                      />
                      <label
                        for="hs-hero-signup-form-floating-input-new-password"
                        class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        password
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-12">
                  <form class="w-full mx-auto">
                    <select
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-12"
                      value={selectedRole}
                      onChange={handleSelectChangeForLogin}
                    >
                      <option selected>Choose role</option>
                      <option value="TEACHER">Teacher</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </form>
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
                        <span class="font-medium">Error!</span> {logInError}
                      </div>
                    </div>
                  </div>
                )}

                <div class="mt-5">
                  {isLoginFormSubmitted == true ? (
                    <button
                      type="submit"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-300 text-white hover:bg-blue-300 focus:outline-none focus:bg-blue-300 disabled:opacity-50 disabled:pointer-events-none"
                      disabled={true}
                    >
                      <ClipLoader color="#3498db" loading={true} size={20} />
                      <p>Loading</p>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={() => {
                        handleTeacherRegisterClick();
                      }}
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPeoplePage;
