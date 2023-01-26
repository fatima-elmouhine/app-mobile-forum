import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Chip, Button, Avatar } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import SideBar from '../component/layout/SideBar';
import CreateUser from '../component/users/CreateUser';
import UpdateUser from '../component/users/UpdateUser';
import DeleteUser from '../component/users/DeleteUser';
import style from '@/styles/Global.module.css';

import { getUsers } from '../api/Users/getUsers';

const Users = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [users, setusers] = useState([]);

    useEffect(() => {
        getUsers().then((data) => {
            setusers(data);
        });
    }, []);

    useEffect(() => {
        getUsers().then((data) => {
            setusers(data);
        });
    }, [openCreate, openUpdate, openDelete]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'lastName', headerName: 'Nom', width: 130 },
        { field: 'email', headerName: 'E-mail', width: 200 },
        { field: 'role', headerName: 'Rôle', width: 330 ,
            renderCell: (params) => (
                <strong>
                    {params.row.role?.split(',').map((role) => (
                        <Chip
                            key={role}
                            label={role}
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{margin: 2}}
                        />
                    ))}
                </strong>
            ),
        },
        { field: 'avatar', headerName: 'Photo de profil', width: 115,
            renderCell: (params) => (
                <strong>
                    <Avatar
                        alt={params.row.firstName}
                        src={params.row.avatar}
                    />
                </strong>
            ), },
        { field: 'createdAt', headerName: 'Date de création', width: 130 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 160 },
        { field: 'update', headerName: 'Modifier', width: 140 ,
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
                        <UpdateUser data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 140 ,
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
                        <DeleteUser data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = users.map((user) => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.role?.join(','),
            avatar: user.avatar ? user.avatar : './defaultAvatar.png',
            createdAt: new Date(user.createdAt).toLocaleDateString(),
            updatedAt: new Date(user.updatedAt).toLocaleString()
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des étudiants</h1>
                <Box className={style.buttonAdd}>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={handleOpenCreate}
                    />
                    <Modal
                        open={openCreate}
                        onClose={handleClose}
                    >
                        <CreateUser onClose={handleClose}/>
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

export default Users