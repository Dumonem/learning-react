import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initialForm } from '../../modules/auth';
import AuthForm from './AuthForm';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const { form } = useSelector(({ auth }) => ({
		form: auth.register,
	}));
	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'register',
				key: name,
				value,
			})
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		dispatch(initialForm('register'));
	}, [dispatch]);

	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default RegisterForm;
