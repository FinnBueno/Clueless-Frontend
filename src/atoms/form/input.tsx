import React from 'react';
import { Text, Box, Flex } from 'rebass';
import { Input } from '@rebass/forms';
import { Field, FieldAttributes } from 'formik';

export const AdvancedInput: React.FC<InputProps> = props => (
	<Flex flexDirection='column'>
		{props.caption && (
			<Text variant='forms.caption' mt={2}>{props.caption}</Text>
		)}
		<Field
			id={props.id || props.name}
			{...props}
		>
			{(formikField: any) => (
				<Input
					variant={props.variant || 'input'}
					mt={props.caption ? 1 : 3}
					type={props.type}
					{...formikField.field}
				/>
			)}
		</Field>
		{props.errors[props.name] && (props.touched[props.name] || props.submitCount > 0) ? (
			<Text mt={1} mb={1} variant='error'>{props.errors[props.name]}</Text>
		) : (
			<Box mt='26px' />
		)}
	</Flex>
);

interface InputProps extends FieldAttributes<any> {
	errors: {
		[key: string]: any;
	};
	touched: {
		[key: string]: any;
	};
	submitCount: number;
	name: string;
	type: string;
	caption?: string;
	variant?: string;
}
