import React from 'react'
import Button from '../UI/Button'

const Title: React.FC = () => {
	return (
		<div className='max-w-[1200px] mx-auto h-[650px]'>
			<div className='title'>
				<div className='w-full h-full grid place-items-center'>
					<div className='flex flex-col items-center -mt-5'>
						<h1 className='text-white font-bold leading-[40px] text-3xl md:text-[40px] mb-5'>
							Test assignment for <br />
							front-end developer
						</h1>
						<p className='text-center text-[16px] leading-7 max-w-[380px] sm:leading-[26px] inline-block text-white mb-6'>
							What defines a good front-end developer is one that has skilled
							knowledge of HTML, CSS, JS with a vast understanding of User
							design thinking as they'll be building web interfaces with
							accessibility in mind. They should also be excited to learn, as
							the world of Front-End Development keeps evolving.
						</p>
						<a href='#sigup-section'>
							<Button text='Sign Up' />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Title
