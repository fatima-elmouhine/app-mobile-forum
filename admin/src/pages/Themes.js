import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button, Avatar } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import SideBar from '../component/layout/SideBar';
import CreateTheme from '../component/themes/CreateTheme';
import UpdateTheme from '../component/themes/UpdateTheme';
import DeleteTheme from '../component/themes/DeleteTheme';
import style from '@/styles/Global.module.css';

import { getThemes } from '@/api/Themes/getThemes';

const Themes = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [themes, setThemes] = useState([]);

    useEffect(() => {
        getThemes().then((data) => {
            setThemes(data);
        });
    }, []);

    useEffect(() => {
        getThemes().then((data) => {
            setThemes(data);
        });
    }, [openCreate, openUpdate, openDelete]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 200 },
        { field: 'description', headerName: 'Description', width: 470 },
        { field: 'imageTheme', headerName: 'Image du thème', width: 180,
            renderCell: (params) => (
                <strong>
                    <Avatar
                        alt={params.row.title}
                        src={params.row.imageTheme}
                    />
                </strong>
            ),
        },
        { field: 'createdAt', headerName: 'Date de création', width: 150 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
        { field: 'update', headerName: 'Modifier', width: 150 ,
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
                        <UpdateTheme data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 150 ,
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
                        <DeleteTheme data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = themes.map((theme) => {
        return {
            id: theme.id,
            title: theme.title,
            description: theme.description,
            imageTheme: theme.imageTheme,
            createdAt: new Date(theme.createdAt).toLocaleDateString(),
            updatedAt: new Date(theme.updatedAt).toLocaleString(),
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des thèmes</h1>
                <Box className={style.buttonAdd}>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        startIcon={<BookmarkAddIcon />}
                        onClick={handleOpenCreate}
                    />
                    <Modal
                        open={openCreate}
                        onClose={handleClose}
                    >
                        <CreateTheme onClose={handleClose}/>
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

export default Themes
