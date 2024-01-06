import { UseFormRegister } from 'react-hook-form'

export interface IData {
	count: number
	page: number
	success?: boolean
	totalPages: number
	totalUsers: number
}

export interface IUser {
	id: number
	name: string
	email: string
	phone: string
	position: string
	position_id: number
	registration_timestamp: number
	photo: string
}

export interface IPosition {
	id: number
	name: string
}

export interface ICreateUser {
	success: boolean
	user_id: number
	message: string
}

export interface IRegisterForm {
	name: string
	email: string
	phone: string
	position_id: string
	photo: FileList
}
export interface IPreloader {
	clazz?: string
}

export interface IButton {
	text: string
	clazz?: string
	onClick?: any
	disabled?: boolean
}

export interface IFormData {
	file: FileList
}

export interface IUserCard {
	user: IUser
}

export interface ChildProps {
	register: UseFormRegister<IRegisterForm> // Замените any на тип вашей формы
}
