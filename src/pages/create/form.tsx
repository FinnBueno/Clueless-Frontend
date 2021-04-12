import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ProgressButton } from 'src/atoms/progress-button';
import { Flex } from 'rebass';
import { AdvancedInput } from 'src/atoms/form';

export const CreateForm: React.FC<CreateFormProps> = props => (
	<Formik
		initialValues={{
			password: '',
			teamAmount: 2,
			gridSize: 5,
		}}
		validationSchema={yup.object().shape({
			password: yup.string()
				.min(6, 'A bit longer wouldn\'t hurt')
				.required('Password is required'),
			teamAmount: yup.number()
				.min(2, 'The min is 2')
				.max(4, 'The max is 4'),
			gridSize: yup.number()
				.min(4, 'The min is 4')
				.max(7, 'The max is 7')
		})}
		onSubmit={({ password, teamAmount, gridSize }) => props.onSubmit(password, teamAmount || 2, gridSize || 5)}
	>
		{({ errors, touched, isSubmitting, submitForm, submitCount }) => (
			<>
				<AdvancedInput
					errors={errors}
					touched={touched}
					submitCount={submitCount}
					name='password'
					type='password'
					caption='Password'
				/>
				<Flex justifyContent='space-between' width='100%'>
					<AdvancedInput
						variant='number'
						errors={errors}
						touched={touched}
						submitCount={submitCount}
						name='teamAmount'
						type='number'
						caption='Teams'
						min={2}
						max={9}
					/>
					<AdvancedInput
						variant='number'
						errors={errors}
						touched={touched}
						submitCount={submitCount}
						name='gridSize'
						type='number'
						caption='Grid size'
						min={4}
						max={7}
					/>
				</Flex>
				<ProgressButton
					scope='fetch-game'
					variant='primary'
					disabled={isSubmitting}
					onClick={submitForm}
				>
                    Create
				</ProgressButton>
			</>
		)}
	</Formik>
);

interface CreateFormProps {
	onSubmit: (password: string, teamSize: number, gridSize: number) => void;
}
