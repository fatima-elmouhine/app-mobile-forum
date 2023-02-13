import * as React from 'react';
import { useState } from 'react';
import { Button, Box, Typography, Snackbar } from '@mui/material';
import { deleteTopic } from '@/api/Topics/deleteTopic';

export const DeleteTopic = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await deleteTopic(props.data.id);
            console.log(response);
            setMessage('Le forum a bien été supprimé !');
            setTimeout(() => {
                props.onClose();
            }, 2000);
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
                Êtes-vous sûr de vouloir supprimer ce forum ?<br></br>
                ({props.data.title})<br></br>
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
                onClick={() => props.onClose()}
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

export default DeleteTopic;