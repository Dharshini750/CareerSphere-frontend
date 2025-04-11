// import React from "react";

// const CoursesCard = ({ courses }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
//       {courses.map((course) => (
//         <div key={course.id} className="bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-xl font-bold">{course.title}</h2>
//           <p className="text-gray-600">{course.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CoursesCard;
import React, { useEffect, useState } from "react";

const CoursesCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    fetch("http://localhost:5173/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3">Loading courses...</p>
      )}
    </div>
  );
};

export default CoursesCard;
