import React from "react";
import { Attendance } from "../Header/Header";
const StudentCard = ({
  student,
  setAttendance,
}: {
  student: Attendance;
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
}) => {
    const handleCheckOut = () => {
      setAttendance((prev) => {
        const newAttendance = prev.map((item) => {
          if (item.id === student.id) {
            return {
              ...item,
              checkedOut: new Date().toLocaleString(),
              isCheckOut: true,
            };
          }
          return item;
        });
        localStorage.setItem("attendance", JSON.stringify(newAttendance));
        return newAttendance;
      });

    };

  return (
    <div className={`card`}>
      <div className={`card-item`}>
        <div className={`student-info`}>
          <div className="student-info-container">
            <p className="text-sm">Name</p>
            <p className="text-md">{student.name}</p>
          </div>
          <div className="student-info-container">
            <p className="text-sm">Roll Number</p>
            <p className="text-md">{student.rollNo}</p>
          </div>
        </div>
        <div className={`checkin-card`}>
          <div className={"m"}>
            <p className={"text-sm"}>checkin time</p>
            <p>
              time: <span>{student.checkedIn}</span>
            </p>
          </div>
          <div className={"m"}>
            {student.isCheckOut ? (
              <>
                <p className={"text-sm"}>checkout time</p>
                <p>
                  time: <span>{student.checkedOut}</span>
                </p>
              </>
            ) : (
              <button onClick={handleCheckOut}>checkout</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
