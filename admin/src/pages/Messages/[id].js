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
    console.log('otot',context.query);
    return {
        props: {
            id: context.query.id
        }
    }
}

const Messages = (props) => {
    const [messagesItem, setMessagesItem] = useState([]);
    console.log('messagesItem', messagesItem);
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
        { field: 'text', headerName: 'Texte', width: 170 },
        { field: 'userID', headerName: 'De', width: 210 },
        { field: 'createdAt', headerName: 'Date de création', width: 180 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
        { field: 'delete', headerName: 'Supprimer', width: 150,
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
                        <DeleteMessage data={item} />
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
            createdAt: message.createdAt,
            updatedAt: message.updatedAt
        };
    });

    console.log('rows', rows);

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box style={{ height: 845, width: '100%', color: 'white' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LoupeIcon />}
                    onClick={handleOpenCreate}
                />
                <Modal
                    open={openCreate}
                    onClose={handleClose}
                >
                    <CreateMessage idTopic={props.id} />
                </Modal>
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
