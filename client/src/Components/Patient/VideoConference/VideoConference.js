import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const VideoConference = () => {
  const [socket, setSocket] = useState(null);
  const [userType, setUserType] = useState(null);
  const [doctorJoined, setDoctorJoined] = useState(false);
  const [patientJoined, setPatientJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState("roomId");
  const [stream, setStream] = useState(null);
  const [callActive, setCallActive] = useState(false); // New state for call status
  const videoRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId") || sessionStorage.getItem("userId");
    const userTypeFromSession = sessionStorage.getItem("userType");
    setUserType(userTypeFromSession);

    const newSocket = io("http://localhost:5000", {
      query: { userId },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the server");
      newSocket.emit("user-connected", { room: roomId, userType });
    });

    newSocket.on("user-connected", (type) => {
      console.log(`User connected: ${type}`);
      if (type === "Doctor") setDoctorJoined(true);
      if (type === "Patient") setPatientJoined(true);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId, userType, stream, location]);

  useEffect(() => {
    if (doctorJoined && patientJoined) {
      setLoading(false);
    }
  }, [doctorJoined, patientJoined]);

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      console.log("Media stream started:", mediaStream);

      // Check if the video element exists
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log("Stream assigned to video element");
      } else {
        console.error("Video element not found");
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Error accessing camera/microphone. Please check permissions.");
    }
  };

  const handleStartCall = () => {
    if (socket) {
      socket.emit("start-call", { room: roomId, userType });
      console.log("Call started for user type:", userType);
      startVideo();
      setCallActive(true); // Set call status to active
    }
  };

  const handleDisconnectCall = () => {
    if (socket) {
      socket.emit("disconnect-call", { room: roomId, userType });
      console.log("Call disconnected for user type:", userType);
      
      // Stop the media stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Media stream stopped.");
      }

      // Clear the video element source
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        console.log("Stream cleared from video element.");
      }

      // Disconnect the socket
      socket.disconnect();
      setCallActive(false); // Reset call status to inactive
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Video Conference</h1>
      {loading ? (
        <div className="text-lg">
          {patientJoined ? <p>Waiting for doctor...</p> : <p>Waiting for patient...</p>}
        </div>
      ) : null}
      <div className="flex flex-col items-center mt-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg"
          muted
        />
        {!callActive ? ( // Show Start Call button when call is inactive
          <button
            onClick={handleStartCall}
            className="bg-primary cursor-pointer m-4 text-white py-2 px-4 rounded mb-4 hover:bg-secondary"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={handleDisconnectCall}
            className="bg-red-600 cursor-pointer text-white py-2 px-4 m-4 rounded hover:bg-red-700"
          >
            Disconnect Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoConference;
