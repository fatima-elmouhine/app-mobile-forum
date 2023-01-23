import * as React from 'react';
import { useEffect, useState } from 'react';

import { Modal, Container, Box, Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import PostAddIcon from '@mui/icons-material/PostAdd';

import SideBar from '../component/layout/SideBar';
import CreateCourse from '../component/courses/CreateCourse';
import UpdateCourse from '../component/courses/UpdateCourse';
import DeleteCourse from '../component/courses/DeleteCourse';
import style from '@/styles/Global.module.css';

import { getCourses } from '@/api/Courses/getCourses';

const Courses = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [item, setItem] = useState();
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);

    const handleClose = () => setOpenCreate(false) || setOpenUpdate(false) || setOpenDelete(false);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then((data) => {
            setCourses(data);
        });
    }, [openCreate, openUpdate, openDelete]);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titre', width: 250 },
        { field: 'link', headerName: 'Lien', width: 320 },
        { field: 'Theme', headerName: 'Thème', width: 250 },
        { field: 'createdAt', headerName: 'Date de création', width: 180 },
        { field: 'updatedAt', headerName: 'Date de modification', width: 180 },
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
                        <UpdateCourse data={item} />
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
                        <DeleteCourse data={item} />
                    </Modal>
                </strong>
            ),
        },
    ];

    const rows = courses.map((course) => {
        return {
            id: course.id,
            title: course.title,
            link: course.link,
            Theme: course.Theme.title,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
            update: course.id,
            delete: course.id
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
                    startIcon={<PostAddIcon />}
                    onClick={handleOpenCreate}
                />
                <Modal
                    open={openCreate}
                    onClose={handleClose}
                >
                    <CreateCourse />
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

export default Courses