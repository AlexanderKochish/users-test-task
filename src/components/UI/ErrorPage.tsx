import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
	const error: any = useRouteError()

	return (
		<div id='error-page'>
			<div className='w-full h-screen grid place-items-center'>
				<div className='min-h-12 bg-[--white-color] p-2 text-center'>
					<p className='text-2xl font-bold'>
						Sorry, an unexpected error has occurred.
					</p>
					<p className='text-xl font-bold'>
						<i>{error.statusText || error.message}</i>
					</p>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage
