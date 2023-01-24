import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , Input, 
    InputLabel, FormControl, Button, Snackbar
} from '@mui/material';

import { postMessageTopic } from '@/api/Topics/postTopicMessage';

const CreateMessage = () => {
    const [text, setText] = useState('');
    const userID = window.localStorage.getItem('userID');
    const topicID = window.localStorage.getItem('topicID');
    
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleTextChange = (event) => {  
        setText(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postMessageTopic(text, userID, topicID);
            console.log(response);
            setMessage('Message envoyer !');
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
                    Envoyer un message
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Text</InputLabel>
                        <Input
                            required
                            id="text"
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
                        Envoyer
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

export default CreateMessage;