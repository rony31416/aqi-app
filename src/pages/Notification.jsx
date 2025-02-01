import React, {useEffect, useState} from "react";
import {auth, db} from "../authService";
import {doc, getDoc} from "firebase/firestore";

function Notification() {
  const [notification, setNotification] = useState("");
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const docRef = doc(db, "notifications", "notification");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNotification(docSnap.data().message);
        } else {
          setNotification("No notification available");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchNotification();
  }, []);

  return (
    <>
    {userDetails? (
        <div>
            <h1>Welcome {userDetails.displayName}</h1>
            <p>{notification}</p>
        </div>
        ) : (
        <h1>Please sign in to view notifications</h1>
    )}
    </>
  );
}