import * as React from 'react';
import { 
    Stack, Paper,
    MenuItem, MenuList
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { getUsers } from '../api/Users/getUsers';

import { useState, useEffect } from 'react';
import Link from 'next/link'

const SideBar = () => {

    return (
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Paper elevation={0}>
                <MenuList>
                    <MenuItem>
                        <Link href="/Users">
                            <p>Users</p>
                        </Link>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Stack>
    );
}

export default SideBar;