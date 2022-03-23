import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import LOGIN_USER from '../../queries/login';
import { AuthContext } from '../../context/auth';

const SignIn = () => {
  const context = useContext(AuthContext);

  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      navigate('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          label="User Name"
          placeholder="UserName"
          name="userName"
          type="text"
          value={values.userName}
          error={errors.userName ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignIn;
