import React from 'react';

export const NativeSelectRoot = ({ children }) => {
	return <div className='w-full bg-white rounded'>{children}</div>;
};

export const NativeSelectField = ({
	name,
	items,
	placeholder = 'Select an option',
	...rest
}) => {
	return (
		<select
			name={name}
			className={`w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 `}
			{...rest}>
			{/* Placeholder Option */}
			<option
				value=''
				disabled
				hidden
				style={{ color: 'gray', opacity: 15 }}>
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
