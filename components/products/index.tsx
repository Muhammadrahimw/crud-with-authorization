"use client";

import {useFetchFunc} from "@/hooks/useFetch";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {DialogPut} from "../editDialog";
import {useRouter} from "next/navigation";

export interface productType {
	id: number;
	type: string;
	brand: string;
	model: string;
	year: number;
}

export const ProductsComponent = () => {
	const router = useRouter();
	const [data, setData] = useState<productType[]>([]);
	const [filteredData, setFilteredData] = useState<productType[]>([]);
	const axios = useFetchFunc();

	const fetchProducts = () => {
		const token = localStorage.getItem(`token`) || "";
		axios({
			url: `/products`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((data) => {
				setData(data.data);
				setFilteredData(data.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		const token = localStorage.getItem(`token`) || "";
		axios({
			url: `/products`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((data) => {
				setData(data.data);
				setFilteredData(data.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const deleteFunc = (id: number) => {
		const token = localStorage.getItem(`token`) || "";
		axios({
			url: `/products/${id}`,
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((data) => {
				console.log(data);
				axios({
					url: `/products`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((data) => {
						setData(data.data);
						setFilteredData(data.data);
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			{filteredData
				? filteredData?.map((value: productType) => (
						<div
							className="w-full rounded-md border px-6 py-4 flex flex-col justify-between"
							key={value.id}>
							<strong className="text-2xl">Nomi: {value.brand}</strong>
							<p className="text-base mt-3">
								<span className="text-xl">Categoriyasi: {value.type}</span>
							</p>
							<p className="text-base mt-2">
								<span className="text-xl">Modeli: {value.model}</span>
							</p>
							<p className="text-base mt-2">
								<span className="text-xl">Yili: {value.year}</span>
							</p>
							<div className="flex items-center justify-between gap-4 mt-4">
								<Button
									onClick={() => deleteFunc(value.id)}
									className="w-full"
									variant={"outline"}>
									delete
								</Button>
								<DialogPut
									productId={value.id}
									existingData={value}
									onUpdate={fetchProducts}
								/>
							</div>
						</div>
				  ))
				: ""}
		</>
	);
};
