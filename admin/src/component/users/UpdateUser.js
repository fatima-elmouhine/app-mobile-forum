import * as React from 'react';
import { useState } from 'react'
import { Card, Typography, Container , Select,
	Snackbar, InputLabel, MenuItem,
    FormControl, Box, Chip, Button, Input
} from '@mui/material';

import { putUser } from '../../api/Users/putUser';

const UpdateUser = (props) => {
    
    const userID = props.data.id;
    const [firstName, setFirstName] = useState(props.data.firstName);
    const [lastName, setLastName] = useState(props.data.lastName);
    const [email, setEmail] = useState(props.data.email);
    const avatarArray = props.data.avatar;
    const [avatar, setAvatar] = useState(avatarArray);
    const rolesArray = props.data.role?.split(',');
    const [role, setRole] = useState(rolesArray);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const avatars = './image1.png'
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

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRole(
            typeof value === 'string' ? value?.split(',') : value,
        );
    };

    const handleAvatarChange = (event) => {
        setAvatar(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var userInformations 
        if (password !== '' && passwordConfirm !== '') {
            if (password === passwordConfirm) {
                userInformations = {
                    id: userID,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    role: role,
                    password: password,
                    avatar: avatar
                };
            }
        } else {
            userInformations = {
                id: userID,
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: {role : role},
                avatar: avatar
            };
        }
        const response = await putUser(userInformations);
        setTimeout(() => {
            props.onClose()
        }, 2000);
        
        if (response === 404) {
            setMessage('Cet email est déjà utilisé !');
        } else {
            setMessage('L\'utilisateur a bien été modifié !');
        }
        setOpen(true);
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Modifier un utilisateur
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Prénom</InputLabel>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={text => setFirstName(text.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Nom</InputLabel>
                        <Input
                            type="text"
                            value={lastName}
                            onChange={text => setLastName(text.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={text => setEmail(text.target.value)}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id="role">Rôle</InputLabel>
                        <Select
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
                            {roles.map((roleItem, i) => (
                                <MenuItem
                                  key={i}
                                  value={roleItem}
                                >
                                  {roleItem}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="password">Mot de passe</InputLabel>
                        <Input
                            value={password}
                            onChange={text => setPassword(text.target.value)}
                            label="Mot de passe"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="password">Confirmer le mot de passe</InputLabel>
                        <Input
                            type="password"
                            value={passwordConfirm}
                            onChange={text => setPasswordConfirm(text.target.value)}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id="avatar">Avatar</InputLabel>
                        <Select
                            labelId="avatar"
                            value={avatar}
                            onChange={handleAvatarChange}
                        >
                                <MenuItem  
                                  value={avatars}
                                >
                                  Avatar par défaut
                                </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Modifier
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

export default UpdateUser;