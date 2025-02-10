// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Image, Loader } from "lucide-react";

// const JobCreation = ({ user }) => {
//   const [description, setDescription] = useState("");
//   const [criteria, setCriteria] = useState("");
//   const [link, setLink] = useState("");
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const queryClient = useQueryClient();

//   const { mutate: createJobMutation, isPending } = useMutation({
//     mutationFn: async (jobData) => {
//       const res = await axiosInstance.job("/jobs/create", jobData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       resetForm();
//       toast.success("Job created successfully");
//       queryClient.invalidateQueries({ queryKey: ["jobs"] });
//     },
//     onError: (err) => {
//       toast.error(err.response.data.message || "Failed to create job");
//     },
//   });

//   const handleJobCreation = async (e) => {
//     e.preventDefault();
//     try {
//       const jobData = { description, criteria, link };
//       if (image) jobData.image = await readFileAsDataURL(image);

//       createJobMutation(jobData);
//     } catch (error) {
//       console.error("Error in handleJobCreation:", error);
//     }
//   };

//   const resetForm = () => {
//     setDescription("");
//     setCriteria("");
//     setLink("");
//     setImage(null);
//     setImagePreview(null);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       readFileAsDataURL(file).then(setImagePreview);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const readFileAsDataURL = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
//       <form onSubmit={handleJobCreation}>
//         <div className="flex items-center space-x-4 mb-6">
//           <img
//             src={user.profilePicture || "/avatar.png"}
//             alt={user.name}
//             className="w-16 h-16 rounded-full border-2 border-gray-300"
//           />
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">Create Job</h2>
//             <p className="text-sm text-gray-500">Share a new job listing with the community</p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//             Job Description
//           </label>
//           <textarea
//             id="description"
//             placeholder="Describe the job responsibilities and requirements"
//             className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 resize-none min-h-[120px]"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 mb-2">
//             Job Criteria
//           </label>
//           <textarea
//             id="criteria"
//             placeholder="Mention the qualifications or criteria for the job"
//             className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 resize-none min-h-[120px]"
//             value={criteria}
//             onChange={(e) => setCriteria(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
//             Job Application Link
//           </label>
//           <input
//             type="url"
//             id="link"
//             placeholder="Provide a URL for applying to the job"
//             className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//             required
//           />
//         </div>

//         {imagePreview && (
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h3>
//             <img src={imagePreview} alt="Selected" className="w-full h-auto rounded-lg shadow-lg" />
//           </div>
//         )}

//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-4">
//             <label htmlFor="image" className="flex items-center text-info hover:text-info-dark cursor-pointer">
//               <Image size={20} className="mr-2" />
//               <span className="text-sm">Upload Photo</span>
//             </label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-purple-700 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-purple-700 transition duration-200"
//             disabled={isPending}
//           >
//             {isPending ? <Loader className="size-5 animate-spin" /> : "Post Job"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default JobCreation;                                   


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";

const JobCreation = ({ user }) => {
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const queryClient = useQueryClient();

	const { mutate: createJobMutation, isPending } = useMutation({
		mutationFn: async (jobData) => {
			const res = await axiosInstance.job("/jobs/create", jobData, {
				headers: { "Content-Type": "application/json" },
			});
			return res.data;
		},
		onSuccess: () => {
			resetForm();
			toast.success("Job created successfully");
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to create job");
		},
	});

	const handleJobCreation = async () => {
		try {
			const jobData = { content };
			if (image) jobData.image = await readFileAsDataURL(image);

			createJobMutation(jobData);
		} catch (error) {
			console.error("Error in handleJobCreation:", error);
		}
	};

	const resetForm = () => {
		setContent("");
		setImage(null);
		setImagePreview(null);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			readFileAsDataURL(file).then(setImagePreview);
		} else {
			setImagePreview(null);
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	return (
		<div className='bg-secondary rounded-lg shadow mb-4 p-4'>
			<div className='flex space-x-3'>
				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
				<textarea
					placeholder="What's on your mind?"
					className='w-full p-3 rounded-lg bg-base-100 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px]'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className='mt-4'>
					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />
				</div>
			)}

			<div className='flex justify-between items-center mt-4'>
				<div className='flex space-x-4'>
					<label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
						<Image size={20} className='mr-2' />
						<span>Photo</span>
						<input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
					</label>
				</div>

				<button
					className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
					onClick={handleJobCreation}
					disabled={isPending}
				>
					{isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
				</button>
			</div>
		</div>
	);
};
export default JobCreation;