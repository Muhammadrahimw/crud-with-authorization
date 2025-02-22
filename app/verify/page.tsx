"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useFetchFunc} from "@/hooks/useFetch";
import {useRouter} from "next/navigation";
import {useRef} from "react";

const VerifyCode = () => {
	const codeRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const axios = useFetchFunc();
	const router = useRouter();
	const verifyFunc = () => {
		if (!codeRef.current || !passwordRef.current)
			return alert(`Please enter code and password`);
		axios({
			url: `/auth/change-password`,
			method: "POST",
			body: JSON.stringify({
				code: codeRef.current.value,
				email: localStorage.getItem(`email`),
				newPassword: passwordRef.current.value,
			}),
		})
			.then((data) => {
				if (data.message == "Your password successfully changed") {
					localStorage.removeItem(`email`);
					router.push(`/sign-in`);
				} else {
					alert(`your code incorrect`);
				}
				console.log(data);
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-[20em] flex flex-col gap-4">
				<label htmlFor="email" className="mb-[-0.5em]">
					Code
				</label>
				<Input
					id="email"
					ref={codeRef}
					placeholder="Enter code"
					className="w-full"
				/>
				<label htmlFor="newpas" className="mb-[-0.5em]">
					New password
				</label>
				<Input
					id="newpas"
					ref={passwordRef}
					placeholder="Enter new password"
					className="w-full"
				/>
				<Button onClick={verifyFunc} variant={"outline"}>
					Enter
				</Button>
			</div>
		</div>
	);
};

export default VerifyCode;
