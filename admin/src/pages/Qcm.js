import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import SideBar from '../component/layout/SideBar';
import CreateUser from '../component/users/CreateUser';
import UpdateUser from '../component/users/UpdateUser';
import DeleteQcm from '@/component/Qcm/DeleteQcm';
import style from '@/styles/Global.module.css';

import { getQcm } from '@/api/Qcm/getQcms';

const Qcms = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [qcms, setQcms] = useState([]);

    useEffect(() => {
        getQcm().then((data) => {
            setQcms(data);
        });
    }, []);

    useEffect(() => {
        getQcm().then((data) => {
            setQcms(data);
        });
    }, [openCreate, openUpdate, openDelete]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 230 },
        { field: 'isGenerated', headerName: 'Visible', width: 130 },
        { field: 'type', headerName: 'Type', width: 200 },
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
                        <DeleteQcm data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = qcms.map((qcm) => {
        return {
            id: qcm.id,
            title: qcm.title,
            isGenerated: qcm.isGenerated ? 'Oui' : 'Non',
            type: qcm.Type.type_name,
            id_type: qcm.Type.id,
            createdAt: new Date(qcm.createdAt).toLocaleDateString(),
            updatedAt: new Date(qcm.updatedAt).toLocaleString()
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des QCM</h1>
                <Box className={style.buttonAdd}>
                    <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        startIcon={<ControlPointIcon />}
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

export default Qcms