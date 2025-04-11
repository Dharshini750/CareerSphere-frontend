import React from "react";
import "./courses.css";

const OnlineCourses = () => {
  // Sample course data
  const online = [
    {
      id: 1,
      cover: "https://via.placeholder.com/150",
      // hoverCover: "https://via.placeholder.com/150/0000FF/808080",
      courseName: "Web Development",
      course: "HTML, CSS, JavaScript, React",
    },
    {
      id: 2,
      cover: "https://via.placeholder.com/150",
      //hoverCover: "https://via.placeholder.com/150/008000/808080",
      courseName: "Data Science",
      course: "Python, Machine Learning, AI",
    },
    {
      id: 3,
      cover: "https://via.placeholder.com/150",
      //hoverCover: "https://via.placeholder.com/150/FF0000/808080",
      courseName: "Cyber Security",
      course: "Network Security, Ethical Hacking",
    },
  ];

  return (
    <section className="online">
      <div className="container">
        {/* Fixed: Added heading inside this component */}
        <h2 className="text-2xl font-bold text-center mb-6">Browse Our Online Courses</h2>
        <div className="content grid3">
          {online.map((val) => (
            <div key={val.id} className="box">
              <div className="img">
                <img src={val.cover} alt={`${val.courseName} Cover`} />
                <img src={val.hoverCover} alt={`${val.courseName} Hover`} className="show" />
              </div>
              <h1 className="text-lg font-semibold">{val.courseName}</h1>
              <span className="text-gray-600">{val.course}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineCourses;
