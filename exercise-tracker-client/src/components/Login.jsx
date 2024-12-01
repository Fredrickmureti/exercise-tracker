import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Form, Typography } from 'antd';
import { motion } from 'framer-motion';
import './Login.css';

const { Title, Text } = Typography;

const apiUrl = 'https://backend-gules-seven-67.vercel.app/api';

const LoginContainer = styled(motion.div)`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      const { token } = await response.json();
      setUser(token);
      navigate('/dashboard');
    } else {
      const errorData = await response.json();
      setError(errorData.error);
      console.error('Login failed:', errorData.error);
    }
  };

  return (
    <LoginContainer
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Title level={2} style={{ fontFamily: 'Pacifico, cursive', color: '#00ffcc' }}>
        Login
      </Title>
      {error && <Text type="danger">{error}</Text>}
      <StyledForm onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ background: '#00ffcc', borderColor: '#00ffcc' }}>
          Login
        </Button>
      </StyledForm>
      <Text>
        Don't have an account? <a href="/register">Register</a>
      </Text>
    </LoginContainer>
  );
};

export default Login;