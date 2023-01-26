import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import LoupeIcon from '@mui/icons-material/Loupe';

import SideBar from '@/component/layout/SideBar';
import CreateMessage from '@/component/topics/CreateMessage';
import DeleteMessage from '@/component/topics/DeleteMessage';
import style from '@/styles/Global.module.css';

import { getTopicMessage } from '@/api/Topics/getTopicMessages';

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.query.id
        }
    }
}

const Messages = (props) => {
    const [messagesItem, setMessagesItem] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    
    const handleClose = () => setOpenCreate(false) || setOpenDelete(false);

    useEffect(() => {
        getTopicMessage(props.id).then((data) => {
            setMessagesItem(data.Messages);
        });
    }, []);

    useEffect(() => {
        getTopicMessage(props.id).then((data) => {
            setMessagesItem(data.Messages);
        });
    }, [openCreate, openDelete]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'text', headerName: 'Texte', width: 620 },
        { field: 'userID', headerName: 'De', width: 310 },
        { field: 'createdAt', headerName: 'Date de création', width: 180 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
        { field: 'delete', headerName: 'Supprimer', width: 170,
            renderCell: (params) => (
                
                <strong>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={()=>{setItem(params.row), handleOpenDelete()}}
                    >
                        Supprimer
                    </Button>
                    <Modal
                        open={openDelete}
                        onClose={handleClose}
                    >
                        <DeleteMessage data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = messagesItem.map((message) => {
        return {
            topicID: props.id,
            id: message.id,
            text: message.text,
            userID: message.id_user,
            createdAt: new Date(message.createdAt).toLocaleString(),
            updatedAt: new Date(message.updatedAt).toLocaleString()
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des messages</h1>
                <Box className={style.buttonAdd} style={{ justifyContent: 'space-between' }}>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        onClick={() => window.location.href = '/Topics'}
                    >
                        Retour
                    </Button>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        startIcon={<LoupeIcon />}
                        onClick={handleOpenCreate}
                    />
                    <Modal
                        open={openCreate}
                        onClose={handleClose}
                    >
                        <CreateMessage idTopic={props.id} onClose={handleClose}/>
                    </Modal>
                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={14}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </Container>
    );
}

export default Messages
