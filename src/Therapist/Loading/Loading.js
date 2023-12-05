import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-orange-500 border-t-orange-500 border-b-0 h-12 w-12"></div>
      <span className="ml-3 font-semibold text-xl text-orange-500">Loading...</span>
    </div>
  );
}

export default Loading