import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import SideBar from '@/component/layout/SideBar';
import UpdateAnswer from '@/component/Qcm/UpdateAnswer';
import style from '@/styles/Global.module.css';

import { getQuestion } from '@/api/Qcm/getQuestion';

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            data: {
                qcmID: id.split('_')[0],
                questionID: id.split('_')[1],
            },
        },
    };
}

const Response = (props) => {
    const [item, setItem] = useState();

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const handleClose = () => setOpenUpdate(false)

    const [response, setReponse] = useState([]);
    console.log('response', response);

    useEffect(() => {
        const fetchRes = async() => getQuestion(props.data.questionID).then((data) => {
            setReponse(data);
        });
        fetchRes();
    }, []);

    useEffect(() => {
        const fetchRes = async() => getQuestion(props.data.questionID).then((data) => {
            setReponse(data);
        });
        fetchRes();
    }, [openUpdate]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'text', headerName: 'Response', width: 850 },
        { field: 'isCorrect_answer', headerName: 'Vrai / Faux', width: 130 },
        { field: 'createdAt', headerName: 'Date de création', width: 130 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 160 },
        { field: 'update', headerName: 'Modifier', width: 180 ,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>{setItem(params.row), handleOpenUpdate()}}
                    >
                        Modifier
                    </Button>
                    <Modal
                        open={openUpdate}
                        onClose={handleClose}
                    >
                        <UpdateAnswer data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = response && response.Answers ? response.Answers.map((res) => {
        console.log('res', res);
        return {
            id: res.id,
            text: res.text,
            isCorrect_answer: res.isCorrect_answer ? 'Vrai' : 'Faux',
            createdAt: new Date(res.createdAt).toLocaleDateString(),
            updatedAt: new Date(res.updatedAt).toLocaleString(),
        };
    }) : [];

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des réponse</h1>
                <Button
                    style={{ width: 'max-content' }}
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = `/Questions/${props.data.qcmID}`}
                >
                    Retour
                </Button>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={13}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </Container>
    );
}

export default Response