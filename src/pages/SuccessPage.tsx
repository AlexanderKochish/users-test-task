import { Link } from 'react-router-dom'
import successImage from '../images/success-image.svg'
import Button from '../components/UI/Button'

const SuccessPage: React.FC = () => {
	return (
		<div className='w-full h-screen grid place-items-center px-5'>
			<div>
				<div className='flex items-start'>
					<div className='mr-4'>
						<Link to={'/'}>
							<Button text='Return' />
						</Link>
					</div>
					<h3 className='text-xl mb-10'>User successfully registered</h3>
				</div>
				<div>
					<img src={successImage} alt='success_image' loading='lazy'/>
				</div>
			</div>
		</div>
	)
}

export default SuccessPage
