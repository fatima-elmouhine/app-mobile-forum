import * as React from 'react';
import { useState } from 'react';
import { Button, Box, Typography, Snackbar } from '@mui/material';
import { deleteTopicMessage } from '@/api/Topics/deleteTopicMessage';

export const DeleteMessage = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await deleteTopicMessage(props.data.id);
            console.log(response);
            setMessage('La suppression a été effectuée !');
        } catch (e) {
            console.log(e);
            setMessage('Une erreur est survenue');
        }
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    return (
        <Box sx={{ background: '#f0f0f0', p: 2, m: 2, textAlign: 'center', margin: 'auto', marginTop: '16vh' }} maxWidth="sm">
            <Typography component="h1" gutterBottom>
                Êtes-vous sûr de vouloir supprimer ce message ?<br></br>
                Cette action est irréversible.
            </Typography>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="warning"
                type='submit'
                onClick={() =>handleSubmit()}
            >
                Oui
            </Button>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="inherit"
            >
                Non
            </Button>
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
        </Box>
    );
}

export default DeleteMessage;