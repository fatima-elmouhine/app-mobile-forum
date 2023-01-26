import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

import { getThemes } from '@/api/Themes/getThemes';
import { getUsers } from '@/api/Users/getUsers';
import { putTopic } from '@/api/Topics/putTopic';

const UpdateTopic = (props) => {
    const topicID = props.data.id;
    const [title, setTitle] = useState(props.data.title);
    const [users, setUsers] = useState(props.data.userID);
    const [themes, setThemes] = useState(props.data.themeID);
    const [itemUsers, setItemUsers] = useState([]);
    const [itemThemes, setItemThemes] = useState([]);
    useEffect(() => {
        const fetchThemes = async () => {
            const themesItems = await getThemes();
            setItemThemes(themesItems);
        };
        const fetchUsers = async () => {
            const usersItems = await getUsers();
            setItemUsers(usersItems);
        };
        fetchUsers();
        fetchThemes();
    }, []);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleTitleChange = (event) => {  
        setTitle(event.target.value);
    };
    const handleUserChange = (event) => {
        setUsers(event.target.value);
    };
    const handleThemeChange = (event) => {
        setThemes(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title < 3) {
            setMessage('Le titre doit contenir au moins 3 caractères');
            setOpen(true);
            return;
        }
        try {
            const response = await putTopic(topicID, title, users, themes);
            console.log(response);
            setMessage('Le Forum a bien était modifier !');
            setTimeout(() => {
                props.onClose();
            }, 2000);
        } catch (error) {
            console.log(error);
            setMessage('Une erreur est survenue !');
        }
        setOpen(true);
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter un forum
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Titre</InputLabel>
                        <Input
                            required
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id='users'>De qui cela provient ?</InputLabel>
                        <Select
                            required
                            id="users"
                            labelId="users"
                            value={users}
                            onChange={handleUserChange}
                        >
                            {itemUsers.map((userSelect) => (
                                <MenuItem key={userSelect.id} value={userSelect.id}>
                                    {userSelect.firstName} {userSelect.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id='themes'>Choisissez un thème</InputLabel>
                        <Select
                            required
                            id="themes"
                            labelId="themes"
                            value={themes}
                            onChange={handleThemeChange}
                        >
                            {itemThemes.map((themeSelect) => (
                                <MenuItem key={themeSelect.id} value={themeSelect.id}>
                                    {themeSelect.title}
                                </MenuItem>
                            ))}
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

export default UpdateTopic;