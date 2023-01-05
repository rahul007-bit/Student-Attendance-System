import React from "react";
import { useOutletContext } from "react-router-dom";
import { Attendance, Student } from "../components/Header/Header";

const Report = () => {
  const { students, attendance } = useOutletContext() as {
    students: Student[];
    attendance: Attendance[];
  };

  return (
    <div className={`container`}>
      <div className={`wrapper`}>
        <h3 className="title">Report</h3>
        <div className={`grid-container report`}>
          <div className={`card card-hover`}>
            <h4>Total Student</h4>
            <p className="text-md">{students.length}</p>
          </div>
          <div className={`card card-hover`}>
            <h4>Total Check in</h4>
            <p className="text-md">{attendance.length}</p>
          </div>
          <div className={`card card-hover`}>
            <h4>Present Students</h4>
            <p className="text-md">
              {
                attendance.filter((student) => student.isCheckOut === false)
                  .length
              }
            </p>
          </div>
          <div className={`card card-hover`}>
            <h4>Checkouts</h4>
            <p className="text-md">
              {
                attendance.filter((student) => student.isCheckOut === true)
                  .length
              }
            </p>
          </div>
        </div>
        {students.length?<div className={`card`}>
          <div className={`card-item`}>

          <h4>Student Name</h4>
          <p className="text-md">Check in time</p>
          <p className="text-md">Check out time</p>
              </div>
              {/* divider */}
              <hr className="divider"/>
          {attendance.map((student) => (
            <div className={`card-item`}>
              <div className={`student-info`}>
                <div className="student-info-container">
                  <p className="text-sm">Name</p>
                  <p className="text-md">{student.name}</p>
                </div>
              </div>

              <div className={`checkin-card`}>
                <div className={"m"}>
                  <p className={"text-sm"}>checkin time</p>
                  <p>
                    time: <span>{student.checkedIn}</span>
                  </p>
                </div>
              </div>

              <div className={`checkin-card`}>
                <div className={"m"}>
                  <p className={"text-sm"}>checkout time</p>
                  {student.isCheckOut ? (
                    <p>
                      time: <span>{student.checkedOut}</span>
                    </p>
                  ) : (
                    <p>Not checked out</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>:null}
      </div>
    </div>
  );
};

export default Report;
