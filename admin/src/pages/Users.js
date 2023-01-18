import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import CreateUser from '../component/CreateUser';
import { getUsers } from '../api/Users/getUsers';
import { getUser } from '../api/Users/getUser';
import { deleteUser } from '../api/Users/deleteUser';

export async function gerServerSideProps(ctx) {
    console.log('ctx',ctx);
}
const Users = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        window.localStorage.getItem('token');
        if (window.localStorage.getItem('token') == null) {
            window.location.href = '/Login';
        }
    }, []);

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
    }, [open]);

    const handleUpdate = (id) => {
        getUser(id).then((data) => {
            console.log(data);
        });
    };



    const handleDelete = (id) => {
        deleteUser(id).then((data) => {
            console.log(data);
        });
    };

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
                        onClick={() => handleUpdate(params.row.id)}
                    >
                        Modifier
                    </Button>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 130 ,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Supprimer
                    </Button>
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
        };
    });

    return (
        <div style={{ height: 400, width: '100%', color: 'white' }}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddAlt1Icon />}
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <CreateUser />
            </Modal>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default Users