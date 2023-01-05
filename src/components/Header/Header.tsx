import React from "react";
import style from "./header.module.css";
import { NavLink, Outlet } from "react-router-dom";

export type Student = {
  name: string;
  rollNo: number;
};

export type Attendance = Student & {
  id: number;
  checkedIn: string;
  checkedOut: string;
  isCheckOut?: boolean;
}

const Header = () => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [attendance, setAttendance] = React.useState<Student[]>([]);


  React.useEffect(() => {
    //     manage Students records in local storage
    const localStorage_students = localStorage.getItem("students") || false;
    const localStorage_attendance = localStorage.getItem("attendance") || false;

    if (localStorage_students) {
      setStudents(JSON.parse(localStorage_students));
    }

    else {
      localStorage.setItem("students", JSON.stringify(students));
    }

    if (localStorage_attendance) {
      setAttendance(JSON.parse(localStorage_attendance));
    }

    else {
      localStorage.setItem("attendance", JSON.stringify(attendance));
    }

  }, []);

  return (
    <>
      <header className={style.header}>
        <div>
          <NavLink to={"/"}>
            <h2>Student Attendance</h2>
          </NavLink>
        </div>
        <div>

          <NavLink to={"/attendance"}>
            <button>

            <h3>Attendance</h3>
            </button>
          </NavLink>
        </div>
      </header>
      <Outlet
        context={{
          students,
          setStudents,
          attendance,
          setAttendance,

        }}
      />
    </>
  );
};

export default Header;
