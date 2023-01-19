import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal, Container, Box, Typography } from '@mui/material';
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
    }, [openCreate, openUpdate, openDelete]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'lastName', headerName: 'Nom', width: 130 },
        { field: 'email', headerName: 'E-mail', width: 130 },
        { field: 'role', headerName: 'Rôle', width: 250 },
        { field: 'createdAt', headerName: 'Date de création', width: 130 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 130 },
        { field: 'update', headerName: 'Modifier', width: 130 ,
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
                        <UpdateUser data={item} />
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 130 ,
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
                        <DeleteUser data={item} />
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
            role: user.role.role.join(', '),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            update: user.id
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
                    startIcon={<PersonAddAlt1Icon />}
                    onClick={handleOpenCreate}
                />
                <Modal
                    open={openCreate}
                    onClose={handleClose}
                >
                    <CreateUser />
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

export default Users