import logo from '../../assets/Logo.svg'
import Button from '../UI/Button'

const Header: React.FC = () => {
	return (
		<header className='flex items-center px-[15px] justify-between mx-auto bg-[--white-color] max-w-[1200px] min-h-[60px]'>
			<div>
				<a href='#'>
					<img className='w-[104] h-[26]' src={logo} alt='app-logo' />
				</a>
			</div>
			<div className='flex items-center space-x-3'>
				<a href='#users-section'>
					<Button text='Users' />
				</a>
				<a href='#sigup-section'>
					<Button text='Sign Up' />
				</a>
			</div>
		</header>
	)
}

export default Header
