import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header>
            <div className="header-content" onClick={handleLogoClick}>
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
