import { IUserCard } from '../../interfaces/interfaces'
import placeholder from '../../images/photo-cover.png'

const UserCard: React.FC<IUserCard> = ({ user }) => {
	const photo =
		user.photo === `${import.meta.env.VITE_PLACEHOLDER_URL}placeholder.png`
			? placeholder
			: user.photo
	return (
		<li className='w-[280px] min-h-[254px] lg:w-[320px] lg:min-h-[204px] xl:w-[350px] xl:min-h-[254px] bg-[--white-color] grid place-items-center rounded-md p-5'>
			<div>
				<img
					className='w-[70px] h-[70px] rounded-full'
					src={photo}
					alt='user-avatar'
					loading='lazy'
				/>
			</div>
			<ul className='flex flex-col items-center justify-center overflow-hidden w-full truncate'>
				<li>{user.name}</li>
				<li>{user.position}</li>
				<li title={user.email} className='cursor-pointer'>
					{user.email}
				</li>
				<li>{user.phone}</li>
			</ul>
		</li>
	)
}

export default UserCard
