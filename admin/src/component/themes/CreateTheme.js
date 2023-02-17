import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , Input, 
    InputLabel, FormControl, Button, Snackbar
} from '@mui/material';

import { postTheme } from '@/api/Themes/postTheme';

const CreateTheme = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
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
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        console.log('ici', event.target.files[0]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (title.length < 3) {
                setMessage('Le titre doit contenire au moins 3 caractères');
                setOpen(true);
                return;
            }
            const formData = new FormData();
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: `image-${Date.now()}.jpg`,
            });
            const response = await postTheme(title, description, formData);
            setMessage('Le thème a bien été créé');
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
                <form onSubmit={handleSubmit} action='/upload_files' enctype='multipart/form-data'>
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
                        <InputLabel htmlFor="text">Description</InputLabel>
                        <Input
                            required
                            id="description"
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Button variant='contained' component='label' color='secondary'>
                            Ajouter une image
                            <input
                                type="file"
                                accept='image/*'
                                hidden
                                multiple
                                onChange={handleImageChange}
                            />
                        </Button>
                    </FormControl>
                    <Button variant="contained" sx={{ m: 1 }} type="submit">
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

export default CreateTheme;