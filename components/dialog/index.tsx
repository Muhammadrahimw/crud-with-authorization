"use client";

import {useRef, useState} from "react";
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

export function DialogPost() {
	const [postOpen, setPostOpen] = useState<boolean>(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLInputElement>(null);
	const modelRef = useRef<HTMLInputElement>(null);
	const yearRef = useRef<HTMLInputElement>(null);
	const axios = useFetchFunc();

	const handleSubmit = () => {
		const token = localStorage.getItem(`token`);
		axios({
			url: `/products`,
			method: "POST",
			body: JSON.stringify({
				type: categoryRef.current?.value,
				brand: nameRef.current?.value,
				model: modelRef.current?.value,
				year: yearRef.current?.value,
			}),
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then(() => {
				setPostOpen(false);
			})
			.catch((error) => console.log(error));
	};

	return (
		<Dialog open={postOpen} onOpenChange={setPostOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setPostOpen(true)}>
					Add
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Car</DialogTitle>
					<DialogDescription>
						Fill in the details below and click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" ref={nameRef} className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<Input id="category" ref={categoryRef} className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="model" className="text-right">
							Model
						</Label>
						<Input id="model" ref={modelRef} className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="year" className="text-right">
							Year
						</Label>
						<Input
							id="year"
							ref={yearRef}
							type="number"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={handleSubmit}>
						Add new car
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
