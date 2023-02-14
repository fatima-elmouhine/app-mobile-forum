import * as React from 'react';
import { useState } from 'react'
import { 
    Card, Typography, Container , Select,
	Input, InputLabel, MenuItem, FormControl,
	Box, Button, Snackbar, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';

import { getThemes } from '@/api/Themes/getThemes';

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
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [answer5, setAnswer5] = useState('');
    const [radioAnswer1, setRadioAnswer1] = useState('');
    const [radioAnswer2, setRadioAnswer2] = useState('');
    const [radioAnswer3, setRadioAnswer3] = useState('');
    const [radioAnswer4, setRadioAnswer4] = useState('');
    const [radioAnswer5, setRadioAnswer5] = useState('');

    useEffect(() => {
        getThemes().then((data) => {
            setThemesArray(data);
        });
    }, []);

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ajouter une question
                </Typography>
                <form>
                    <FormControl>
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
                        />
                    </FormControl>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 1</InputLabel>
                            <Input
                                required
                                id="response1"
                                type="text"
                                value={answer1}
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                value={radioAnswer1}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 2</InputLabel>
                            <Input
                                required
                                id="response2"
                                type="text"
                                value={answer2}
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                value={radioAnswer2}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 3</InputLabel>
                            <Input
                                required
                                id="response3"
                                type="text"
                                value={answer3}
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                value={radioAnswer3}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 4</InputLabel>
                            <Input
                                required
                                id="response4"
                                type="text"
                                value={answer4}
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                value={radioAnswer4}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="text">Response 5</InputLabel>
                            <Input
                                required
                                id="response5"
                                type="text"
                                value={answer5}
                            />
                        </FormControl>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                value={radioAnswer5}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Vrais" />
                                <FormControlLabel value="0" control={<Radio />} label="Faux" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        type="submit"
                    >
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
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={message}
                />
            </Card>
        </Container>
    );
}

export default CreateQuestion