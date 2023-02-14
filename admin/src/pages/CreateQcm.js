import * as React from 'react';
import { useEffect, useState } from 'react';

import { Container, Box, Button, Modal, Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput, Typography } from '@mui/material';

import SideBar from '../component/layout/SideBar';
import { getThemes } from '@/api/Themes/getThemes';
import { getQuestions } from '@/api/Qcm/getQuestion';
import { CreateQuestion } from '@/component/Qcm/CreateQuestion';
import style from '@/styles/Global.module.css';

const CreateQcm = () => {
    const [numberQuestion, setNumberQuestion] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [questions, setQuestions] = useState([]);
    const [questionsArray, setQuestionsArray] = useState([]);
    const handleChangeQuestions = (event) => {
        setQuestions(event.target.value);
    };

    useEffect(() => {
        getQuestions().then((data) => {
            setQuestionsArray(data);
        });
    }, []);

    useEffect(() => {
        getQuestions().then((data) => {
            setQuestionsArray(data);
        });
    }, [open]);

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Création de QCM</h1>
                <Box className={style.formContent}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Nombre de question</InputLabel>
                        <OutlinedInput onChange={(e) => setNumberQuestion(e.target.value)} label="Nombre de question"/>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Questions</InputLabel>
                        <Select
                            id='questions'
                            labelId="demo-multiple-chip-label"
                            label="Questions"
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
                                <MenuItem key={question.id} value={question.text}>
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
                            </Modal>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateQcm