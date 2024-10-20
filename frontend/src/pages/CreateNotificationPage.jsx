import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Notification from "../components/Notification";
import { useParams } from "react-router-dom";

const CreateNotificationPage = () => {
  const { email } = useContext(UserContext);
  const { role } = useParams();
  return (
    <>
      <Notification email={email} role={role} />
    </>
  );
};

export default CreateNotificationPage;
