import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddCommentIcon from '@mui/icons-material/AddComment';
import VisibilityIcon from '@mui/icons-material/Visibility';

import SideBar from '../component/layout/SideBar';
import CreateTopic from '@/component/topics/CreateTopic';
import UpdateTopic from '@/component/topics/UpdateTopic';
import DeleteTopic from '@/component/topics/DeleteTopic';
import style from '@/styles/Global.module.css';

import { getTopics } from '../api/Topics/getTopics';

const Topics = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const handleOpenMessages = (id) => {
        window.location.href=`Messages/${id}`
    }

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((data) => {
            setTopics(data);
        });
    }, []);
    
    useEffect(() => {
        getTopics().then((data) => {
            setTopics(data);
        });
    }, [openCreate, openUpdate, openDelete]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 170 },
        { field: 'user', headerName: 'De', width: 210 },
        { field: 'theme', headerName: 'Thème', width: 250 },
        { field: 'createdAt', headerName: 'Date de création', width: 180 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
        { field: 'messages', headerName: 'Messages', width: 180, 
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={()=>{handleOpenMessages(params.row.id)}}
                    >
                        <VisibilityIcon /> Messages
                    </Button>
                </strong>
            ),
        },
        { field: 'update', headerName: 'Modifier', width: 150,
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
                        <UpdateTopic data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
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
                        <DeleteTopic data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = topics.map((topic) => {
        return {
            id: topic.id,
            title: topic.title,
            user: topic.User.firstName + ' ' + topic.User.lastName,
            userID: topic.User.id,
            theme: topic.Theme.title,
            themeID: topic.Theme.id,
            createdAt: new Date(topic.createdAt).toLocaleString(),
            updatedAt: new Date(topic.updatedAt).toLocaleString()
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des forums</h1>
                <Box className={style.buttonAdd}>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        startIcon={<AddCommentIcon />}
                        onClick={handleOpenCreate}
                    />
                    <Modal
                        open={openCreate}
                        onClose={handleClose}
                    >
                        <CreateTopic onClose={handleClose}/>
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

export default Topics
