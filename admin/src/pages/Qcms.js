import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import VisibilityIcon from '@mui/icons-material/Visibility';

import SideBar from '../component/layout/SideBar';
import UpdateQcm from '@/component/Qcm/UpdateQcm';
import DeleteQcm from '@/component/Qcm/DeleteQcm';
import style from '@/styles/Global.module.css';

import { getQcms } from '@/api/Qcm/getQcms';
import { getType } from '@/api/Qcm/getType';

const Qcms = () => {
    const [item, setItem] = useState();

    const handleClick = () => {
        window.location.href = '/CreateQcm';
    };

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenDelete(false) || setOpenUpdate(false);

    const handleQuestions = (id) => {
        window.location.href=`Questions/${id}`
    }

    const [qcms, setQcms] = useState([]);
    console.log(qcms);

    useEffect(() => {
        getQcms().then((data) => {
            setQcms(data);
        });
    }, []);

    useEffect(() => {
        getQcms().then((data) => {
            setQcms(data);
        });
    }, [openDelete, openUpdate]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 300 },
        { field: 'isGenerated', headerName: 'Générer', width: 130 },
        { field: 'id_type', headerName: 'Type', width: 200 },
        { field: 'createdAt', headerName: 'Date de création', width: 130 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 160 },
        { field: 'Questions', headerName: 'Questions', width: 180 ,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={()=>handleQuestions(params.row.id)}
                    >
                        <VisibilityIcon/> Voir
                    </Button>
                </strong>
            ),
        },
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
                        <UpdateQcm data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 180 ,
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
            id_type: qcm.id_type,
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
                        onClick={handleClick}
                    />
                </Box>
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

export default Qcms