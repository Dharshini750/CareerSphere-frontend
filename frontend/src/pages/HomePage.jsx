import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import JobCreation from "../components/JobCreation";
import Post from "../components/Post";
import Job from "../components/Job";
import { Users } from "lucide-react";

import RecommendedUser from "../components/RecommendedUser";

const HomePage = () => {
	const { data: authUser, isLoading: authUserLoading, error: authUserError } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers, isLoading: recommendedUsersLoading, error: recommendedUsersError } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			return res.data;
		},
	});

	const { data: jobs, isLoading: jobsLoading, error: jobsError } = useQuery({
		queryKey: ["jobs"],
		queryFn: async () => {
			const res = await axiosInstance.get("/jobs");
			return res.data;
		},
	});

	// Error handling for each query
	if (authUserError || recommendedUsersError || postsError || jobsError) {
		return <div className="text-red-500">An error occurred while fetching data. Please try again later.</div>;
	}

	// Loading state for the entire page
	if (authUserLoading || recommendedUsersLoading || postsLoading || jobsLoading) {
		return <div className="text-center">Loading...</div>;
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
				<PostCreation user={authUser} />

				{posts?.length > 0 ? (
					posts.map((post) => <Post key={post._id} post={post} />)
				) : (
					<div className='bg-white rounded-lg shadow p-8 text-center'>
						<div className='mb-6'>
							<Users size={64} className='mx-auto text-primary' />
						</div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
						<p className='text-gray-600 mb-6'>Connect with others to start seeing posts in your feed!</p>
					</div>
				)}
			</div>

            <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
				<JobCreation user={authUser} />

				{jobs?.length > 0 ? (
					jobs.map((job) => <Job key={job._id} job={job} />)
				) : (
					<div className='bg-white rounded-lg shadow p-8 text-center'>
						<div className='mb-6'>
							<Users size={64} className='mx-auto text-primary' />
						</div>
						<h2 className='text-2xl font-bold mb-4 text-gray-800'>No Jobs Yet</h2>
						<p className='text-gray-600 mb-6'>Connect with companies to start your journey!</p>
					</div>
				)}
			</div>

			{recommendedUsers?.length > 0 && (
				<div className='col-span-1 lg:col-span-1 hidden lg:block'>
					<div className='bg-secondary rounded-lg shadow p-4'>
						<h2 className='font-semibold mb-4'>People you may know</h2>
						{recommendedUsers.map((user) => (
							<RecommendedUser key={user._id} user={user} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;


// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import Sidebar from "../components/Sidebar";
// import PostCreation from "../components/PostCreation";
// import JobCreation from "../components/JobCreation";
// import Post from "../components/Post";
// import Job from "../components/Job";
// import { Users } from "lucide-react";
// import RecommendedUser from "../components/RecommendedUser";

// const HomePage = () => {
// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

// 	const { data: recommendedUsers } = useQuery({
// 		queryKey: ["recommendedUsers"],
// 		queryFn: async () => {
// 			const res = await axiosInstance.get("/users/suggestions");
// 			return res.data;
// 		},
// 	});

// 	const { data: posts } = useQuery({
// 		queryKey: ["posts"],
// 		queryFn: async () => {
// 			const res = await axiosInstance.get("/posts");
// 			return res.data;
// 		},
// 	});

// 	console.log("posts", posts);

// 	const { data: jobs } = useQuery({
// 		queryKey: ["jobs"],
// 		queryFn: async () => {
// 			const res = await axiosInstance.get("/jobs");
// 			return res.data;
// 		},
// 	});

// 	console.log("jobs", jobs);

// 	return (
// 		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
// 			<div className='hidden lg:block lg:col-span-1'>
// 				<Sidebar user={authUser} />
// 			</div>

// 			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
// 				<PostCreation user={authUser} />

// 				{posts?.map((post) => (
// 					<Post key={post._id} post={post} />
// 				))}

// 				{posts?.length === 0 && (
// 					<div className='bg-white rounded-lg shadow p-8 text-center'>
// 						<div className='mb-6'>
// 							<Users size={64} className='mx-auto text-primary' />
// 						</div>
// 						<h2 className='text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
// 						<p className='text-gray-600 mb-6'>Connect with others to start seeing posts in your feed!</p>
// 					</div>
// 				)}
// 			</div>
//             <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
// 				<JobCreation user={authUser} />

// 				{jobs?.map((job) => (
// 					<Job key={job._id} job={job} />
// 				))}

// 				{jobs?.length === 0 && (
// 					<div className='bg-white rounded-lg shadow p-8 text-center'>
// 						<div className='mb-6'>
// 							<Users size={64} className='mx-auto text-primary' />
// 						</div>
// 						<h2 className='text-2xl font-bold mb-4 text-gray-800'>No Jobs Yet</h2>
// 						<p className='text-gray-600 mb-6'>Connect with companies to start your journey!</p>
// 					</div>
// 				)}
// 			</div>

// 			{recommendedUsers?.length > 0 && (
// 				<div className='col-span-1 lg:col-span-1 hidden lg:block'>
// 					<div className='bg-secondary rounded-lg shadow p-4'>
// 						<h2 className='font-semibold mb-4'>People you may know</h2>
// 						{recommendedUsers?.map((user) => (
// 							<RecommendedUser key={user._id} user={user} />
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };
// export default HomePage;