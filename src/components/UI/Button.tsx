import { IButton } from '../../interfaces/interfaces'

const Button: React.FC<IButton> = ({ text, clazz, onClick, disabled }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={
				disabled
					? `bg-[--disabled-color] text-white rounded-2xl px-4 py-1 self-center`
					: `${clazz} bg-[--btn-color] rounded-2xl px-4 py-1 hover:bg-[--btn-hover] duration-200 self-center`
			}
		>
			{text}
		</button>
	)
}

export default Button
