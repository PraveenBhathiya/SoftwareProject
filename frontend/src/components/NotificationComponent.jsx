import axios from "axios";
import { CirclePlus, Delete, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noNotifications from "../../public/no_notifications.svg";

const NotificationComponent = ({ isTeacher, email, notices, setDeleted }) => {
  const navigate = useNavigate();
  const deleteNotification = async (title) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/notification/delete",
        {
          title: title,
        }
      );
      if (res.status == 200) {
        console.log("Deleted");
        toast("Notification deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      {isTeacher ? (
        <div className="fixed top-0 right-0 mt-10 lg:mt-1">
          <button
            type="button"
            onClick={() => {
              navigate("/createNotices/TEACHER");
            }}
            className="mt-4 gap-4 mr-8 mb-4 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
          >
            <CirclePlus size={16} />
            Create Notices
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {notices.length == 0 ? (
        <div className="inline-flex flex-col justify-center items-center h-full mt-20 w-full">
          <img
            src={noNotifications}
            alt="No Notifications"
            height={350}
            width={350}
          />
          <p class="text-md text-gray-600 mt-10">No Notices found</p>
        </div>
      ) : (
        <div>
          {notices.map((notice, index) => (
            <div className="border-2 rounded-lg p-5 mt-8" key={index}>
              {isTeacher ? (
                <div className="flex justify-end items-end">
                  <button
                    onClick={() => {
                      deleteNotification(notice.title);
                    }}
                  >
                    <Trash2 size={16} color="red" />
                  </button>
                </div>
              ) : (
                <div></div>
              )}

              <div class="flex items-center gap-x-3 ">
                <div class="shrink-0">
                  <img
                    class="shrink-0 size-16 rounded-full"
                    src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Avatar"
                  />
                </div>

                <div class="grow">
                  <h1 class="text-lg font-medium text-gray-800">
                    {notice.title}
                  </h1>
                  <p class="text-sm text-gray-600">{notice.time}</p>
                </div>
              </div>

              <div class="mt-8">
                <p class="text-sm text-gray-600">{notice.description}</p>

                <ul class="mt-5 flex flex-col gap-y-3">
                  <li class="flex items-center gap-x-2.5">
                    <svg
                      class="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a
                      class="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2"
                      href="#"
                    >
                      {notice.userEmail}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
