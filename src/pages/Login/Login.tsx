import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { notification, userForm } from '../../interfaces';
import { findUser, saveUser } from '../../utils/localStorage';
import styles from './Login.module.css';

const Login: React.FC<{ type: 'login' | 'signup' }> = ({ type }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<userForm>();

  const onSubmit = (data: userForm) => {
    const { userName, email, password } = data;
    if (type === 'login') {
      findUser({ user: { email, password }, navigate });
    } else {
      saveUser({ user: { userName, email, password }, navigate });
    }

    console.log({ email, password });
  };

  return (
    <div className={styles.form_layout}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{type === 'login' ? 'Login to your acount' : 'Sign Up'}</h2>
          {type === 'signup' && (
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                User name
              </label>
              <input
                type='text'
                className={`form-control ${errors.userName && 'border-danger'}`}
                placeholder='Your user name'
                {...register('userName', {
                  required: {
                    value: true,
                    message: 'User name is required'
                  },
                  minLength: { value: 6, message: 'Min 6 character' }
                })}
              />
              {errors.userName ? (
                <span className='form-text text-danger'>
                  {errors.userName.message}
                </span> // Si hay un error en el registro de usuario se muestra el mensaje en un span
              ) : (
                <br />
              )}
            </div>
          )}

          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className={`form-control ${errors.email && 'border-danger'}`}
              id='exampleInputEmail1'
              placeholder='name@company.com'
              {...register('email', {
                required: { value: true, message: 'Email is required' }, // Si no hay nada escrito en el input de email se coloca un mensaje
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Si en el input no se cumple con esta expreción regular se coloca un mensaje distinto
                  message: 'Invalid email'
                }
              })}
            />
            {errors.email ? (
              <span className='form-text text-danger'>
                {errors.email.message}
              </span> // Si hay un error en el registro de usuario se muestra el mensaje en un span
            ) : (
              <br />
            )}
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Password
            </label>
            <div className='input-group mb-3 border'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.password && 'border-danger'
                } border-0 border-start border-bottom border-top`}
                placeholder='Password'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                  minLength: { value: 6, message: 'Min 6 character' }
                })}
              />
              <button
                className={`btn ${errors.password && 'border-danger'}`}
                type='button'
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                ></i>
              </button>
            </div>
            {errors.password ? (
              <span className='form-text text-danger'>
                {errors.password.message}
              </span>
            ) : (
              <br />
            )}
          </div>
          <div className='d-flex justify-content-end'>
            <button
              type='submit'
              className={`btn btn-${type === 'login' ? 'outline-' : ''}dark`}
            >
              {type === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        {type === 'login' && (
          <div className='d-flex flex-row gap-1 align-items-center'>
            <div className='form-text'>Don’t have an account yet? </div>
            <Link to={'/signup'}>sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
