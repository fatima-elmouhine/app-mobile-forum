import * as React from 'react';
import ReactToPrint from 'react-to-print'
import { useState, useEffect, useRef } from 'react'
import { Card, Typography, Container, Button, Snackbar, Box, FormControl  } from '@mui/material';

const PrintQcm = (props) => {
    const componentRef = useRef();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    var lettre = ['A', 'B', 'C', 'D', 'E'];
    var i = 1;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const [questions, setQuestions] = useState([props.data.questions]);

    const PrintButton = ({ componentRef }) => {
        return (
          <ReactToPrint
            trigger={() => <a><Button variant="contained" color='primary' sx={{ m: 1 }}>Imprimer</Button></a>}
            content={() => componentRef.current}
            documentTitle={`QCM_${props.data.id}`}
          />
        );
    };
    
    return (
        <Container maxWidth="md">
            <Card sx={{ p: 2, m: 2, overflow: "scroll", height: "95vh" }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', position: 'absolute'}}>
                    <PrintButton componentRef={componentRef} />
                    <Button
                        variant="contained"
                        color='inherit'
                        sx={{ m: 1 }}
                        type="submit"
                        onClick={() => props.onClose()}
                    >
                        Fermer
                    </Button>
                </Box>
                <Box ref={componentRef}>
                    <Typography variant="h6" component="h1" gutterBottom sx={{textAlign: 'center', marginTop: '8vh', fontWeight: 600, padding: '0 16vh'}}>
                        ECURIE UE{props.data.questions[0].id_theme} {new Date().toLocaleDateString()}
                    </Typography>
                    <img style={{margin: '-12vh 0 3vh 69vh'}} src="./logoSdlv.png" alt="Logo" />
                    <form style={{padding: '0 8vh'}}>
                        {questions[0].map((question, index) => (
                          <div key={index}>
                          <Typography variant="h6" component="h4" gutterBottom sx={{fontSize: 20, fontWeight: 600}}>
                              <p>Question {i++} : {question.text}</p>
                          </Typography>
                          <div style={{display: 'flex', flexDirection: 'column'}}>
                              <FormControl sx={{mb: 2}}>
                              {question.Answers.map((answer, answerIndex) => (
                                  <label key={answerIndex} style={{fontSize: 20}}>
                                  <p name={question.id} value={answer.id} />
                                  {lettre[answerIndex]}. {answer.text}
                                  </label>
                              ))}
                              </FormControl>
                          </div>
                          {index % 3 === 2 && (
                              <div style={{pageBreakAfter: 'always'}}></div>
                          )}
                          </div>
                        ))}
                    </form>
                    <div style={{pageBreakAfter: 'always'}}></div>
                </Box>
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