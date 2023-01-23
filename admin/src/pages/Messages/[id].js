import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddCommentIcon from '@mui/icons-material/AddComment';

import SideBar from '../layout/SideBar';
import CreateTopic from '@/component/topics/CreateTopic';
import UpdateTopic from '@/component/topics/UpdateTopic';
import DeleteTopic from '@/component/topics/DeleteTopic';
import style from '@/styles/Global.module.css';
import { useParams } from 'react-router-dom'

import { getTopicMessage } from '@/api/Topics/getTopicMessages';

const Messages = (props) => {
    const params = useParams();
    console.log('params', params);
    const topicID = props.data.id;
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getTopicMessage(topicID).then((data) => {
            console.log('okok', data);
            setMessages(data);
        });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'text', headerName: 'Texte', width: 130 },
        { field: 'id_user', headerName: 'De', width: 130 },
        { field: 'theme', headerName: 'Thème', width: 200 },
        { field: 'createdAt', headerName: 'Date de création', width: 180 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
        { field: 'update', headerName: 'Modifier', width: 130,
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
                        <UpdateTopic data={item} />
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 130,
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
                        <DeleteTopic data={item} />
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = messages.map((topic) => {
        return {
            id: topic.id,
            title: topic.title,
            user: topic.User.firstName + ' ' + topic.User.lastName,
            theme: topic.Theme?.title,
            createdAt: topic.createdAt,
            updatedAt: topic.updatedAt,
            messages: topic.id,
            update: topic.id,
            delete: topic.id
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box style={{ height: 845, width: '100%', color: 'white' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCommentIcon />}
                    onClick={handleOpenCreate}
                />
                <Modal
                    open={openCreate}
                    onClose={handleClose}
                >
                    <CreateTopic />
                </Modal>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </Container>
    );
}

export default Messages
