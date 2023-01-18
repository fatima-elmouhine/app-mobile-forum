import * as React from 'react';
import { useState, useEffect } from 'react'
import { Card, Typography, Container ,Slide,
	Input, InputLabel, InputAdornment,
    FormControl, TextField,TextareaAutosize,
	Box, Snackbar, Alert, Button
} from '@mui/material';

import { userAuthentication } from '../api/Users/authentication';

const Login = () => {
    useEffect(() => {
        window.localStorage.getItem('token');
        if (window.localStorage.getItem('token') !== null) {
            window.location.href = '/Home';
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await userAuthentication(email, password);
            window.location.href = '/Home';
        } catch (error) {
             if (error.response.status === 403) {
                console.log('Oops', 'Mot de passe incorrect');
            } else if (error.response.status=== 404) {
                console.log('Oops', 'L\'utilisateur n\'a pas été trouvé');
            } else if (error.response.status === 400) {
                console.log('Oops', 'Tous les champs doivent etre remplis');
            } else {
                console.log('Oops', 'Erreur lors de la connexion de l\'utilisateur');
            }
        }
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default Login;