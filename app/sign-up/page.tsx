"use client";

import {useFetchFunc} from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import {useRef} from "react";
const a = {
	status: 200,
	message: "success",
	data: [
		{
			id: 14,
			name: "Karim",
			email: "karim8@gmail.com",
			password: "12345",
		},
		{
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTc0MDIxNzcxOSwiZXhwIjoxNzQwMjE5NTE5fQ.KLk3c986kfUtMH2Y2DK3mdvhECyT6iNnL-h78UG0PXA",
		},
	],
};

const Register = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const axios = useFetchFunc();

	const registerFunc = () => {
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		axios({
			url: `/auth/sign-up`,
			method: "POST",
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((data) => {
				localStorage.setItem(`token`, data.data[1].token);
				router.push(`/products`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<form className="w-[25em] mx-auto">
				<div className="mb-5">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your Name
					</label>
					<input
						ref={nameRef}
						type="text"
						id="name"
						className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
						required
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your email
					</label>
					<input
						ref={emailRef}
						type="email"
						id="email"
						className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
						required
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your password
					</label>
					<input
						ref={passwordRef}
						type="password"
						id="password"
						className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
						required
					/>
				</div>
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={registerFunc}
						type="button"
						className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Sign up
					</button>
					<button
						onClick={() => router.push(`/sign-in`)}
						type="button"
						className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
