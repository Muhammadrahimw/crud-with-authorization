"use client";

import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useFetchFunc} from "@/hooks/useFetch";

type ProductType = {
	brand: string;
	type: string;
	model: string;
	year: number;
};

export function DialogPut({
	productId,
	existingData,
	onUpdate,
}: {
	productId: number;
	existingData: ProductType;
	onUpdate?: () => void;
}) {
	const nameRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLInputElement>(null);
	const modelRef = useRef<HTMLInputElement>(null);
	const yearRef = useRef<HTMLInputElement>(null);
	const [putOpen, setPutOpen] = useState<boolean>(false);
	const axios = useFetchFunc();

	useEffect(() => {
		if (
			existingData &&
			nameRef.current &&
			categoryRef.current &&
			modelRef.current &&
			yearRef.current
		) {
			nameRef.current.value = existingData.brand;
			categoryRef.current.value = existingData.type;
			modelRef.current.value = existingData.model;
			yearRef.current.value = existingData.year.toString();
		}
	}, [existingData]);

	const handleUpdate = () => {
		const token = localStorage.getItem(`token`);
		const updatedData = {
			type: categoryRef.current?.value,
			brand: nameRef.current?.value,
			model: modelRef.current?.value,
			year: Number(yearRef.current?.value),
		};

		axios({
			url: `/products/${productId}`,
			method: "PUT",
			body: JSON.stringify(updatedData),
			headers: {authorization: `Bearer ${token}`},
		})
			.then(() => {
				setPutOpen(false);
				if (onUpdate) onUpdate();
			})
			.catch((error) => console.log(error));
	};

	return (
		<Dialog open={putOpen} onOpenChange={setPutOpen}>
			<DialogTrigger asChild className="w-full">
				<Button variant="outline">Edit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Car</DialogTitle>
					<DialogDescription>
						Update car details and save changes.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right"> Name </Label>
						<Input
							id="name"
							ref={nameRef}
							defaultValue={existingData?.brand} // 🔥 Default value qaytadan qo‘shildi
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right"> Category </Label>
						<Input
							id="category"
							ref={categoryRef}
							defaultValue={existingData?.type} // 🔥 Default value qaytadan qo‘shildi
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="model" className="text-right"> Model </Label>
						<Input
							id="model"
							ref={modelRef}
							defaultValue={existingData?.model} // 🔥 Default value qaytadan qo‘shildi
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="year" className="text-right"> Year </Label>
						<Input
							id="year"
							ref={yearRef}
							defaultValue={existingData?.year.toString()} // 🔥 Default value qaytadan qo‘shildi
							type="number"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={handleUpdate}> Save Changes </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
