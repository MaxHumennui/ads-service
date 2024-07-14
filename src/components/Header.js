import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    padding: 1rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;

    @media (max-width: 768px) {
        flex-direction: column;
        font-size: 1.5rem;
    }
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        margin-top: 0.5rem;
    }
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <div>Ad Tracker</div>
            <NavLinks>
                <NavLink to="/">Ads Table</NavLink>
                <NavLink to="/statistics">Statistics</NavLink>
                <NavLink to="/ad-showcase">Ad Showcase</NavLink>
            </NavLinks>
        </HeaderContainer>
    );
};

export default Header;
