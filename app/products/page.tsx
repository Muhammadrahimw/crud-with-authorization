"use client";

import {DialogPost} from "@/components/dialog";
import {ProductsComponent} from "@/components/products";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Products = () => {
	useEffect(() => {
		const token = localStorage.getItem(`token`);
		if (!token) router.push(`/sign-in`);
	}, []);
	const router = useRouter();
	const logoutFunc = () => {
		localStorage.removeItem(`token`);
		router.push(`/sign-in`);
	};
	return (
		<section className="w-[95%] mx-auto py-5">
			<nav className="flex items-center justify-between">
				<DialogPost />
				<div>
					<Button onClick={logoutFunc} variant={"outline"}>
						Log out
					</Button>
				</div>
			</nav>
			<div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[500px]:grid-cols-1">
				<ProductsComponent />
			</div>
		</section>
	);
};

export default Products;
