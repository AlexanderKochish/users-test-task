import React, { useEffect, useState } from 'react'
import PositionRadio from './PositionRadio'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import {
	getTokenAsyncThunk,
	signUpAsyncThunk,
} from '../../store/reducers/sign-up.slice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IRegisterForm } from '../../interfaces/interfaces'
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import Preloader from '../UI/Preloader'

const Form: React.FC = () => {
	const [fileName, setFileName] = useState<string>('')
	const { status } = useAppSelector((state) => state.signup)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IRegisterForm>({ criteriaMode: 'firstError', mode: 'onChange' })
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getTokenAsyncThunk())
	}, [])

	const createUser: SubmitHandler<IRegisterForm> = async (
		data,
	): Promise<void> => {
		await dispatch(signUpAsyncThunk(data))
		navigate('/success')
	}

	return (
		<div className='text-center w-full h-screen grid place-items-center'>
			<h2 className='text-2xl sm:text-4xl'>Working with POST request</h2>
			{status === 'loading'? 
			<div className='min-h-[567px] grid place-items-center'>
				<Preloader/>
			</div> 
			: 
			<form
				onSubmit={handleSubmit(createUser)}
				className='flex text-start flex-col pb-5 w-[280px] sm:w-[300px] md:w-[380px] min-h-[567px] justify-between rounded-sm'
			>
				<input
					type='text'
					placeholder='Your name'
					id='name'
					className='h-[54px] pl-4 rounded-sm'
					{...register('name', {
						required: 'This field is required',
						minLength: {
							value: 2,
							message: 'Minimum length is 5 characters',
						},
						maxLength: {
							value: 60,
							message: 'Maximum length is 60 characters',
						},
					})}
				/>
				<label htmlFor='name' className='text-redColor -mb-2'>
					{errors.name?.message}
				</label>
				<input
					type='email'
					placeholder='Email'
					id='email'
					className='h-[54px] pl-4 rounded-sm'
					{...register('email', {
						required: 'This field is required',
						minLength: {
							value: 2,
							message: 'Minimum length is 2 characters',
						},
						maxLength: {
							value: 100,
							message: 'Maximum length is 100 characters',
						},
						pattern: {
							value:
								/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
							message: 'Please enter correct email format',
						},
					})}
				/>
				<label htmlFor='email' className='text-redColor -mb-2'>
					{errors.email?.message}
				</label>
				<input
					type='tel'
					id='phone'
					defaultValue={'+380'}
					placeholder='Phone'
					className='h-[54px] pl-4 rounded-sm'
					{...register('phone', {
						required: 'This field is required',
						pattern: {
							value: /^[\+]{0,1}380([0-9]{9})$/,
							message: 'Enter the correct phone format "+380 XX XXX XX XX"',
						},
					})}
				/>
				{!errors.phone?.message ? (
					<span className='text-black -mt-2'>+38 (XXX) XXX - XX - XX</span>
				) : (
					<label htmlFor='phone' className='text-redColor -mb-2'>
						{errors.phone?.message}
					</label>
				)}

				<PositionRadio register={register} />
				<span className='text-redColor'>{errors.position_id?.message}</span>
				<input
					{...register('photo', {
						required: true,
						validate: {
							validFileType: (value: FileList | any) => {
								const validExtensions = ['jpg', 'jpeg']
								setFileName(value[0]?.name)
								let extension = value[0].name.split('.').pop().toLowerCase()
								return (
									validExtensions.includes(extension) || 'Invalid file type'
								)
							},
							validFileSize: (value: FileList) => {
								const maxSize = 5 * 1024 * 1024 // 5 MB
								return (
									value[0].size <= maxSize ||
									'File size should be less than 5 MB'
								)
							},
							validImageDimensions: async (value: FileList) => {
								return new Promise((resolve) => {
									const img = new Image()
									img.src = URL.createObjectURL(value[0])
									img.onload = () => {
										const minWidth = 70
										const minHeight = 70
										const isValidDimensions =
											img.width >= minWidth && img.height >= minHeight
										resolve(
											isValidDimensions ||
												'Minimum size of photo is 70x70 pixels',
										)
									}
								})
							},
						},
					})}
					type='file'
					name='photo'
					id='photo'
					className='hidden'
				/>
				<label
					htmlFor='photo'
					className='border cursor-pointer h-[54px] flex items-center rounded-sm overflow-hidden'
				>
					<span className='border-r inline-grid place-items-center h-full px-5'>
						Upload
					</span>
					<p className='ml-4'>{fileName}</p>
				</label>
				<span className='text-redColor -mb-2'>{errors.photo?.message}</span>
				<Button disabled={!isValid} text={'Sign Up'} />
			</form>}
		</div>
	)
}

export default Form
