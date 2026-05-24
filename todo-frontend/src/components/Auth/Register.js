import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #45a049;
  }
`;

const Link = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;

  button {
    background: none;
    border: none;
    padding: 0;
    color: #4CAF50;
    cursor: pointer;
    font: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Error = styled.p`
  color: #d32f2f;
  text-align: center;
  margin-bottom: 15px;
`;

const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/auth/register', {
                email,
                password
            });

            console.log('Registration successful:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to todos
            window.location.href = '/todos';
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>Create Account</Title>
                {error && <Error>{error}</Error>}

                <form onSubmit={handleRegister}>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password (min 6 characters)"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                        />
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </Button>
                </form>

                <Link>
                    Already have an account? <button type="button" onClick={onSwitchToLogin}>Login here</button>
                </Link>
            </FormContainer>
        </Container>
    );
};

export default Register;
