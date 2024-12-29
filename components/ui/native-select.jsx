export const NativeSelectRoot = ({ children }) => {
	return <div className='w-full p-4 bg-white rounded'>{children}</div>;
};

export const NativeSelectField = ({
	name,
	items,
	placeholder = 'Select an option',
	onChange,
}) => {
	return (
		<select
			name={name}
			defaultValue=''
			className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
			onChange={onChange}>
			<option
				value=''
				disabled
				hidden>
				{placeholder}
			</option>
			{items.map((item, index) => (
				<option
					key={index}
					value={item}>
					{item}
				</option>
			))}
		</select>
	);
};
