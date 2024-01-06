import { Suspense, lazy } from 'react'
import Form from '../components/Form/Form'
import Header from '../components/Header/Header'
import Users from '../components/Users/Users'
import Preloader from '../components/UI/Preloader.js'

const Title = lazy(() => delayForDemo(import('../components/Title/Title')))

const UsersPage: React.FC = () => {
	return (
		<div>
			<div className='min-w-full bg-white'>
				<Header />
			</div>
			<main className='bg-[--bg-color] min-h-screen min-w-full'>
				<Suspense fallback={<Preloader />}>
					<Title />
				</Suspense>
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

function delayForDemo(promise: Promise<any>) {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000)
	}).then(() => promise)
}
