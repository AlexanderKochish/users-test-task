import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { getUsersAsyncThunk, setPage, usersAsyncThunk } from '../../store/reducers/users.slice'
import UserCard from './UserCard'
import Button from '../UI/Button'
import Preloader from '../UI/Preloader'
import { IUser } from '../../interfaces/interfaces'
import ErrorPage from '../UI/ErrorPage'
import { setSuccess } from '../../store/reducers/sign-up.slice'

const Users: React.FC = () => {
	const { userData, users, status } = useAppSelector((state) => state.users)
	const { page, totalPages } = userData
	const { success } = useAppSelector((state) => state.signup.createUser)
	const dispatch = useAppDispatch()

	const pagination = () => {
		if (page < totalPages) {
			dispatch(setSuccess(false))
			dispatch(setPage(page + 1))	
		}
		return
	}

	useEffect(() => {
		if(success){
		 	dispatch(getUsersAsyncThunk())
		}
	},[])
	
	useEffect(() => {
		if (!success) {
			dispatch(usersAsyncThunk(page));
		}
		
	},[page, dispatch])

	return (
		<div className='flex flex-col space-y-4 py-10'>
			<h2 className='text-[--text-color] text-2xl sm:text-4xl my-5 text-center'>
				Working with GET request
			</h2>
			<View users={users} status={status} />
			
			<div className='text-center pt-6'>
				<Button
					text='Show more'
					disabled={page < totalPages ? false : true}
					onClick={pagination}
				/>
			</div>
		</div>
	)
}

export default Users

interface IUsersView {
	users: Array<IUser>
	status: string
}

export const View: React.FC<IUsersView> = ({ users, status }) => {
	const viewError = status === 'rejected' ? <ErrorPage /> : null

	return (
		<>
			{viewError}
			{status === 'loading' ? (
				<Preloader clazz='w-full min-h-[500px] grid place-items-center' />
			) : (
				<ul className='container mx-auto grid sm:grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-2 md:gap-3 lg:gap-7'>
					{users && users.map((user) => <UserCard key={user.id} user={user} />)}
				</ul>
			)}
		</>
	)
}
