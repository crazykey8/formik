"use client"
import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";

const ProfilePage = () => {
	const [fio, setFio] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (fio.length < 2 || fio.length > 128) {
			setError('ФИО должно быть от 2 до 128 символов');
			return;
		}

		if (!validateEmail(email)) {
			setError('Некорректный email');
			return;
		}

		if (phone.length < 10 || phone.length > 20) {
			setError('Телефон должен быть от 10 до 20 символов');
			return;
		}

		setSuccess(true);
		setError('');

		setFio('');
		setEmail('');
		setPhone('');
	};

	const validateName = (value: string) => value.length >= 2 && value.length <= 128;

	const validationStateFio = React.useMemo(() => {
		if (fio === "") return undefined;

		return validateName(fio) ? "valid" : "invalid";
	}, [fio]);

	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проверка формата email
		return value.length >= 6 && value.length <= 128 && emailRegex.test(value);
	}

	const validationStateEmail = React.useMemo(() => {
		if (email === "") return undefined;

		return validateEmail(email) ? "valid" : "invalid";
	}, [email]);

	const validatePhone = (value: string) => {
		const phoneRegex = /^\d{10,20}$/; // Проверка наличия только цифр и длины от 10 до 20 символов
		return phoneRegex.test(value);
	};

	const validationStatePhone = React.useMemo(() => {
		if (phone === "") return undefined;

		return validatePhone(phone) ? "valid" : "invalid";
	}, [phone]);

	return (
		<Card className="max-w-[400px] m-auto">
			<CardHeader className='flex items-start flex-col'>
				<h1 className="font-bold text-large">Профиль</h1>
				<div>
					{error && <p className="text-red-500 mb-2">{error}</p>}
					{success && <p className="text-green-500 mb-2">Данные успешно сохранены</p>}
				</div>
			</CardHeader>
			<CardBody className='p-3'>
				<form onSubmit={handleSubmit}>
					<div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
						<Input
							value={fio}
							type="text"
							label="ФИО"
							variant="bordered"
							color={validationStateFio === "invalid" ? "danger" : "success"}
							errorMessage={
								validationStateFio === "invalid" && "Пожалуйста, введите ФИО от 2 до 128 символов"
							}
							validationState={validationStateFio}
							onValueChange={setFio}
							className="max-w-xs"
						/>
					</div>
					<div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
						<Input
							value={email}
							type="email"
							label="Email"
							variant="bordered"
							color={validationStateEmail === "invalid" ? "danger" : "success"}
							errorMessage={validationStateEmail === "invalid" && "Пожалуйста, введите email от 6 до 128 + проверка на то, что это email"}
							validationState={validationStateEmail}
							onValueChange={setEmail}
							className="max-w-xs"
						/>
					</div>
					<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
						<Input
							value={phone}
							type="text"
							label="Телефон"
							variant="bordered"
							color={validationStatePhone === "invalid" ? "danger" : "success"}
							errorMessage={
								validationStatePhone === "invalid" && "Пожалуйста, введите действительнйы телефон от 10 до 20 символов"
							}
							validationState={validationStatePhone}
							onValueChange={setPhone}
							className="max-w-xs"
						/>
					</div>
				</form>
			</CardBody>
			<CardFooter>
				<Button onClick={handleSubmit}>Сохранить</Button>
			</CardFooter>
		</Card>
	);
};

export default ProfilePage;
