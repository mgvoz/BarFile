import React from 'react';
import logo from '../../images/logo.png';
import { GoogleLogin } from 'react-google-login';

function HomeDesktop({
	switchMode,
	googleSuccess,
	googleFailure,
	handleChange,
	handleSubmit,
	isSignup,
}) {
	return (
		<div className='home-container'>
			<div className='row'>
				<div className='col-8'>
					<img className='home-logo' src={logo} alt='BarFile logo' />
				</div>
				<div id='sign-in-form' className='col-4'>
					<center>
						<h1 className='sign-in-header'>Welcome to BarFile</h1>
						<h3>
							The premier app for tracking bar inventory. Login or
							Sign Up below to get started.
						</h3>
						<div className='sign-in-container'>
							<h2 className='login-heading'>
								{isSignup ? 'Sign Up' : 'Log In'}
							</h2>
							<form onSubmit={handleSubmit}>
								{isSignup && (
									<>
										<div className='form-group'>
											<label htmlFor='name'>
												Enter Name:
											</label>
											<input
												required
												autoFocus
												name='name'
												type='name'
												className='form-control'
												onChange={handleChange}
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='email'>
												Enter Email:
											</label>
											<input
												required
												name='email'
												type='email'
												className='form-control'
												aria-describedby='emailHelp'
												onChange={handleChange}
											/>
											<small
												id='emailHelp'
												className='form-text text-muted'
											>
												We'll never share your email
												with anyone else.
											</small>
										</div>
										<div className='form-group'>
											<label htmlFor='exampleInputPassword1'>
												Create Password:
											</label>
											<input
												required
												name='password'
												type='password'
												className='form-control'
												onChange={handleChange}
											/>
											<small
												id='emailHelp'
												className='form-text text-muted'
											>
												Passwords must be at least 8
												characters, including letters
												and numbers.
											</small>
										</div>
										<div className='form-group'>
											<label htmlFor='exampleInputPassword1'>
												Re-type Password:
											</label>
											<input
												required
												name='confirmPassword'
												type='password'
												className='form-control'
												onChange={handleChange}
											/>
										</div>
										<center>
											<button
												type='submit'
												className='btn'
											>
												Create Account
											</button>
										</center>
										<center>
											<GoogleLogin
												clientId='976614262105-gqgkb1454iahaef5ctvag321ahlpm82r.apps.googleusercontent.com'
												render={(renderProps) => (
													<button
														className='btn'
														onClick={
															renderProps.onClick
														}
														disabled={
															renderProps.disabled
														}
													>
														Or Signup with Google
													</button>
												)}
												onSuccess={googleSuccess}
												onFailure={googleFailure}
												cookiePolicy='single_host_origin'
											/>
										</center>
										<button
											className='btn'
											onClick={switchMode}
										>
											Already have an account? Sign in
											here.
										</button>
									</>
								)}
								{!isSignup && (
									<>
										<div className='form-group'>
											<label htmlFor='username'>
												Username:
											</label>
											<input
												name='email'
												type='email'
												className='form-control'
												required
												autoFocus
												onChange={handleChange}
											/>
											<small
												id='emailHelp'
												className='form-text text-muted'
											>
												This will be your email address.
											</small>
										</div>
										<div className='form-group'>
											<label htmlFor='password'>
												Password:
											</label>
											<input
												required
												name='password'
												type='password'
												className='form-control'
												onChange={handleChange}
											/>
										</div>
										<center>
											<button
												onClick={handleSubmit}
												type='submit'
												className='btn'
											>
												Submit
											</button>
										</center>
										<center>
											<GoogleLogin
												clientId='976614262105-gqgkb1454iahaef5ctvag321ahlpm82r.apps.googleusercontent.com'
												render={(renderProps) => (
													<button
														className='btn'
														onClick={
															renderProps.onClick
														}
														disabled={
															renderProps.disabled
														}
													>
														Or Sign In with Google
													</button>
												)}
												onSuccess={googleSuccess}
												onFailure={googleFailure}
												cookiePolicy='single_host_origin'
											/>
										</center>
										<center>
											<div className='login-links'>
												<button
													className='btn'
													onClick={switchMode}
												>
													Click here to create an
													account
												</button>
											</div>
										</center>
									</>
								)}
							</form>
						</div>
					</center>
				</div>
			</div>
		</div>
	);
}

export default HomeDesktop;
