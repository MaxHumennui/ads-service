import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;

    &:hover {
        background-color: #0056b3;
    }
`;

const EditButton = styled(Button)`
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;

const DeleteButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

const AdTableRow = ({ ad, handleEditClick, handleDeleteClick }) => (
    <tr>
        <td>{ad.id}</td>
        <td><img src={ad.image} alt={ad.title} /></td>
        <td>{ad.title}</td>
        <td>{ad.description}</td>
        <td>{ad.impressions}</td>
        <td>{ad.clicks}</td>
        <td>
            <ButtonContainer>
                <EditButton onClick={() => handleEditClick(ad)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDeleteClick(ad.id)}>Delete</DeleteButton>
            </ButtonContainer>
        </td>
    </tr>
);

export default AdTableRow;
