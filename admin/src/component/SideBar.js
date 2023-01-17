import * as React from 'react';
import { 
    ListSubheader, List,
    ListItemButton, ListItemIcon,
    ListItemText, Collapse,
    ExpandLess, ExpandMore
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { getUsers } from '../api/Users/getUsers';

import { useState, useEffect } from 'react';

const SideBar = () => {

    const handleUser = async () => {
        try {
            const response = await getUsers();
            console.log(response.rows);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Admin</ListSubheader>}
        >
            <ListItemButton onClick={handleUser}>
                <ListItemIcon>
                    <GroupIcon />
                </ListItemIcon>
                <ListItemText secondary="Users" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <ArchiveIcon />
                </ListItemIcon>
                <ListItemText secondary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <UnarchiveIcon />
                </ListItemIcon>
                <ListItemText secondary="Drafts" />
            </ListItemButton>
        </List>
    );
}

export default SideBar;