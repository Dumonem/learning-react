import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initialForm, register } from '../../modules/auth';
import AuthForm from './AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
		form: auth.register,
		auth: auth.auth,
		authError: auth.authError,
		user: user.user,
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
		const { username, password, passwordConfirm } = form;
		if (password !== passwordConfirm) {
			//TODO: 오류처리
			return;
		}
		dispatch(register({ username, password }));
	};

	useEffect(() => {
		dispatch(initialForm('register'));
	}, [dispatch]);

	useEffect(() => {
		if (authError) {
			console.log('오류 발생');
			console.log(authError);
			return;
		}
		if (auth) {
			console.log('회원가입 성공');
			// console.log(auth);
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			console.log('check API 성공');
			console.log(user);
			history.push('/');
		}
	}, [history, user]);

	return (
		<AuthForm
			type="register"
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default withRouter(RegisterForm);
