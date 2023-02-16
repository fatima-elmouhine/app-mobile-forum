import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

import { getTypes } from '@/api/Qcm/getTypes';
import { updateQcm } from '@/api/Qcm/updateQcm';

const UpdateQcm = (props) => {
    const qcmID = props.data.id;
    const [title, setTitle] = useState(props.data.title);
    const [type, setType] = useState(props.data.id_type);
    const [itemTypes, setItemTypes] = useState([]);
    useEffect(() => {
        getTypes().then((data) => {
            setItemTypes(data);
        });
    }, []);
    console.log('itemTypes', itemTypes);
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
    const handleTypesChange = (event) => {
        setType(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateQcm(title, type, qcmID);
        if (response.status == 201) {
            setMessage('QCM modifié avec succès');
            setOpen(true);
        } else {
            setMessage('Erreur lors de la modification du QCM');
            setOpen(true);
        }
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Modifier un QCM
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
                        <InputLabel id='type'>Choisissez le type du QCM</InputLabel>
                        <Select
                            required
                            id="type"
                            label="Choisissez le type du QCM"
                            value={type}
                            onChange={handleTypesChange}
                        >
                            {itemTypes.map((typeSelect) => (
                                <MenuItem key={typeSelect.id} value={typeSelect.id}>
                                    {typeSelect.type_name}
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

export default UpdateQcm;