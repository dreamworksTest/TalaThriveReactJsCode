import { useState } from "react";
import { VideoRoom } from "../OldLiveVideo/VideoRoom";

function MainVideo() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="App">
      <h1>Thala Thrive</h1>

      {!joined && (
        <button
          videoJoinDetails={videoJoinDetails}
          onClick={() => setJoined(true)}
        >
          Join Room
        </button>
      )}

      {joined && <VideoRoom  />}
    </div>
  );
}

export default MainVideo;
