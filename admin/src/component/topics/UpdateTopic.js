import * as React from 'react';
import { useState } from 'react'
import { Card, Typography, Container , Select,
	Snackbar, InputLabel, MenuItem,
    FormControl, Box, Chip, Button, Input
} from '@mui/material';

import { putTopic } from '@/api/Topics/putTopic';

const UpdateUser = (props) => {
    
    const topicID = props.data.id;
    const [title, setTitle] = useState(props.data.title);
    const [userID, setuserID] = useState(props.data.id_user);
    const [themeID, setThemeID] = useState(props.data.id_theme);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title < 3) {
            setMessage('Le titre doit contenir au moins 3 caractères');
            return;
        }
        try {
            const topicInformations = await putTopic(topicID, title, userID, themeID);
            console.log(topicInformations);
            setMessage('Le forum a bien été modifié !');
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
                    Modifier un forum
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">title</InputLabel>
                        <Input
                            type="text"
                            value={title}
                            onChange={text => setTitle(text.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">De ?</InputLabel>
                        <Input
                            type="text"
                            value={userID}
                            onChange={text => setuserID(text.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="email">Thème</InputLabel>
                        <Input
                            type="email"
                            value={themeID}
                            onChange={text => setThemeID(text.target.value)}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Modifier
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