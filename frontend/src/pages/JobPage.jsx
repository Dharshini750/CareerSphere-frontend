import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Job from "../components/Job";
import JobCreation from "../components/JobCreation";

const JobPage = () => {
  const { jobId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => axiosInstance.get(`/jobs/${jobId}`),
  });

  const { mutate: createJob } = useMutation({
    mutationFn: (newJobData) => axiosInstance.post('/jobs', newJobData),
    onSuccess: () => {
      // After successful job creation, redirect to the HomePage
      navigate("/");
    }
  });

  const handleJobCreation = (newJobData) => {
   
    createJob(newJobData);
  };

  if (isLoading) return <div>Loading job...</div>;
  if (!job?.data) return <div>Job not found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        {/* Job Creation Section */}
        <JobCreation onJobCreate={handleJobCreation} />
        
        {/* Job Detail */}
        <Job job={job.data} />
      </div>
    </div>
  );
};

export default JobPage;


// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../lib/axios";
// import Sidebar from "../components/Sidebar";
// import Job from "../components/Job";


// const JobPage = () => {
// 	const { jobId } = useParams();
// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

// 	const { data: job, isLoading } = useQuery({
// 		queryKey: ["job", jobId],
// 		queryFn: () => axiosInstance.get(`/jobs/${jobId}`),
// 	});

// 	if (isLoading) return <div>Loading jobs...</div>;
// 	if (!job?.data) return <div>Job not found</div>;

// 	return (
// 		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
// 			<div className='hidden lg:block lg:col-span-1'>
// 				<Sidebar user={authUser} />
// 			</div>

// 			<div className='col-span-1 lg:col-span-3'>
// 				<Job job={job.data} />
// 				ljnf'jf
// 			</div>
// 		</div>
// 	);
// };
// export default JobPage;