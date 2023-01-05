import React from "react";
import { Attendance, Student } from "../components/Header/Header";
import { useOutletContext } from "react-router-dom";
import StudentCard from "../components/Student-card/StudentCard";

const Attendance = () => {
  const { setStudents, students,
    attendance,
    setAttendance,
  } = useOutletContext() as {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    attendance: Attendance[];
    setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;

  };

const studentName = React.useRef<HTMLInputElement>(null);

  const [name, setName] = React.useState("");
  const [rollNumber, setRollNumber] = React.useState("");

  const [search, setSearch] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if name and roll number is empty
    if (!name || !rollNumber) {
      alert("Please enter name and roll number");
      return;
    }

    // check if roll number is valid and name is string
    if (isNaN(parseInt(rollNumber)) ||
    !isNaN(parseInt(name))
    ) {
      alert("Please enter valid name and roll number");
      return;
    }


    const student: Student = {
      name,
      rollNo: parseInt(rollNumber),
    };

    const attendanceStudent: Attendance = {
      ...student,
      id: Date.now(),
      checkedIn: new Date().toLocaleString(),
      checkedOut: "",
      isCheckOut: false,
    }

// check if student is exist
    const isStudentExist = students.find(
      (student) => student.rollNo === parseInt(rollNumber)
    );
      console.log(isStudentExist);

    if (!isStudentExist) {
      setStudents((prev) => {
        const newStudents = [...prev, student];
        localStorage.setItem("students", JSON.stringify(newStudents));
        return newStudents;
      });
    }

    // check if student is already checked in
    const isStudentCheckedIn = attendance.find(
      (student) => student.rollNo === parseInt(rollNumber) && !student.isCheckOut
    );

    if (isStudentCheckedIn) {
      alert("Student is already checked in");
      return;
    }

    setAttendance((prev) => {
      const newAttendance = [...prev, attendanceStudent];
      localStorage.setItem("attendance", JSON.stringify(newAttendance));
      return newAttendance;
    });
    studentName.current?.focus();
    setName("");
    setRollNumber("");
  };

  return (
    <div className={`container`}>
      <div className={`wrapper`}>
        <h3 className="title">Attendance</h3>

        <div className={`grid-container attendance`}>
          <div className="card">
            <div className="card-item">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-container">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter student Name"
                      className="form-control"
                      autoComplete="off"
                      autoFocus
                      value={name}
                      ref={studentName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rollNumber" className="form-label">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      id="rollNumber"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Enter student Roll Number"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button type="submit">Check In</button>
                </div>
              </form>
            </div>
          </div>

          {/* search students who have checked in */}
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              className="form-control full-width"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* list of all students who have checked in */}
          {attendance
            .filter(
              (student) =>
                (student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.rollNo.toString().includes(search)) && student.isCheckOut === false
            )
            .map((student) => (
              <StudentCard
                key={student.rollNo}
                student={student}
                setAttendance={setAttendance}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
