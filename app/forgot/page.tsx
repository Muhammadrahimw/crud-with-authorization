"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useFetchFunc} from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import {useRef} from "react";

const Forgot = () => {
	const axios = useFetchFunc();
	const emailRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const forgotFunc = () => {
		if (!emailRef.current) return alert(`Please enter email`);
		axios({
			url: `/auth/reset-password`,
			method: "POST",
			body: JSON.stringify({email: emailRef.current?.value}),
		})
			.then((data) => {
				localStorage.setItem(`email`, `${emailRef.current?.value}`);
				if (data.message == "Code sent successfully") router.push(`/verify`);
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-[20em] flex flex-col gap-4">
				<label htmlFor="email" className="mb-[-0.5em]">
					Email
				</label>
				<Input
					id="email"
					ref={emailRef}
					placeholder="Enter your email address"
					className="w-full"
				/>
				<Button onClick={forgotFunc} variant={"outline"}>
					Send sms
				</Button>
			</div>
		</div>
	);
};

export default Forgot;
