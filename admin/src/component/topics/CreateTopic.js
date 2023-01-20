import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , Select,
	Input, InputLabel, MenuItem, FormControl,
	Box, Chip, Button, Snackbar
} from '@mui/material';

import { postTopic } from '@/api/Topics/postTopic';

const CreateTopic = () => {

    const [title, setTitle] = useState('');
    const [userID, setUserID] = useState('');
    const [themeID, setThemeID] = useState('');
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
    const handleUserIDChange = (event) => {
        setUserID(event.target.value);
    };
    const handleThemeIDChange = (event) => {
        setThemeID(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title < 3) {
            setMessage('Le titre doit contenir au moins 3 caractères');
            setOpen(true);
            return;
        }
        try {
            const topicInformations = [
                title,
                userID,
                themeID
            ]
            const response = await postTopic(topicInformations);
            console.log(response);
            setMessage('Le forum a bien été créé !');
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
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>de ?</InputLabel>
                        <Input
                            required
                            id="userID"
                            type="text"
                            value={userID}
                            onChange={handleUserIDChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>Choisissez un thème</InputLabel>
                        <Input
                            required
                            id="themeID"
                            type="email"
                            value={themeID}
                            onChange={handleThemeIDChange}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Enregistrer
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

export default CreateTopic;