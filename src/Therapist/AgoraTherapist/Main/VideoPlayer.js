import React, { useEffect, useRef } from "react";


export const VideoPlayer = ({ user }) => {
  const ref = useRef();
 
  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div uid={user.uid}>
      Uid: {user.uid}
      <div ref={ref} style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
};
