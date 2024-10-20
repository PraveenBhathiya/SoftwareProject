import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { LogOut, SaveAll, SaveAllIcon, UploadCloud } from "lucide-react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast } from "react-toastify";

const S3_BUCKET = "bucketuni";
const REGION = "eu-north-1";
const ACCESS_KEY = import.meta.env.VITE_KEY;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESSKEY;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const SettingComponent = () => {
  const navigate = useNavigate();
  const { email } = useContext(UserContext);
  const [isDetailsAvailable, setIsDetailsAvailable] = useState(true);
  const [user, setUser] = useState({});
  const [newUsername, setNewUserName] = useState("");
  const [newUserIndexNumber, setNewUserIndex] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserMobile, setNewUserMobile] = useState("");
  const [error, setError] = useState("");
  const [isFileUploading, setIsfileUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isUpdatingUserDetails, setIsUpdatingUserDetails] = useState(false);

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Change the profile picture
  const uploadFile = async () => {
    setIsfileUploading(true);
    if (!selectedFile) {
      setIsfileUploading(false);
      return alert("No file selected!");
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: `profilePictures/${selectedFile.name}`,
      Body: selectedFile,
    };

    try {
      const command = new PutObjectCommand(params);
      const data = await s3.send(command);
      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/profilePictures/${selectedFile.name}`;

      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/updateProfilePicture",
          {
            email: email,
            url: fileUrl,
          }
        );

        if (response.data.success) {
          console.log(response.data);
          toast("Profile picture updated successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSelectedFile(null);
          setIsfileUploading(false);
        }
      } catch (error) {
        console.log(error);
        setIsfileUploading(false);
      }
    } catch (err) {
      console.log("Error uploading file:", err);
      setIsfileUploading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/getUserByEmail",
        {
          email: email,
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        console.log(response.data.user);
      } else {
        setIsDetailsAvailable(false);
      }
    } catch (error) {
      setIsDetailsAvailable(false);
    }
  };

  const handleSaveDetailsClick = async () => {
    setIsUpdatingUserDetails(true);
    if (!newName | !newPhoneNumber) {
      setError("Enter All details");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/updateUserByEditProfile",
          {
            email: email,
            name: newName,
            phone: newPhoneNumber,
          }
        );

        if (response.data.success) {
          console.log("User data updated");
          setIsUpdatingUserDetails(false);
          setNewName("");
          setNewPhoneNumber("");
        } else {
          console.log("Error in updating user");
          setIsUpdatingUserDetails(false);
          setError("Failed to update your data. Try again!");
          setNewName("");
          setNewPhoneNumber("");
        }
      } catch (error) {
        setError("Failed to update your data. Try again!");
        setIsUpdatingUserDetails(false);
        setNewName("");
        setNewPhoneNumber("");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  // Change the user details inputs
  const handleNameChange = (event) => {
    setNewName(event.target.value); // Get the email for login
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value); // Get the email for login
  };

  useEffect(() => {
    getUserDetails();
  }, [isFileUploading, isUpdatingUserDetails]);

  // Remove the error message
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);
  return (
    <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <form>
        <div class="bg-white rounded-xl shadow">
          <div class="relative h-40 rounded-t-xl bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center">
            <div class="absolute top-0 end-0 p-4"></div>
          </div>

          <div class="pt-0 p-4 sm:pt-0 sm:p-7">
            <div class="space-y-4 sm:space-y-6">
              <div>
                <label class="sr-only">Product photo</label>

                <div class="flex flex-col sm:flex-row sm:items-center sm:gap-x-5">
                  <img
                    class="-mt-8 relative z-10 inline-block size-24 mx-auto sm:mx-0 rounded-full ring-4 ring-white"
                    src={user.profilePictureURL}
                    alt="Avatar"
                  />

                  <div class="mt-4 sm:mt-auto sm:mb-1.5 flex justify-center sm:justify-start gap-2">
                    {selectedFile != null ? (
                      <div className="flex gap-3 justify-center items-center">
                        <p className="inline-block text-sm font-medium text-gray-800">
                          {selectedFile.name}
                        </p>
                        <button
                          type="button"
                          className="bg-white text-gray-800 border border-gray-200 text-sm font-medium py-2 px-4 rounded gap-2 flex"
                          onClick={uploadFile}
                        >
                          <SaveAllIcon size={20} />
                          Save Image
                        </button>
                      </div>
                    ) : (
                      <form class="max-w-sm">
                        <label for="file-input" class="sr-only">
                          Change Picture
                        </label>
                        {/* Hidden input field */}
                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          className="hidden" // Hide the default input
                          onChange={handleFileChange}
                        />

                        {/* Custom button to trigger file input */}
                        <button
                          type="button"
                          className="bg-white text-gray-800 border border-gray-200 text-sm font-medium py-2 px-4 rounded gap-2 flex"
                          onClick={() =>
                            document.getElementById("file-input").click()
                          } // Trigger input on click
                        >
                          <UploadCloud size={20} />
                          Upload Picture
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  for="af-submit-app-project-name"
                  class="inline-block text-sm font-medium text-gray-800 mt-2.5"
                >
                  Name
                </label>

                <input
                  id="af-submit-app-project-name"
                  type="text"
                  class="py-2 px-3 pe-11 block w-full border-gray-400 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder={user.name}
                  onChange={handleNameChange}
                  value={newName}
                />
              </div>

              <div class="space-y-2">
                <label
                  for="af-submit-project-url"
                  class="inline-block text-sm font-medium text-gray-800 mt-2.5"
                >
                  Role
                </label>

                <input
                  id="af-submit-project-url"
                  type="text"
                  class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder={user.role}
                  disabled={true}
                />
              </div>

              <div class="space-y-2">
                <label
                  for="af-submit-app-project-name"
                  class="inline-block text-sm font-medium text-gray-800 mt-2.5"
                >
                  Email
                </label>

                <input
                  id="af-submit-app-project-name"
                  type="text"
                  class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder={user.email}
                  disabled={true}
                />
              </div>

              <div class="space-y-2">
                <label
                  for="af-submit-app-project-name"
                  class="inline-block text-sm font-medium text-gray-800 mt-2.5"
                >
                  Mobile Number
                </label>

                <input
                  id="af-submit-app-project-name"
                  type="text"
                  class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder={user.phone}
                  onChange={handlePhoneNumberChange}
                  value={newPhoneNumber}
                />
              </div>
            </div>

            {error && (
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
                    <span class="font-medium">Error!</span> {error}
                  </div>
                </div>
              </div>
            )}

            <div class="mt-5 flex justify-center gap-x-2">
              {isUpdatingUserDetails == true ? (
                <button
                  disabled={true}
                  type="button"
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-400 text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <SaveAll size={16} />
                  Saving ...
                </button>
              ) : (
                <button
                  onClick={handleSaveDetailsClick}
                  type="button"
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <SaveAll size={16} />
                  Save Details
                </button>
              )}

              <button
                onClick={handleLogout}
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-500 hover:border-gray-800 bg-text-white text-gray-700  focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingComponent;
