import React, { useEffect, useState, useContext } from 'react';
import { getAds, createAd, updateAd, deleteAd, cleanOldEntries } from '../../services/api';
import { ErrorContext } from '../../context/NotificationContext';
import styled from 'styled-components';
import AdForm from './AdForm';
import AdTableRow from './AdTableRow';
import SuccessNotification from '../SuccessNotification';
import ErrorNotification from '../ErrorNotification';

// Styled Components
const AdTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;

const AdTableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    td img {
        width: 100px;
        height: auto;
        border-radius: 8px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-bottom: 1rem;
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

const AddButton = styled(Button)`
    padding: 0.75rem 2rem;
    font-size: 1rem;
`;

const CleanButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

const AdTable = () => {
    const [ads, setAds] = useState([]);
    const [editingAd, setEditingAd] = useState(null);
    const [addingAd, setAddingAd] = useState(false);
    const [editFormData, setEditFormData] = useState({ title: '', description: '', image: null });
    const [addFormData, setAddFormData] = useState({ title: '', description: '', image: null });
    const { setError, setSuccess } = useContext(ErrorContext);

    useEffect(() => {
        const fetchAds = async () => {
            const response = await getAds();
            if (response.success && Array.isArray(response.data)) {
                setAds(response.data);
            } else {
                setError(response.message || 'Unexpected error');
            }
        };

        fetchAds();
    }, [setError]);

    const handleEditClick = (ad) => {
        if (editingAd === ad.id) {
            setEditingAd(null);
        } else {
            setEditingAd(ad.id);
            setEditFormData({ title: ad.title, description: ad.description, image: null });
        }
    };

    const handleDeleteClick = async (id) => {
        const response = await deleteAd(id);
        if (response.success) {
            setAds(prev => prev.filter(ad => ad.id !== id));
            setSuccess('Ad deleted successfully');
        } else {
            setError(response.message || 'Failed to delete ad');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', editFormData.title);
        formData.append('description', editFormData.description);
        if (editFormData.image) {
            formData.append('image', editFormData.image);
        }

        const response = await updateAd(editingAd, formData);
        if (response.success) {
            setAds(prev => prev.map(ad => (ad.id === editingAd ? { ...ad, ...editFormData, image: response.data.image } : ad)));
            setEditingAd(null);
            setSuccess('Ad updated successfully');
        } else {
            setError(response.message || 'Failed to update ad');
        }
    };

    const handleAddAdClick = () => {
        setAddingAd(!addingAd);
        setEditingAd(null);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', addFormData.title);
        formData.append('description', addFormData.description);
        if (addFormData.image) {
            formData.append('image', addFormData.image);
        }

        const response = await createAd(formData);
        if (response.success) {
            setAds([...ads, response.data]);
            setAddingAd(false);
            setAddFormData({ title: '', description: '', image: null });
            setSuccess('Ad added successfully');
        } else {
            setError(response.message || 'Failed to add ad');
        }
    };

    const handleCleanOldEntries = async () => {
        const response = await cleanOldEntries();
        if (response.success) {
            // Optionally, fetch ads again if the old entries affected the ads
            const adsResponse = await getAds();
            if (adsResponse.success && Array.isArray(adsResponse.data)) {
                setAds(adsResponse.data);
                setSuccess('Old entries cleaned successfully');
            } else {
                setError(adsResponse.message || 'Unexpected error');
            }
        } else {
            setError(response.message || 'Failed to clean old entries');
        }
    };

    return (
        <AdTableContainer>
            <ErrorNotification />
            <SuccessNotification />
            <ButtonContainer>
                <AddButton onClick={handleAddAdClick}>Add Ad</AddButton>
                <CleanButton onClick={handleCleanOldEntries}>Clean Old Entries</CleanButton>
            </ButtonContainer>
            {addingAd && (
                <AdForm
                    formData={addFormData}
                    setFormData={setAddFormData}
                    handleSubmit={handleAddSubmit}
                    expanded={addingAd}
                    type="add"
                />
            )}
            <AdTableStyled>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map(ad => (
                        <React.Fragment key={ad.id}>
                            <AdTableRow
                                ad={ad}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                            {editingAd === ad.id && (
                                <tr>
                                    <td colSpan="7">
                                        <AdForm
                                            formData={editFormData}
                                            setFormData={setEditFormData}
                                            handleSubmit={handleEditSubmit}
                                            expanded={editingAd === ad.id}
                                            type="edit"
                                        />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </AdTableStyled>
        </AdTableContainer>
    );
};

export default AdTable;
