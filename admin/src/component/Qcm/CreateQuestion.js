import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select,
	Input, InputLabel, MenuItem, FormControl,
	Box, Button, Snackbar, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';

import { getThemes } from '@/api/Themes/getThemes';
import { postQuestions } from '@/api/Qcm/postQuestions';
import { postAnswers } from '@/api/Qcm/postAnswers';

const CreateQuestion = (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const [themes, setThemes] = useState('');
    const [themesArray, setThemesArray] = useState([]);
    const handleChangeThemes = (event) => {
        setThemes(event.target.value);
    };

    const [question, setQuestion] = useState('');
    const handleChangeQuestions = (event) => {
        setQuestion(event.target.value);
    };

    const [answer1, setAnswer1] = useState({});
    const handleChangeAnswer1 = (event) => {
        setAnswer1({ ...answer1, [event.target.id]: event.target.value,  [event.target.name]: event.target.value });
    };
    const [answer2, setAnswer2] = useState({});
    const handleChangeAnswer2 = (event) => {
        setAnswer2({ ...answer2, [event.target.id]: event.target.value,  [event.target.name]: event.target.value });
    };
    const [answer3, setAnswer3] = useState({});
    const handleChangeAnswer3 = (event) => {
        setAnswer3({ ...answer3, [event.target.id]: event.target.value,  [event.target.name]: event.target.value });
    };
    const [answer4, setAnswer4] = useState({});
    const handleChangeAnswer4 = (event) => {
        setAnswer4({ ...answer4, [event.target.id]: event.target.value,  [event.target.name]: event.target.value });
    };
    const [answer5, setAnswer5] = useState({});
    const handleChangeAnswer5 = (event) => {
        setAnswer5({ ...answer5, [event.target.id]: event.target.value,  [event.target.name]: event.target.value });
    };

    useEffect(() => {
        getThemes().then((data) => {
            setThemesArray(data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            text: question,
            id_theme: themes
        }
        postQuestions(data).then((data) => {
            if (data.status == 201) {
                setMessage('Question ajoutée avec succès');
                setOpen(true);
            } else {
                setMessage('Une erreur est survenue');
                setOpen(true);
            }
        });

        const answers = [answer1, answer2, answer3, answer4, answer5];
        const answersArray = answers.filter((answer) => answer.response1 !== undefined);
        const answersArray2 = answersArray.map((answer) => {
            return {
                text: answer.response,
                isCorrect_answer: answer.radio
            }
        });
        postAnswers(answersArray2, data.id).then((data) => {
            if (data.status == 200) {
                setMessage('Réponses enregistrer avec succès');
                setOpen(true);
            } else {
                setMessage('Une erreur est survenue');
                setOpen(true);
            }
        });
    };

    return (
        <Container maxWidth="lg">
            <Card sx={{ p: 4, m: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter une question
                </Typography>
                <form style={{display: 'flex', flexDirection: 'column', gap: '1.5em'}}>
                    <FormControl style={{marginTop: '2em'}}>
                        <InputLabel id="demo-simple-select-label">Thème</InputLabel>
                        <Select
                            value={themes}
                            label="Thème"
                            onChange={handleChangeThemes}
                        >
                            {themesArray.map((theme) => (
                                <MenuItem value={theme.id}>{theme.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Question</InputLabel>
                        <Input
                            required
                            id="question"
                            type="text"
                            value={question}
                            onChange={handleChangeQuestions}
                        />
                    </FormControl>
                    <Box style={{display: 'flex', alignItems: 'center'}} onChange={handleChangeAnswer1}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 1</InputLabel>
                            <Input
                                required
                                id="response"
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                name="radio"
                                defaultValue="0"
                                id='radio'
                                style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box style={{display: 'flex', alignItems: 'center'}} onChange={handleChangeAnswer2}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 2</InputLabel>
                            <Input
                                required
                                id="response"
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                name="radio"
                                defaultValue="0"
                                id='radio'
                                style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box style={{display: 'flex', alignItems: 'center'}} onChange={handleChangeAnswer3}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 3</InputLabel>
                            <Input
                                required
                                id="response"
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                name="radio"
                                defaultValue="0"
                                id='radio'
                                style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box style={{display: 'flex', alignItems: 'center'}} onChange={handleChangeAnswer4}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 4</InputLabel>
                            <Input
                                required
                                id="response"
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                name="radio"
                                defaultValue="0"
                                id='radio'
                                style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box style={{display: 'flex', alignItems: 'center'}} onChange={handleChangeAnswer5}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 5</InputLabel>
                            <Input
                                required
                                id="response"
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                name="radio"
                                defaultValue="0"
                                id='radio'
                                style={{flexWrap: 'inherit', flexDirection: 'row'}}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box style={{display: 'flex', alignItems: 'center', margin: 'auto'}}>
                        <Button
                            variant="contained"
                            sx={{ m: 1, width: 'fit-content' }}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </Button>
                        <Button
                            variant="contained"
                            color='inherit'
                            sx={{ m: 1, width: 'fit-content' }}
                            type="submit"
                            onClick={() => props.onClose()}
                        >
                            Annuler
                        </Button>
                    </Box>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={message}
                />
            </Card>
        </Container>
    );
}

export default CreateQuestion