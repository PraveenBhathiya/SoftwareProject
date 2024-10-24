import React, { useContext } from "react";
import { LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const LandingPage = () => {
  // managin context
  const { email, setEmail } = useContext(UserContext);

  // handle navigation
  const navigate = useNavigate();

  const [isInLoginBlock, setIsInLoginBlock] = useState(true);
  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);
  const [validateError, setValidateError] = useState(false);

  // Login
  const [emailForLogin, setEmailForLogin] = useState("");
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState("");
  const [passwordForLogin, setPasswordForLogin] = useState("");
  const [logInError, setLogInError] = useState("");

  // Regsiter
  const [isRegsiterFormSubmitted, setIsRegsiterFormSubmitted] = useState(false);
  const [nameForRegister, setNameForRegister] = useState("");
  const [indexNumberForRegister, setIndexNumberForRegister] = useState("");
  const [emailForRegsiter, setemailForRegsiter] = useState("");
  const [mobileNumberForRegsiter, setMobileNumberForRegsiter] = useState("");
  const [teamNumberForRegsiter, setTeamNumberForRegsiter] = useState("");
  const [passwordForRegsiter, setPasswordForRegsiter] = useState("");
  const [batchForRegsiter, setbatchForRegsiter] = useState(null);
  const [registerError, setregisterError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // For Login
  const handleEmailChangeForLogin = (event) => {
    setEmailForLogin(event.target.value); // Get the email for login
    console.log(event.target.value);
  };

  const handlePasswordChangeForLogin = (event) => {
    setPasswordForLogin(event.target.value); // get the password for login
    console.log(event.target.value);
  };

  const handleSelectChangeForLogin = (event) => {
    console.log(event.target.value);
    setSelectedRoleForLogin(event.target.value); // Update the state with the selected role
  };

  const handleLogin = async () => {
    setIsLoginFormSubmitted(true);
    try {
      if (!emailForLogin || !passwordForLogin || !selectedRoleForLogin) {
        setValidateError(true);
        setIsLoginFormSubmitted(false);
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/login",
          {
            email: emailForLogin,
            password: passwordForLogin,
          }
        );

        if (response.data.success == true) {
          console.log("login success");
          setIsLoginFormSubmitted(false);
          const userId = response.data.user._id;
          localStorage.setItem("jwtToken", response.data.token);
          setEmail(response.data.success);
          setEmail(response.data.user.email);
          console.log(response.data.user.role);
          if (response.data.user.role == "STUDENT") {
            console.log("Hello");
            navigate(`/dashboard/${userId}`);
          } else if (response.data.user.role == "TEACHER") {
            if (selectedRoleForLogin == "TEACHER") {
              navigate(`/teacherDashboard`);
            } else {
              setIsLoginFormSubmitted(false);
              setValidateError(true);
              setLogInError("Role mismatched");
            }
          } else if (response.data.user.role == "ADMIN") {
            // Check if the user given role is matches with response
            if (selectedRoleForLogin == "ADMIN") {
              navigate(`/adminDashboard`);
            } else {
              setIsLoginFormSubmitted(false);
              setValidateError(true);
              setLogInError("Role mismatched");
            }
          }
        } else {
          setIsLoginFormSubmitted(false);
          setValidateError(true);
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setLogInError(error.response.data.message);
      setIsLoginFormSubmitted(false);
      setValidateError(true);
    }
  };

  // For register
  const handleRegister = async () => {
    setIsRegsiterFormSubmitted(true);
    try {
      if (
        !nameForRegister ||
        !indexNumberForRegister ||
        !emailForRegsiter ||
        !mobileNumberForRegsiter ||
        !teamNumberForRegsiter ||
        !passwordForRegsiter
      ) {
        setregisterError("Provide valide details");
        setValidateError(true);
        setIsRegsiterFormSubmitted(false);
      }

      if (indexNumberForRegister.substring(0, 5) != "EG/20") {
        console.log("Index number should be in EG/20YY/XXXX format");
        setregisterError("Index number should be in EG/20YY/XXXX format");
        setValidateError(true);
        setIsRegsiterFormSubmitted(false);
      } else if (passwordForRegsiter.length < 8) {
        setregisterError("password must have at least 8 characters");
        setValidateError(true);
        setIsRegsiterFormSubmitted(false);
      } else if (
        Number(batchForRegsiter) < 21 &&
        Number(batchForRegsiter) > 26
      ) {
        setregisterError("Enter vaild batch");
        setValidateError(true);
        setIsRegsiterFormSubmitted(false);
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/register",
          {
            name: nameForRegister,
            indexNumber: indexNumberForRegister,
            role: "STUDENT",
            email: emailForRegsiter,
            phone: mobileNumberForRegsiter,
            password: passwordForRegsiter,
            teamIndexNumber: teamNumberForRegsiter,
            batch: Number(batchForRegsiter),
          }
        );
        console.log(response);
        if (response.data.success) {
          console.log(response.data.success);
          setIsRegsiterFormSubmitted(false);
          setRegistrationSuccess(true);
          setTimeout(() => {
            setIsInLoginBlock(true);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error.response.data);
      setregisterError(error.response.data.message);
      setValidateError(true);
      setIsRegsiterFormSubmitted(false);
    }
  };

  const handleNameForRegsiter = (event) => {
    setNameForRegister(event.target.value);
    console.log(event.target.value);
  };

  const handleIndexNumberForRegsiter = (event) => {
    setIndexNumberForRegister(event.target.value);
    console.log(event.target.value);
  };

  const handleEmailForRegsiter = (event) => {
    setemailForRegsiter(event.target.value);
    console.log(event.target.value);
  };

  const handleMobileNumberForRegsiter = (event) => {
    setMobileNumberForRegsiter(event.target.value);
    console.log(event.target.value);
  };

  const handleTeamNumberForRegsiter = (event) => {
    setTeamNumberForRegsiter(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordForRegsiter = (event) => {
    setPasswordForRegsiter(event.target.value);
    console.log(event.target.value);
  };
  const handleBatchForRegsiter = (event) => {
    setbatchForRegsiter(event.target.value);
    console.log(event.target.value);
  };

  // Turn off the error message in 3 secounds
  useEffect(() => {
    if (validateError) {
      setTimeout(() => {
        setValidateError(false);
      }, 5000);
    }
    if (registrationSuccess) {
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
    }
  }, [validateError, registrationSuccess]);
  return (
    <>
      <div class="relative bg-gradient-to-bl from-blue-100 via-transparent">
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="h-36 w-20">
                <img
                  className="bg-contain bg-center"
                  src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"
                  alt="logo"
                />
              </div>
              <p class="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent">
                Faculty of Engineering - University of Ruhuna
              </p>

              <div class="mt-4 md:mb-12 max-w-2xl">
                <h1 class="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl">
                  Welcome to DEIE UGP Management System
                </h1>
                <p class="text-gray-600">
                  We are dedicated to ensuring a seamless experience. We pride
                  ourselves on providing fast and professional assistance.
                </p>
              </div>

              <blockquote class="hidden md:block relative max-w-sm">
                <svg
                  class="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                    fill="currentColor"
                  />
                </svg>

                <div class="relative z-10">
                  <p class="text-xl italic text-gray-800">
                    Streamline your projects and drive the innovation
                  </p>
                </div>

                <footer class="mt-3">
                  <div class="flex items-center gap-x-4">
                    <div class="shrink-0">
                      
                    </div>
                    <div class="grow">
                      
                      <div class="text-xs text-gray-500">
                        
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {isInLoginBlock == true ? (
              <div>
                <form>
                  <div class="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto lg:pt-8">
                    <div class="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
                      <div class="text-center">
                        <h1 class="block text-2xl font-bold text-gray-800">
                          Login
                        </h1>
                        <p class="mt-2 text-sm text-gray-600">
                          Not yet Sign up ?
                        </p>
                      </div>

                      <div class="mt-4">
                        <button
                          type="button"
                          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          onClick={() => {
                            setIsInLoginBlock((pre) => !pre);
                          }}
                        >
                          <LogIn size={16} />
                          Sign up Here
                        </button>

                        <div class="pt-12 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                          Or
                        </div>

                        <div class="relative col-span-full mt-12">
                          <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                            <div class="relative ">
                              <input
                                value={emailForLogin}
                                onChange={handleEmailChangeForLogin}
                                type="email"
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

                          <div class="relative col-span-full">
                            <div class="relative mb-4 border-2 border-zinc-200 rounded-lg">
                              <input
                                value={passwordForLogin}
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
                              value={selectedRoleForLogin}
                              onChange={handleSelectChangeForLogin}
                            >
                              <option selected>Choose role</option>
                              <option value="STUDENT">Student</option>
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
                                <span class="font-medium">Error!</span>{" "}
                                {logInError}
                              </div>
                            </div>
                          </div>
                        )}

                        <div class="mt-5">
                          {isLoginFormSubmitted == true ? (
                            <button
                              type="submit"
                              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-white hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                              disabled={true}
                            >
                              <ClipLoader
                                color="#3498db"
                                loading={true}
                                size={20}
                              />
                              <p>Loading</p>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                              onClick={() => {
                                handleLogin();
                              }}
                            >
                              Get started
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div>
                  <div class="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                    <div class="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg">
                      <div class="text-center">
                        <h1 class="block text-2xl font-bold text-gray-800">
                          Register
                        </h1>
                        <p class="mt-2 text-sm text-gray-600">
                          Already have an account?
                        </p>
                      </div>

                      <div class="mt-5">
                        <button
                          type="button"
                          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          onClick={() => {
                            setIsInLoginBlock((pre) => !pre);
                          }}
                        >
                          <LogIn size={16} />
                          Login Here
                        </button>

                        <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                          Or
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                            <div class="relative">
                              <input
                                value={nameForRegister}
                                onChange={handleNameForRegsiter}
                                type="text"
                                id="hs-hero-signup-form-floating-input-first-name"
                                class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                                placeholder="John"
                              />
                              <label
                                for="hs-hero-signup-form-floating-input-first-name"
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
                                Name
                              </label>
                            </div>
                          </div>

                          <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                            <div class="relative">
                              <input
                                value={indexNumberForRegister}
                                onChange={handleIndexNumberForRegsiter}
                                type="text"
                                id="hs-hero-signup-form-floating-input-last-name"
                                class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                                placeholder="EG/2020/0978"
                              />
                              <label
                                for="hs-hero-signup-form-floating-input-last-name"
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
                                Index Number
                              </label>
                            </div>
                          </div>

                          <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                            <div class="relative">
                              <input
                                value={batchForRegsiter}
                                onChange={handleBatchForRegsiter}
                                type="text"
                                id="hs-hero-signup-form-floating-input-last-name"
                                class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                                placeholder="EG/2020/0978"
                              />
                              <label
                                for="hs-hero-signup-form-floating-input-last-name"
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
                                Batch
                              </label>
                            </div>
                          </div>

                          <div className="mb-4 border-2 border-zinc-200 rounded-lg">
                            <div class="relative">
                              <input
                                value={emailForRegsiter}
                                onChange={handleEmailForRegsiter}
                                type="email"
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
                            <div class="relative">
                              <input
                                value={mobileNumberForRegsiter}
                                onChange={handleMobileNumberForRegsiter}
                                type="text"
                                id="hs-hero-signup-form-floating-input-company-name"
                                class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                                placeholder="Preline"
                              />
                              <label
                                for="hs-hero-signup-form-floating-input-company-name"
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
                                value={teamNumberForRegsiter}
                                onChange={handleTeamNumberForRegsiter}
                                type="text"
                                id="hs-hero-signup-form-floating-input-new-password"
                                class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                                placeholder="EE01"
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
                                Team Index Number
                              </label>
                            </div>
                          </div>

                          <div class="col-span-full">
                            <div class="relative mb-4 border-2 border-zinc-200 rounded-lg">
                              <input
                                value={passwordForRegsiter}
                                onChange={handlePasswordForRegsiter}
                                type="password"
                                id="hs-hero-signup-form-floating-input-current-password"
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
                                for="hs-hero-signup-form-floating-input-current-password"
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
                                Password
                              </label>
                            </div>
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
                                <span class="font-medium">Error!</span>{" "}
                                {registerError}
                              </div>
                            </div>
                          </div>
                        )}

                        {registrationSuccess && (
                          <div className="mt-4">
                            <div
                              class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                              role="success"
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
                              <span class="sr-only">Success</span>
                              <div>
                                <span class="font-medium">Success!</span>{" "}
                                Registration Successfull
                              </div>
                            </div>
                          </div>
                        )}

                        {isRegsiterFormSubmitted == true ? (
                          <button
                            type="submit"
                            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-white hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                            disabled={true}
                          >
                            <ClipLoader
                              color="#3498db"
                              loading={true}
                              size={20}
                            />
                            <p>Loading</p>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={() => {
                              handleRegister();
                            }}
                          >
                            Register
                          </button>
                        )}
                        <div class="mt-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
