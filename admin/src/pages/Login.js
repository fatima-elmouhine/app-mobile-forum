import * as React from 'react';
import { useState, useEffect } from 'react'
import { Card, Typography, Container,
	Input, InputLabel, FormControl,
	Snackbar, Button
} from '@mui/material';

import { userAuthentication } from '../api/Users/authentication';

const Login = () => {
    useEffect(() => {
        window.localStorage.getItem('token');
        if (window.localStorage.getItem('token') !== null) {
            window.location.href = '/Users';
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    
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
            setMessage('Connexion réussie');
            // return;
            window.location.href = '/Users';
        } catch (error) {
             if (error.response.status === 403) {
                console.log('Mot de passe incorrect');
                setMessage('Mot de passe incorrect');
                return;
            } else if (error.response.status=== 404) {
                console.log('L\'utilisateur n\'a pas été trouvé');
                setMessage('L\'utilisateur n\'a pas été trouvé');
                return;
            } else if (error.response.status === 400) {
                console.log('Tous les champs doivent etre remplis');
                setMessage('Tous les champs doivent etre remplis');
                return;
            } else if (error.response.status === 401) {
                console.log('Vous n\'avez pas les droits d\'accès');
                setMessage('Vous n\'avez pas les droits d\'accès');
                return;
            } else {
                console.log('Erreur lors de la connexion de l\'utilisateur');
                setMessage('Erreur lors de la connexion de l\'utilisateur');
                return;
            }
        }
        setOpen(true);
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
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={message}
                    aaction={{
                        label: 'X',
                        onPress: () => {
                          handleClose();
                        },
                    }}
                />
            </Card>
        </Container>
    );
};

export default Login;