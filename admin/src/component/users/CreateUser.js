import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , Select,
	Input, InputLabel, MenuItem, FormControl,
	Box, Chip, Button, Snackbar
} from '@mui/material';

import { postUser } from '../../api/Users/postUser';

const CreateUser = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmepassword, setConfirmepassword] = useState('');
    const [role, setRole] = useState([]);
    const roles = [
        'ROLE_ADMIN',
        'ROLE_TUTOR',
        'ROLE_STUDENT'
    ];
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleFirstNameChange = (event) => {  
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmepasswordChange = (event) => {
        setConfirmepassword(event.target.value);
    };
    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRole(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmepassword) {
            setMessage('Les mots de passe ne correspondent pas');
            setOpen(true);
            return;
        }
        try {
            const response = await postUser(firstName, lastName, email, password, role);
            console.log(response);
            setMessage('Utilisateur créé avec succès');
            setTimeout(() => {
                props.onClose()
            }, 2000);
        } catch (error) {
            console.log(error);
             if (error.response.status === 404) {
                setMessage('Cette adresse email est déjà utilisée');
            } else if (error.response.status=== 406) {
                setMessage('Cette adresse email n\'est pas valide');
            } else if (error.response.status === 400) {
                setMessage('Tous les champs doivent etre remplis');
            } else {
                setMessage('Erreur lors de la création de l\'utilisateur');
            }
        }
        setOpen(true);
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter un utilisateur
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Prénom</InputLabel>
                        <Input
                            required
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Nom</InputLabel>
                        <Input
                            required
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <Input
                            required
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="password">Mot de passe</InputLabel>
                        <Input
                            required
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="password">Confirmer le mot de passe</InputLabel>
                        <Input
                            required
                            id="confirmepassword"
                            type="password"
                            value={confirmepassword}
                            onChange={handleConfirmepasswordChange}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id='role'>Rôle</InputLabel>
                        <Select
                            required
                            id="role"
                            labelId="role"
                            multiple
                            value={role}
                            onChange={handleRoleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {roles.map((role) => (
                                <MenuItem
                                  key={role}
                                  value={role}
                                >
                                  {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Enregistrer
                    </Button>
                    <Button
                        variant="contained"
                        color='inherit'
                        sx={{ m: 1 }}
                        type="submit"
                        onClick={() => props.onClose()}
                    >
                        Annuler
                    </Button>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={message}
                />
            </Card>
        </Container>
    );
};

export default CreateUser;