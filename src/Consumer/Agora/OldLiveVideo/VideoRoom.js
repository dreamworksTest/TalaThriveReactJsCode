import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";


const TOKEN ="006b6ca53d8ae2d4128b5bd4d488f1745a1IABlGarjLxQYw2UgRpWvt7ArxaHTaJvyx1z2/vEPnd6wOXcVWtYAAAAAIgDaT6B8PWBsZQQAAQA9YGxlAgA9YGxlAwA9YGxlBAA9YGxl";
const CHANNEL ="11";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export const VideoRoom = ({ videoJoinDetails }) => {
  const [users, setUsers] = useState([]);
  // const [CHANNEL, setCHANNEL] = useState("");
  // const [TOKEN, setTOKEN] = useState("");
  const APP_ID = process.env.REACT_APP_APP_ID
  const localTracksRef = useRef([]);
 
  // useEffect(() => {
  //   setCHANNEL(videoJoinDetails.channelName);
  //   setTOKEN(videoJoinDetails.token || "");
  // }, [videoJoinDetails]);

  // console.log(CHANNEL);
  // console.log(TOKEN);
  // console.log(APP_ID);
  console.log(videoJoinDetails);
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };
 
  useEffect(() => {
    console.log('videoJoinDetails');
 console.log(videoJoinDetails);
 console.log("close");
    const setupAgora = async () => {
      try {
        console.log(APP_ID);
        client.on("user-published", handleUserJoined);
        client.on("user-left", handleUserLeft);
        const uid = await client.join(
          "b6ca53d8ae2d4128b5bd4d488f1745a1",
          CHANNEL,
          TOKEN,
          null
        );
        const [audioTrack, videoTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        localTracksRef.current = [audioTrack, videoTrack];
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        await client.publish(localTracksRef.current);
      } catch (error) {
        console.error("Error during setup:", error);
      }
    };
      setupAgora();
    
    return () => {
      // Check if the client has successfully joined before calling unpublish
      if (client.connectionState === "CONNECTED") {
        for (let localTrack of localTracksRef.current) {
          localTrack.stop();
          localTrack.close();
        }
        client.off("user-published", handleUserJoined);
        client.off("user-left", handleUserLeft);
        client.unpublish(localTracksRef.current).then(() => client.leave());
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
        }}
        CHANNELS
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
