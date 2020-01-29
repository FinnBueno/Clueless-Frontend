import React from 'react';
import { Text, Box, Button, Flex } from 'rebass';
import { Input } from '@rebass/forms';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

export const LoginForm: React.FC<LoginFormProps> = (props) => (
    <Formik
        initialValues={{
            pin: '',
            password: '',
        }}
        validationSchema={yup.object().shape({
            pin: yup.string()
                .min(6, 'A pin has 6 digits!.')
                .max(6, 'A pin has 6 digits!')
                .required('A pin is required!'),
            password: yup.string()
                .required('A password is required!')
        })}
        onSubmit={(values) => props.onSubmit(values.pin, values.password)}
    >
        {({ errors, touched, isSubmitting, submitForm, submitCount }) => (
            <form autoComplete="off">
                <Field
                    name='pin'
                    id='pin'
                    // @ts-ignore
                    render={({ field }) => (
                        <Input
                            mt={3}
                            type='number'
                            placeholder='123456'
                            {...field}
                        />
                    )}
                />
                {errors.pin && (touched.pin || submitCount > 0) ? (
                    <Text mt={1} mb={1} variant='error'>{errors.pin}</Text>
                ) : (
                    <Box mt='26px' />
                )}
                <Field
                    name='password'
                    id='password'
                    // @ts-ignore
                    render={({ field }) => (
                        <Input
                            mt={3}
                            type='password'
                            placeholder='Password'
                            {...field}
                        />
                    )}
                />
                {errors.password && (touched.password || submitCount > 0) ? (
                    <Text mt={1} mb={1} variant='error'>{errors.password}</Text>
                ) : (
                    <Box mt='26px' />
                )}
                <Flex justifyContent='center' p={2}>
                    <Button onClick={submitForm} variant='primary' disabled={isSubmitting}>Join</Button>
                </Flex>
            </form>
        )}
    </Formik>
);

interface LoginFormProps {
    onSubmit: (pin: string, password: string) => void;
}
