"use client";

import {useFetchFunc} from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import {useRef} from "react";

const Login = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const axios = useFetchFunc();

	const loginFunc = () => {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		console.log(email);

		axios({
			url: `/auth/sign-in`,
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((data) => {
				data.data[0];
				localStorage.setItem(`token`, data.data[0].token);
				router.push(`/products`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<form className="mx-auto w-[25em]">
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
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="muqalla21@gmail.com"
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
						placeholder="12345"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="flex items-center justify-between gap-4">
					<button
						onClick={loginFunc}
						type="button"
						className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Sign in
					</button>
					<button
						onClick={() => router.push(`/sign-up`)}
						type="button"
						className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Sign up
					</button>
				</div>
				<button
					onClick={() => router.push(`/forgot`)}
					type="button"
					className="text-white w-full mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Forgot password
				</button>
			</form>
		</div>
	);
};

export default Login;
