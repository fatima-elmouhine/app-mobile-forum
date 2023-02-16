import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

import { getThemes } from '@/api/Themes/getThemes';
import { updateQcmQuestion } from '@/api/Qcm/updateQcmQuestion';

const UpdateQcmQuestion = (props) => {
    const questionID = props.data.id;
    const [text, setText] = useState(props.data.text);
    const [theme, setTheme] = useState(props.data.id_theme);
    const [itemTheme, setItemTheme] = useState([]);
    useEffect(() => {
        getThemes().then((data) => {
            setItemTheme(data);
        });
    }, []);

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
    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateQcmQuestion(questionID, text, theme);
        if (response) {
            setMessage('Question modifié avec succès');
            setOpen(true);
        } else {
            setMessage('Erreur lors de la modification de la question');
            setOpen(true);
        }
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Modifier une Question
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Question</InputLabel>
                        <Input
                            required
                            id="text"
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id='type'>Choisissez le thème de la question</InputLabel>
                        <Select
                            required
                            id="type"
                            label="Choisissez le thème de la question"
                            value={theme}
                            onChange={handleThemeChange}
                        >
                            {console.log('itemTheme', itemTheme)}
                            {itemTheme.map((themeSelect) => (
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

export default UpdateQcmQuestion;