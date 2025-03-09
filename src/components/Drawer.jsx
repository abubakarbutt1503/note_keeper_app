import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider
} from '@mui/material';
import {
    LightbulbOutlined,
    NotificationsNoneOutlined,
    EditOutlined,
    ArchiveOutlined,
    DeleteOutlineOutlined,
    Menu
} from '@mui/icons-material';

const SideDrawer = ({ open, onClose, onOpen }) => {
    const menuItems = [
        { id: 1, name: 'Notes', icon: <LightbulbOutlined /> },
        { id: 2, name: 'Reminders', icon: <NotificationsNoneOutlined /> },
        { id: 3, name: 'Edit labels', icon: <EditOutlined /> },
        { id: 4, name: 'Archive', icon: <ArchiveOutlined /> },
        { id: 5, name: 'Trash', icon: <DeleteOutlineOutlined /> }
    ];

    return (
        <>
            <IconButton 
                onClick={onOpen}
                className="menu-button"
                size="large"
                edge="start"
                color="inherit"
            >
                <Menu />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                variant="temporary"
                className="app-drawer"
            >
                <div className="drawer-header">
                    <img 
                        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                        alt="Keep"
                        className="drawer-logo"
                    />
                    <span className="drawer-title">Keep</span>
                </div>
                <Divider />
                <List className="drawer-list">
                    {menuItems.map((item) => (
                        <ListItem 
                            button 
                            key={item.id}
                            className="drawer-list-item"
                        >
                            <ListItemIcon className="drawer-icon">
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default SideDrawer; 