import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import style from '@/styles/SideBar.module.css';

import { Stack, Paper, MenuItem, MenuList, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ForumIcon from '@mui/icons-material/Forum';
import QuizIcon from '@mui/icons-material/Quiz';

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const SideBar = () => {
    useEffect(() => {
        window.localStorage.getItem('token');
        if (window.localStorage.getItem('token') === null) {
            window.location.href = '/Login';
        }
    }, []);

    return (
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className={style.stack}>
            <img src="./logoMed.png" alt="logoMed" className={style.img} />
            <Paper elevation={0} className={style.paper}>
                <MenuList className={style.menuList}>
                    <MenuItem className={style.menuItem}>
                        <Link href="/Users" className={style.link}>
                            <SchoolIcon className={style.linkTitle} />
                            <p className={style.linkTitle}>Etudiants</p>
                        </Link>
                    </MenuItem>
                    <MenuItem className={style.menuItem}>
                        <Link href="/Users" className={style.link}>
                            <AutoStoriesIcon className={style.linkTitle} />
                            <p className={style.linkTitle}>Cours</p>
                        </Link>
                    </MenuItem>
                    <MenuItem className={style.menuItem}>
                        <Link href="/Users" className={style.link}>
                            <ForumIcon className={style.linkTitle} />
                            <p className={style.linkTitle}>Forum</p>
                        </Link>
                    </MenuItem>
                    <MenuItem className={style.menuItem}>
                        <Link href="/Users" className={style.link}>
                            <QuizIcon className={style.linkTitle} />
                            <p className={style.linkTitle}>QCM</p>
                        </Link>
                    </MenuItem>
                    <Button variant="contained" sx={{ m: 1 }} type="submit" color='secondary'
                        style={{ borderRadius: '3vh', padding: '2vh' }}
                        onClick={() => {
                            window.localStorage.removeItem('token');
                            window.location.href = '/Login';
                        }}
                    >
                        Déconnexion
                    </Button>
                </MenuList>
            </Paper>
        </Stack>
    );
}

export default SideBar;