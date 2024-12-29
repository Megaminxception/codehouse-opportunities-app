'use client';
import React, { useState } from 'react';
import { Fieldset, Stack, Flex } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/textArea';
import { TextInput } from '@/components/ui/textInput';
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import {
	NativeSelectRoot,
	NativeSelectField,
} from '@/components/ui/native-select';
// Main issues currently:
// The checkbox isn't saving the state of the checked value. The examples I seen in docs used zod which I haven't tried yet
// The select dropdown styling and placeholder wise is not working out. I will be looking for someone who can help me with this.
// The rest of the form data is logging correctly
// the form state handling / submission will be seperated into custom hooks after the above issues are fixed
// Let me know if I should work on the end points etc for submission after the above issues are fixed
const PartnerRegistrationForm = () => {
	const [agreement, setAgreement] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		organization: '',
		website: '',
		location: '',
		industry: '',
		description: '',
		checked: agreement, // Added for the checkbox
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target || e;
		console.log('name:', name);
		setFormData((prev) => ({
			...prev,
			[name]: type === '' ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form Data:', formData);
	};

	return (
		<Flex
			bg='primaryWhite'
			minH='100vh'
			justify='center'
			align='center'>
			<form
				onSubmit={handleSubmit}
				className='w-full'>
				<Fieldset.Root
					pos='inherit'
					py='2rem'
					w='45%'
					align='center'>
					<Stack className='p-8 border border-gray-300 rounded shadow-md'>
						<Fieldset.Legend>
							<h1 className='text-5xl font-bold text-black '>
								Partner Registration
							</h1>
						</Fieldset.Legend>
						<h2 className='mb-4 text-2xl font-bold text-black'>
							Submit your profile for our students from top programs to view and
							reach out.
						</h2>

						<Flex
							gap={28}
							w='100%'>
							<Field label='Point of Contact First Name*'>
								<TextInput
									placeholder='Jane'
									name='firstName'
									onChange={handleChange}
								/>
							</Field>
							<Field label='Point of Contact Last Name*'>
								<TextInput
									placeholder='Doe'
									name='lastName'
									onChange={handleChange}
								/>
							</Field>
						</Flex>

						<Field label='Point of Contact Email*'>
							<TextInput
								placeholder='jane@doe.com'
								name='email'
								onChange={handleChange}
							/>
						</Field>

						<Field label='Organization*'>
							<TextInput
								placeholder='ABC Company'
								name='organization'
								onChange={handleChange}
							/>
						</Field>

						<Field label='Organization Website*'>
							<TextInput
								placeholder='abc.co'
								name='website'
								onChange={handleChange}
							/>
						</Field>

						<Field label='Organization Location*'>
							<TextInput
								placeholder='New York, NY USA'
								name='location'
								onChange={handleChange}
							/>
						</Field>

						<Field label='Industry*'>
							<NativeSelectRoot>
								<NativeSelectField
									name='industry'
									placeholder='Select your industry'
									items={[
										'Technology',
										'Healthcare',
										'Finance',
										'Education',
										'Other',
									]}
									onChange={handleChange}
								/>
							</NativeSelectRoot>
						</Field>

						<Field label='Organization Description*'>
							<TextArea
								id='description'
								placeholder="We're dedicated to the ABC's."
								name='description'
								onChange={handleChange}
							/>
						</Field>
						<Stack
							direction='row'
							align='center'>
							<Checkbox
								name='agreement'
								onCheckedChange={() => setAgreement((prev) => !prev)}
								className='w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
							/>
							<Stack mt={7}>
								<span className='text-white text-start'>
									I verify the responses above are correct.
								</span>
								<span className='text-sm text-gray-600 text-start'>
									By checking this box you certify the accuracy of your
									submission.
								</span>
							</Stack>
						</Stack>

						<Button
							type='submit'
							className='p-2 mt-4 text-white bg-black rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
							Submit
						</Button>
					</Stack>
				</Fieldset.Root>
			</form>
		</Flex>
	);
};
export default PartnerRegistrationForm;
