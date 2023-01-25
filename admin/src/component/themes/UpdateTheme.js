import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

import { putTheme } from '@/api/Themes/putTheme';

const UpdateTheme = (props) => {
    const themeID = props.data.id
    const [title, setTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.data.description);
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
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (title.length < 3) {
                setMessage('Le titre doit contenire au moins 3 caractères');
                setOpen(true);
                return;
            }
            const response = await putTheme(themeID, title, description);
            setMessage('Modification réussie');
            setTimeout(() => {
                props.onClose()
            }, 2000);
        } catch (error) {
            console.log(error);
            setMessage('Une erreur est survenue');
        }
        setOpen(true);
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter un Thème
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Titre</InputLabel>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Description</InputLabel>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </FormControl>
                    <Button variant="contained" sx={{ m: 1 }} type="submit">
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

export default UpdateTheme;