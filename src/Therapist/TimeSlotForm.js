

import React, { useState } from "react";

const TimeSlotForm = () => {
  const [timeZone, setTimeZone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState([
    { day: "Monday", isAvailable: false, "timeSlots":[{"startTime":"","endTime":""}]},
    { day: "Tuesday", isAvailable: false,"timeSlots":[{"startTime":"","endTime":""}]},
    { day: "Wednesday", isAvailable: false, "timeSlots":[{"startTime":"","endTime":""}]},
    // Add entries for other days as needed
  ]);

  // Use an object to keep track of the number of time slots for each day
  const [timeSlotCount, setTimeSlotCount] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    // Add entries for other days as needed
  });

  const handleAddTimeSlot = (day) => {
    const updatedTimeSlotCount = { ...timeSlotCount };
    updatedTimeSlotCount[day] += 1;
    setTimeSlotCount(updatedTimeSlotCount);
  };

  const handleRemoveTimeSlot = (day) => {
    const updatedTimeSlotCount = { ...timeSlotCount };
    if (updatedTimeSlotCount[day] > 0) {
      updatedTimeSlotCount[day] -= 1;
      setTimeSlotCount(updatedTimeSlotCount);
    }
  };

  const handleDayOfWeekChange = (index, field, value) => {
    const updatedDayOfWeek = [...dayOfWeek];
    updatedDayOfWeek[index][field] = value;
    setDayOfWeek(updatedDayOfWeek);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedDayOfWeek = [...dayOfWeek];
    updatedDayOfWeek[index].isAvailable = isChecked;
    setDayOfWeek(updatedDayOfWeek);
  };

  const renderTimeInputs = (day, index) => {
    if (day.isAvailable) {
      return (
        <div>
          <label>Start Time:</label>
          <input
            type="text"
            value={day.startTime}
            onChange={(e) =>
              handleDayOfWeekChange(index, "startTime", e.target.value)
            }
          />
          <label>End Time:</label>
          <input
            type="text"
            value={day.endTime}
            onChange={(e) =>
              handleDayOfWeekChange(index, "endTime", e.target.value)
            }
          />
          <button onClick={() => handleAddTimeSlot(day.day)}>+</button>
          {timeSlotCount[day.day] > 0 && (
            <button onClick={() => handleRemoveTimeSlot(day.day)}>-</button>
          )}
          {[...Array(timeSlotCount[day.day])].map((_, slotIndex) => (
            <div key={slotIndex}>
              <label>Start Time:</label>
              <input
                type="text"
                value={day.timeSlots[slotIndex].startTime}
                onChange={(e) =>
                  handleTimeSlotChange(
                    day.day,
                    slotIndex,
                    "startTime",
                    e.target.value
                  )
                }
              />
              <label>End Time:</label>
              <input
                type="text"
                value={day.timeSlots[slotIndex].endTime}
                onChange={(e) =>
                  handleTimeSlotChange(
                    day.day,
                    slotIndex,
                    "endTime",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      );
    }
    return "Unavailable";
  };


    const handleTimeSlotChange = (day, index, field, value) => {
      const updatedDayOfWeek = [...dayOfWeek];
      updatedDayOfWeek.find((d) => d.day === day).timeSlots[index][
        field
      ] = value;
      setDayOfWeek(updatedDayOfWeek);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the timeSlot object
    const timeSlot = {
      timeZone,
      startDate,
      endDate,
      dayOfWeek,
    };
    //  const res= await axios.post("http://localhost:3000/signup", timeSlot);
    // Submit timeSlot data to your API or perform further actions
    // console.log(res);
    console.log(timeSlot);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Time Zone:</label>
          <input
            type="text"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div>
          <h3>Day of Week:</h3>
          {dayOfWeek.map((day, index) => (
            <div key={day.day}>
              <label>
                <input
                  type="checkbox"
                  checked={day.isAvailable}
                  onChange={(e) =>
                    handleCheckboxChange(index, e.target.checked)
                  }
                />
                {day.day}
              </label>
              {renderTimeInputs(day, index)}
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TimeSlotForm;













































// import React, { useState } from "react";
 
 

// const Text = ({ onNext, onPrevious }) => {
//     const [languages, setLanguages] = useState([]);
//   const [isNextDisabled, setIsNextDisabled] = useState(languages.length === 0);
// console.log(languages)
//   const handleLanguageChange = (e) => {
//     const selectedLanguages = Array.from(e.target.selectedOptions,
//       (option) => option.value
//     );
//     setLanguages(selectedLanguages);
//     setIsNextDisabled(selectedLanguages.length === 0);
//   };

//   const handleNext = () => {
//     if (languages.length > 0) {
//       onNext();
//     }
//   };

//   return (
//     <>
 
//       <div className="container-fluid page-body-wrapper">
//         <div className="main-panel">
//           <div className="container mt-5 completeProfleStep4">
//             <div className="row">
//               {/* ... (your existing code) */}
//               <select
//                 className="form-control"
//                 multiple
//                 value={languages}
//                 onChange={handleLanguageChange}
//               >
//                 <option>Select languages</option>
//                 <option>Hindi</option>
//                 <option>English</option>
//                 <option>Japanese</option>
//                 <option>Chinese</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Text;
