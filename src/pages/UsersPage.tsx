import Form from '../components/Form/Form'
import Header from '../components/Header/Header'
import Title from '../components/Title/Title'
import Users from '../components/Users/Users'

const UsersPage: React.FC = () => {
	return (
		<div>
			<div className='min-w-full bg-white'>
				<Header />
			</div>
			<main className='bg-[--bg-color] min-h-screen min-w-full'>
				<Title />
				<section
					id='users-section'
					className='max-w-[1200px]  min-h-screen mx-auto px-[15px]'
				>
					<Users />
				</section>
				<section
					id='sigup-section'
					className='max-w-[1200px] min-h-screen mx-auto px-[15px]'
				>
					<Form />
				</section>
			</main>
		</div>
	)
}

export default UsersPage
