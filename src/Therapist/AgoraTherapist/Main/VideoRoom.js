import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import "./VideoRoom.css";

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = ({ videoJoinDetails, onHide }) => {
  const [users, setUsers] = useState([]);
  const [localUser, setLocalUser] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

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

  // const smute = async (user) => {
  //    if (user.audioTrack) {
  //   await user.audioTrack.setEnabled(false);
  // }

  // };
  // const sunmute = async (user) => {
  //  if (user.audioTrack) {
  //   await user.audioTrack.setEnabled(true);
  // }

  // };
  // const svideoMute = async (user) => {
  //  if (user.videoTrack) {
  //   await user.videoTrack.setEnabled(false);
  // }

  // };
  // const svideoUnMute = async (user) => {
  //    if (user.videoTrack) {
  //   await user.videoTrack.setEnabled(true);
  // }

  // };

  //  const smute = async () => {
  //   if (localUser && localUser.audioTrack) {
  //     await localUser.audioTrack.setEnabled(false);
  //   }
  // };

  // const sunmute = async () => {
  //   if (localUser && localUser.audioTrack) {
  //     await localUser.audioTrack.setEnabled(true);
  //   }
  // };

  // const svideoMute = async () => {
  //   if (localUser && localUser.videoTrack) {
  //     await localUser.videoTrack.setEnabled(false);
  //   }
  // };

  // const svideoUnMute = async () => {
  //   if (localUser && localUser.videoTrack) {
  //     await localUser.videoTrack.setEnabled(true);
  //   }
  // };

  const toggleAudio = async () => {
      setIsMic(!isMic);
    if (localUser && localUser.audioTrack) {
      await localUser.audioTrack.setEnabled(!audioMuted);
      setAudioMuted(!audioMuted);
    
    }
  };

  const toggleVideo = async () => {
    if (localUser && localUser.videoTrack) {
      await localUser.videoTrack.setEnabled(!videoMuted);
      setVideoMuted(!videoMuted);
    }
  };

  const disconnect = async () => {
    //  // await waitForConnectionState('CONNECTED');
    // client.removeAllListeners();
    // for (let track of tracks) {
    //   track.stop();
    //   track.close();
    // }
    // await client.unpublish(tracks);
    // await client.leave();

    client.removeAllListeners();
    for (let track of localTracks) {
      track.stop();
      track.close();
    }
    await client.unpublish(localTracks);
    await client.leave();
  };

  const handleLeaveClick = () => {
    disconnect();
    onHide();
  };

  // useEffect(() => {
  //     let tracks;
  //   client.on('user-published', handleUserJoined);
  //   client.on('user-left', handleUserLeft);

  //   client
  //     .join(APP_ID, CHANNEL, TOKEN, null)
  //     .then((uid) =>
  //       Promise.all([
  //         AgoraRTC.createMicrophoneAndCameraTracks(),
  //         uid,
  //       ])
  //     )
  //     .then(([tracks, uid]) => {
  //       const [audioTrack, videoTrack] = tracks;
  //       setLocalUser({
  //         uid,
  //         videoTrack,
  //         audioTrack,
  //       });
  //       setLocalTracks(tracks);
  //       setUsers((previousUsers) => [
  //         ...previousUsers,
  //         {
  //           uid,
  //           videoTrack,
  //           audioTrack,
  //         },
  //       ]);
  //       client.publish(tracks);
  //     });

  //   return () => {
  //     for (let localTrack of localTracks) {
  //       localTrack.stop();
  //       localTrack.close();
  //     }
  //     client.off('user-published', handleUserJoined);
  //     client.off('user-left', handleUserLeft);
  //     client.unpublish(tracks).then(() => client.leave());
  //   };
  // }, []);

  useEffect(() => {
    let tracks; // Declare the 'tracks' variable here
    console.log(videoJoinDetails);
    const initializeAgora = async () => {
      console.log();
      const APP_ID = "b6ca53d8ae2d4128b5bd4d488f1745a1";
      // const TOKEN ="006b6ca53d8ae2d4128b5bd4d488f1745a1IABlGarjLxQYw2UgRpWvt7ArxaHTaJvyx1z2/vEPnd6wOXcVWtYAAAAAIgDaT6B8PWBsZQQAAQA9YGxlAgA9YGxlAwA9YGxlBAA9YGxl";
      const TOKEN = videoJoinDetails.token;
      const CHANNEL = videoJoinDetails.channelName;
      try {
        client.on("user-published", handleUserJoined);
        client.on("user-left", handleUserLeft);

        const [createdTracks, uid] = await Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          client.join(APP_ID, CHANNEL, TOKEN, null),
        ]) 

        tracks = createdTracks; // Assign the created tracks to 'tracks'

        const [audioTrack, videoTrack] = tracks;   
        setLocalUser({
          uid,
          videoTrack,
          audioTrack,
          // consumerName: videoJoinDetails.consumerName,
        });
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
            // therapistName: videoJoinDetails.therapistName,
          },
        ]);
        await client.publish(tracks);
      } catch (error) {
        if (error.name === "NotFoundError") {
           alert("Please check your microphone and camera!");
        } else {
          // Handle other errors
          console.error("Error creating tracks:", error);
        }
      //  console.error("Error during Agora initialization:", error);
        // Handle the error as needed
      }
    };

    initializeAgora();

    return () => {
      if (tracks) {
        for (let localTrack of tracks) {
          localTrack.stop();
          localTrack.close();
        }
        client.off("user-published", handleUserJoined);
        client.off("user-left", handleUserLeft);

        client.unpublish(tracks).then(() => client.leave());
      }
    };
  }, [videoJoinDetails]);

  const [isMic, setIsMic] = useState(true);
  const [isCamera, setIsCamera] = useState(true);

  // const handleClickMic = () => {
  //   setIsMic(!isMic);
  // };

  const handleClickCamera = () => {
    setIsCamera(!isCamera);
  };

  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        {/*  <button className="audioMuteUnmute" onClick={() => smute(user)} >AudioOff</button>

      <button className="audioMuteUnmute" onClick={() => sunmute(user)} >AudioOn</button>
  
  
      <button className="CameraOnOff"  onClick={() => svideoMute(user)} >CameraOff</button>

      <button className="CameraOnOff"  onClick={() => svideoUnMute(user)} >CameraOn</button>

      <button className="LeaveVideoCall" onClick={handleLeaveClick}>Leave</button>*/}
        {/*  <button className="audioMuteUnmute" onClick={smute}>
        AudioOff
      </button>
      <button className="audioMuteUnmute" onClick={sunmute}>
        AudioOn
      </button>
      <button className="CameraOnOff" onClick={svideoMute}>
        CameraOff
      </button>
      <button className="CameraOnOff" onClick={svideoUnMute}>
        CameraOn
      </button>*/}
        {/* <button className="audioMuteUnmute" onClick={toggleAudio}>
          {audioMuted ? "Audio Off" : "Audio On"}
        </button> */}
        {/* <button className="CameraOnOff" onClick={toggleVideo}>
          {videoMuted ? "Camera Off" : "Camera On"}
        </button> */}
        {/* <button className="LeaveVideoCall" onClick={handleLeaveClick}>
          Leave
        </button> */}
{/* 
        <div>
          {users.map((user) => (
            <>
              <VideoPlayer key={user.uid} user={user} />
            </>
          ))}
        </div> */}
      {/* </div> */}
      <>
        <div className="container-fluid page-body-wrapper heightByContent mainVideoCallSection">
          <div className="main-panel">
            <div className="row text-center videoCallMainPanelTopRow">
              <p className="videoCallWithAppointment OutfitFont text-center">
                Appointment with Dr. Anjy - 11.00 AM - 11.45 AM
              </p>
            </div>

            <div className="container">
              <div className="row mainVideoCallOutsideRow">
                <div className="col-md-6 col-sm-12 videocallFirstUserColumn mb-3">
                  <div className="container">
                    {/* <img src="../../../../assets/images/videoCallImages/videocallimage1.png"></img> */}
                    {users.length > 0 && (
                      <VideoPlayer key={users[0].uid} user={users[0]} />
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 videocallSecondUserColumn">
                  <div className="container">
                    {users.length > 1 && (
                      <VideoPlayer key={users[1].uid} user={users[1]} />
                    )}
                    {/* <img src="../../../../assets/images/videoCallImages/videocallimage2.png"></img> */}
                  </div>
                </div>
              </div>

              <div className="row mainVideoCallButtonsRow justify-content-center">
                <div className="col-auto mb-2">
                  <img
                    src="../../../../assets/images/videoCallImages/leave.png"
                    alt="Image 1"
                    className="img-fluid"
                    onClick={handleLeaveClick}
                  />
                </div>
                <div className="col-auto mb-2">
                  <img
                    // onClick={handleClickMic}
                    src={
                      isMic
                        ? "../../../../assets/images/videoCallImages/mic.png"
                        : "../../../../assets/images/videoCallImages/micMute.png"
                    }
                    alt={isMic ? "UnMute" : "Mute"}
                    className="img-fluid"
                    onClick={toggleAudio}
                  />
                </div>
                <div className="col-auto mb-2">
                  <img
                    onClick={handleClickCamera}
                    src={
                      isCamera
                        ? "../../../../assets/images/videoCallImages/camera.png"
                        : "../../../../assets/images/videoCallImages/cameraOff.png"
                    }
                    alt={isCamera ? "CameraOn" : "CameraOff"}
                    className="img-fluid"
                  />
                </div>
                <div className="col-auto mb-2">
                  <img
                    src="../../../../assets/images/videoCallImages/msg.png"
                    alt="Image 4"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
