import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ onMenuClick }) {
    return (
        <header>
            <IconButton
                className="menu-button"
                size="large"
                edge="start"
                color="inherit"
                onClick={onMenuClick}
            >
                <MenuIcon />
            </IconButton>
            <div className="header-content">
                <img 
                    src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                    alt="Keep"
                    className="header-logo"
                />
                <h1>Keep</h1>
            </div>
        </header>
    );
}

export default Header;
