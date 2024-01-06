import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { positionsAsyncThunk } from '../../store/reducers/positions.slice'
import { setPositionId } from '../../store/reducers/sign-up.slice'
import { ChildProps } from '../../interfaces/interfaces'

const PositionRadio: React.FC<ChildProps> = ({ register }) => {
	const { positionId } = useAppSelector((state) => state.signup)
	const { positions } = useAppSelector((state) => state.positions)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(positionsAsyncThunk())
	}, [])

	const handlePositionChange = (selectedPositionId: string) => {
		dispatch(setPositionId(selectedPositionId))
	}

	return (
		<div className='space-y-2'>
			<h3>Select your position</h3>
			{positions.map((position) => (
				<div key={position.id} className='flex items-center space-x-3'>
					<input
						{...register('position_id', {
							required: 'Please choose your position',
							value: positionId,
						})}
						type='radio'
						name='position_id'
						id={position.name}
						value={position.id}
						onChange={(e) => handlePositionChange(e.target.value)}
					/>
					<label htmlFor={position.name}>{position.name}</label>
				</div>
			))}
		</div>
	)
}

export default PositionRadio
