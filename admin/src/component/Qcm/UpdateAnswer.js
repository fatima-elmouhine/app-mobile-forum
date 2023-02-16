import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , FormControlLabel, Input, 
    InputLabel, RadioGroup, FormControl, Button, Snackbar, Radio
} from '@mui/material';

import { updateAnswer } from '@/api/Qcm/updateAnswer';

const UpdateAnswer = (props) => {
    const questionID = props.data.id;
    const [text, setText] = useState(props.data.text);
    const [isCorrect_answer, setIsCorrect_answer] = useState(props.data.isCorrect_answer);

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
    const handleIsCorrectChange = (event) => {
        setIsCorrect_answer(event.target.value);
        console.log('ici', event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateAnswer(questionID, text, isCorrect_answer);
        if (response) {
            setMessage('Réponse modifié avec succès');
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
                    Modifier une Réponse
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Réponse</InputLabel>
                        <Input
                            required
                            id="text"
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                    </FormControl>
                    <FormControl>
                        <RadioGroup
                            required
                            name="radio"
                            id='radio'
                            style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            onChange={handleIsCorrectChange}
                            value={isCorrect_answer}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Vrai" />
                            <FormControlLabel value="false" control={<Radio />} label="Faux" />
                        </RadioGroup>
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

export default UpdateAnswer;