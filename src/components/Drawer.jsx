import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Tooltip,
    Badge
} from '@mui/material';
import {
    LightbulbOutlined,
    StarOutline,
    EditOutlined,
    ArchiveOutlined,
    DeleteOutlineOutlined,
    Menu
} from '@mui/icons-material';

const SideDrawer = ({ open, onClose, onOpen, favoriteCount = 0 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const menuItems = [
        { 
            id: 1, 
            name: 'Notes', 
            icon: <LightbulbOutlined />, 
            path: '/',
            tooltip: 'View your notes'
        },
        { 
            id: 2, 
            name: 'Favorites', 
            icon: <StarOutline />, 
            path: '/favorites',
            tooltip: 'View your favorite notes',
            badge: favoriteCount
        },
        { 
            id: 3, 
            name: 'Edit labels', 
            icon: <EditOutlined />, 
            path: '/labels',
            tooltip: 'Create and manage labels'
        },
        { 
            id: 4, 
            name: 'Archive', 
            icon: <ArchiveOutlined />, 
            path: '/archive',
            tooltip: 'View archived notes'
        },
        { 
            id: 5, 
            name: 'Trash', 
            icon: <DeleteOutlineOutlined />, 
            path: '/trash',
            tooltip: 'View deleted notes'
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            <IconButton 
                onClick={onOpen}
                className="menu-button"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <Menu />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                variant="temporary"
                className="app-drawer"
                PaperProps={{
                    sx: {
                        width: 280,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8
                    }
                }}
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
                        <Tooltip 
                            key={item.id} 
                            title={item.tooltip} 
                            placement="right"
                            arrow
                        >
                            <ListItem 
                                button 
                                onClick={() => handleNavigation(item.path)}
                                className={`drawer-list-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <ListItemIcon className="drawer-icon">
                                    {item.badge > 0 ? (
                                        <Badge badgeContent={item.badge} color="primary">
                                            {item.icon}
                                        </Badge>
                                    ) : (
                                        item.icon
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default SideDrawer; 