import * as React from 'react';
import { useEffect, useState } from 'react';

import {
    Container, Box, Button, Modal, Select, MenuItem, InputLabel, RadioGroup,
    FormControl, Chip, OutlinedInput, Typography, FormControlLabel, Radio, Snackbar
} from '@mui/material';

import SideBar from '@/component/layout/SideBar';
import { getThemes } from '@/api/Themes/getThemes';
import { getTypes } from '@/api/Qcm/getTypes';
import { getQuestions } from '@/api/Qcm/getQuestions';
import { getQcm } from '@/api/Qcm/getQcm';
import CreateQuestion from '@/component/Qcm/CreateQuestion';
import style from '@/styles/Global.module.css';

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.query.id
        }
    }
}

const UpdateQcm = (props) => {
    const idQcm = props.id;

    const [numberQuestion, setNumberQuestion] = useState(0);

    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState('');

    const [themes, setThemes] = useState('');
    const [themesArray, setThemesArray] = useState([]);
    const handleChangeThemes = (event) => {
        setThemes(event.target.value);
    };

    const [types, setTypes] = useState('');
    const [typesArray, setTypesArray] = useState([]);
    const handleChangeTypes = (event) => {
        setTypes(event.target.value);
    };

    const [questions, setQuestions] = useState([]);
    const [questionsArray, setQuestionsArray] = useState([]);
    const handleChangeQuestions = (event) => {
        setQuestions(event.target.value);
    };

    useEffect(() => {
        getQcm(idQcm).then((data) => {
            console.log('data', data);
            setTitle(data[0].title);
            setTypes(data[0].id_type);
            data[0].Questions.map((question) => {
                setQuestions([...questions, question.id]);
            })
        });
        getThemes().then((data) => {
            setThemesArray(data);
        });
        getTypes().then((data) => {
            setTypesArray(data);
        });
    }, []);

    useEffect(() => {
        getQuestions().then((data) => {
            const notQuestions = 'Questions selon le theme choisie';
            data.map((question) => {
                if(question.id_theme == themes) {
                    setQuestionsArray(data);
                } else {
                    setQuestionsArray([notQuestions]);
                }
            })
        });
    }, [open, themes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(questions.length != numberQuestion) {
            setMessage('Le nombre de question ne correspond pas au nombre de question choisie');
            setOpenMessage(true);
            setTimeout(() => {
                setOpenMessage(false);
            }, 2000);
        } else {
            postQcm(title, isGenerated, types).then((data) => {
                console.log(data);
                questions.map((question) => {
                    postQcmQuestion(data.id, question);
                })
            });
        }
    };

    const handleRetour = () => {
        window.location.href = '/Qcms';
    };

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Modification de QCM</h1>
                <Box className={style.formContent}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Titre du QCM</InputLabel>
                        <OutlinedInput onChange={(e) => setTitle(e.target.value)} value={title} label="Titre du QCM"/>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Thème</InputLabel>
                        <Select
                            required
                            value={themes}
                            label="Thème"
                            onChange={handleChangeThemes}
                        >
                            {themesArray.map((theme) => (
                                <MenuItem value={theme.id}>{theme.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Nombre de question</InputLabel>
                        <OutlinedInput onChange={(e) => setNumberQuestion(e.target.value)} label="Nombre de question"/>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Questions selon le theme choisie</InputLabel>
                        <Select
                            id='questions'
                            labelId="demo-multiple-chip-label"
                            label="Questions selon le theme choisie"
                            multiple
                            value={questions}
                            onChange={handleChangeQuestions}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {questionsArray.map((question) => (
                                <MenuItem key={question.id} value={question.id} style={{color: 'black'}}>
                                    {question.text}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box>
                            <Typography 
                                variant="caption"
                                display="block"
                                gutterBottom
                                onClick={handleOpen}
                                style={{cursor: 'pointer', color: 'blue'}}
                            >
                                Si une question n'est pas présente, vous pouvez la créer en cliquant ici
                            </Typography>
                            <Modal open={open} onClose={handleClose}>
                                <CreateQuestion onClose={handleClose}/>
                                {/* <Typography>Test</Typography> */}
                            </Modal>
                        </Box>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Type du QCM</InputLabel>
                        <Select
                            required
                            value={types}
                            label="Type du QCM"
                            onChange={handleChangeTypes}
                        >
                            {typesArray.map((type) => (
                                <MenuItem value={type.id}>{type.type_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box style={{display: 'flex', gap: '2em', margin: 'auto'}}>
                        <Button
                            variant="contained"
                            style={{backgroundColor: '#3f51b5', color: 'white', width: 'max-content'}}
                            onClick={handleSubmit}
                        >
                            Créer
                        </Button>
                        <Button
                            variant="contained"
                            style={{backgroundColor: '#c9c9c9', width: 'max-content'}}
                            onClick={handleRetour}
                        >
                            Retour
                        </Button>
                    </Box>
                    <Snackbar
                        open={openMessage}
                        autoHideDuration={3000}
                        onClose={handleCloseMessage}
                        message={message}
                        aaction={{
                            label: 'X',
                            onPress: () => {
                                handleCloseMessage();
                            },
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default UpdateQcm