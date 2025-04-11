import React from "react";
import CoursesCard from "./CourseCard";
import OnlineCourses from "./OnlineCourses";

const courseData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Learn MERN stack with real-world projects.",
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    description: "Master AI concepts with hands-on experience.",
  },
  {
    id: 3,
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and GCP cloud platforms.",
  },
];

const CourseHome = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Courses</h1>
      <CoursesCard courses={courseData} />
      <OnlineCourses />
    </div>
  );
};

export default CourseHome;

// import React, { useEffect, useState } from "react";

// const CourseHome = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/courses")
//       .then((res) => res.json())
//       .then((data) => setCourses(data))
//       .catch((error) => console.error("Error fetching courses:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Available Courses</h1>
//       <ul>
//         {courses.map((course) => (
//           <li key={course._id}>
//             <h2>{course.title}</h2>
//             <p>{course.description}</p>
//             <p>Instructor: {course.instructor}</p>
//             <p>Price: ${course.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseHome;
