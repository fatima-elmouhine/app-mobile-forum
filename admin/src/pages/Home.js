import * as React from "react"
import { 
    Card, Typography, 
    Container, Slide, 
    Input, InputLabel, 
    InputAdornment, FormControl, 
    TextField, TextareaAutosize, 
    Box, Snackbar, 
    Alert, Button
} from '@mui/material';
import { useEffect, useState } from "react";
import SideBar from "../component/SideBar";

const Home = () => {
    // useEffect(() => {
    //     // window.localStorage.removeItem('token');
    //     window.localStorage.getItem('token');
    //     if (window.localStorage.getItem('token') === null) {
    //         window.location.href = '/Login';
    //     }
    // }, []);

    return (
        <Container maxWidth="sm">
            <SideBar />
            <Card sx={{ p: 2, m: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Home
                </Typography>
                <Button variant="contained" sx={{ m: 1 }} type="submit"
                    onClick={() => {
                        window.localStorage.removeItem('token');
                        window.location.href = '/Login';
                    }}
                >
                    Logout
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                </Box>
            </Card>
        </Container>
    );
};

export default Home;