import * as React from 'react';
import { useState, useEffect } from 'react'
import { 
    Card, Typography, Container , Select, Input, 
    InputLabel, MenuItem, FormControl, Button, Snackbar
} from '@mui/material';

import { putCourse } from '../../api/Courses/putCourse';
import { getThemes } from '@/api/Themes/getThemes';

const UpdateCourse = (props) => {
    const courseID = props.data.id
    const [title, setTitle] = useState(props.data.title);
    const [link, setLink] = useState(props.data.link);
    const [id_theme, setidTheme] = useState(props.data.idTheme);
    const [themes, setThemes] = useState([]);
    useEffect(() => {
        const fetchThemes = async () => {
            const themesItems = await getThemes();
            setThemes(themesItems);
        };
        fetchThemes();
    }, []);
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
    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };
    const handleThemeChange = (event) => {
        setidTheme(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await putCourse(courseID, title, link, id_theme);
            setMessage('Modification réussie');
            setTimeout(() => {
                props.onClose()
            }, 2000);
        } catch (error) {
            console.log(error);
            setMessage('Une erreur est survenue');
        }
        setOpen(true);
    };
    
    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Modifier un cours
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Titre</InputLabel>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="text">Entré un lien</InputLabel>
                        <Input
                            id="link"
                            type="text"
                            value={link}
                            onChange={handleLinkChange}
                        />
                    </FormControl>
                    <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <InputLabel id='id_theme'>Choisissez un thème</InputLabel>
                        <Select
                            labelId="id_theme"
                            value={id_theme}
                            onChange={handleThemeChange}
                        >
                            {themes.map((themeSelect) => (
                                <MenuItem key={themeSelect.id} value={themeSelect.id}>
                                    {themeSelect.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ m: 1 }} type="submit">
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

export default UpdateCourse;