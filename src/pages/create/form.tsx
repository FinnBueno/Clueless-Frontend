import React from 'react';
import { Text, Box } from 'rebass';
import { Input } from '@rebass/forms';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { ProgressButton } from 'src/atoms/progress-button';

export const CreateForm: React.FC<CreateFormProps> = (props) => (
    <Formik
        initialValues={{
            password: '',
        }}
        validationSchema={yup.object().shape({
            password: yup.string()
                .min(6, 'A bit longer wouldn\'t hurt.')
                .required('What\'s a game with no password?')
        })}
        onSubmit={({ password }) => props.onSubmit(password)}
    >
        {({ errors, touched, isSubmitting, submitForm, submitCount }) => (
            <>
                <Field
                    name='password'
                    id='password'
                    // @ts-ignore
                    render={({ field }) => (
                        <Input
                            mt={3}
                            placeholder='Password'
                            type='password'
                            {...field}
                        />
                    )}
                />
                {errors.password && (touched.password || submitCount > 0) ? (
                    <Text mt={1} mb={1} variant='error'>{errors.password}</Text>
                ) : (
                    <Box mt='26px' />
                )}
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
    onSubmit: (password: string) => void;
}
