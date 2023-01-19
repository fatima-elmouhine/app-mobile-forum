import * as React from 'react';
import { useState, useEffect } from 'react'
import { Card, Typography, Container , Select,
	Input, InputLabel, MenuItem,
    FormControl, OutlinedInput,
	Box, Chip, Alert, Button
} from '@mui/material';

import { getUser } from '../api/Users/getUser';

const UpdateUser = (props) => {
    console.log('props', props);

    useEffect(() => {
        window.localStorage.getItem('token');
        if (window.localStorage.getItem('token') == null) {
            window.location.href = '/Login';
        }
    }, []);

    const [user, setUser] = useState([]);
    // console.log('user', user);
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdate = (id) => {
        getUser(id).then((data) => {
            // console.log(data);
        });
    };
    
    return (
        <Container>
            <Card>
                <Typography variant="h4" component="div" sx={{ p: 2 }}>
                    Modifier un utilisateur
                </Typography>
                <Box sx={{ p: 2 }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Prénom</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={user.firstName}
                            onChange={handleChange}
                            label="Prénom"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Nom</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={user.lastName}
                            onChange={handleChange}
                            label="Nom"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">E-mail</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={user.email}
                            onChange={handleChange}
                            label="E-mail"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user.role}
                            label="Rôle"
                        >
                            <MenuItem value={10}>Administrateur</MenuItem>
                            <MenuItem value={20}>Utilisateur</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Mot de passe</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={user.password}
                            onChange={handleChange}
                            label="Mot de passe"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Confirmer le mot de passe</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={user.password}
                            onChange={handleChange}
                            label="Confirmer le mot de passe"
                        />
                    </FormControl>
                    <Box sx={{ m: 1 }}>
                        <Button variant="contained">Modifier</Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default UpdateUser;