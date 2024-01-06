import { IPreloader } from '../../interfaces/interfaces'

const Preloader: React.FC<IPreloader> = ({ clazz }) => {
	return (
		<div className={clazz}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				style={{
					margin: 'auto',
					background: 'inherit',
					display: 'block',
					shapeRendering: 'auto',
					width: '200px',
					height: '200px',
				}}
				viewBox='0 0 100 100'
				preserveAspectRatio='xMidYMid'
			>
				<circle
					cx='50'
					cy='50'
					fill='none'
					stroke='#00bdd3'
					strokeWidth='4'
					r='20'
					strokeDasharray='94.24777960769379 33.41592653589793'
				>
					<animateTransform
						attributeName='transform'
						type='rotate'
						repeatCount='indefinite'
						dur='1s'
						values='0 50 50;360 50 50'
						keyTimes='0;1'
					></animateTransform>
				</circle>
			</svg>
		</div>
	)
}

export default Preloader
