import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import VisibilityIcon from '@mui/icons-material/Visibility';

import SideBar from '@/component/layout/SideBar';
import CreateQuestion from '@/component/Qcm/CreateQuestion';
import UpdateQcmQuestion from '@/component/Qcm/UpdateQcmQuestion';
import DeleteQcmQuestion from '@/component/Qcm/DeleteQcmQuestion';
import style from '@/styles/Global.module.css';

import { getQcm } from '@/api/Qcm/getQcm';
import { getThemes } from '@/api/Themes/getThemes';

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.query.id
        }
    }
}

const Questions = (props) => {
    const qcmID = props.id
    const [item, setItem] = useState();

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenDelete(false) || setOpenUpdate(false) || setOpenCreate(false);

    const handleResponse = (qcmID, id) => {
        window.location.href=`/Response/${qcmID}_${id}`
    }

    const [qcms, setQcms] = useState([]);
    console.log(qcms);

    useEffect(() => {
        getQcm(props.id).then((data) => {
            setQcms(data.qcm[0].Questions);
        });
    }, []);

    useEffect(() => {
        getQcm(props.id).then((data) => {
            setQcms(data.qcm[0].Questions);
        });
    }, [openDelete, openUpdate]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'text', headerName: 'Question', width: 420 },
        { field: 'id_theme', headerName: 'Thème', width: 220 },
        { field: 'createdAt', headerName: 'Date de création', width: 130 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 160 },
        { field: 'Answers', headerName: 'Réponses', width: 180 ,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={()=>handleResponse(qcmID, params.row.id)}
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
                        <UpdateQcmQuestion data={item} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Supprimer', width: 170 ,
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
                        <DeleteQcmQuestion data={item} qcmID={props.id} onClose={handleClose}/>
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = qcms.map((question) => {
        return {
            id: question.id,
            text: question.text,
            id_theme: question.id_theme,
            createdAt: new Date(question.createdAt).toLocaleDateString(),
            updatedAt: new Date(question.updatedAt).toLocaleString(),
            Answers: question.Answers.lenght,
        };
    });

    return (
        <Container className={style.container}>
            <Box className={style.sideBar}>
                <SideBar />
            </Box>
            <Box className={style.tableContent}>
                <h1 style={{ color: 'black' }}>Liste des QCM</h1>
                <Button
                        style={{ width: 'max-content' }}
                        variant="contained"
                        color="primary"
                        onClick={() => window.location.href = '/Qcms'}
                    >
                        Retour
                    </Button>
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
                        <CreateQuestion onClose={handleClose}/>
                    </Modal>
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

export default Questions