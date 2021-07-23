import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

function Home() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isSignup, setIsSignup] = useState(false);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	//switch between log in and sign up
	const switchMode = () => {
		setIsSignup(!isSignup);
	};

	//submit log in or sign up
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(userData, history));
		} else {
			try {
				dispatch(signin(userData, history));
			} catch (err) {
				alert('Username or password incorrect.');
			}
		}
	};

	//capture user input
	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	//google sign in- success and failure
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		isSignup
			? console.log(
					'Google signup was unsuccessful. Try again later.',
					error,
			  )
			: console.log(
					'Google sign in was unsuccessful. Try again later.',
					error,
			  );
	};

	return (
		<>
			{window.innerWidth >= 1000 ? (
				<HomeDesktop
					switchMode={switchMode}
					googleSuccess={googleSuccess}
					googleFailure={googleFailure}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isSignup={isSignup}
				/>
			) : (
				<HomeMobile
					switchMode={switchMode}
					googleSuccess={googleSuccess}
					googleFailure={googleFailure}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isSignup={isSignup}
				/>
			)}
		</>
	);
}

export default Home;
