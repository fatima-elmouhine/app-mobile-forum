import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

const PrintQcm = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const [questions, setQuestions] = useState([props.data.questions]);
    console.log(questions);

    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    QCM N°{props.data.id} - {props.data.title}
                </Typography>
                <form>
                    {questions[0].map((question) => (
                        <div>
                            <Typography variant="h6" component="h2" gutterBottom>
                                {question.text}
                            </Typography>
                            {question.Answers.map((answer) => (
                                <div>
                                    <Typography variant="body1" component="p" gutterBottom>
                                        {answer.text}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    ))}
                    <Button
                        variant="contained"
                        color='inherit'
                        sx={{ m: 1 }}
                        type="submit"
                        onClick={() => props.onClose()}
                    >
                        Fermer
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

export default PrintQcm;