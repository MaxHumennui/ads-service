import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    padding: ${props => props.expanded ? '1rem' : '0'};
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    max-height: ${props => props.expanded ? '1000px' : '0'};
    overflow: hidden;

    input, textarea {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        font-size: 1rem;
        margin: 0 auto;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const StyledFileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    background-color: #f9f9f9;
    display: inline-block;
    text-align: center;

    &:hover {
        background-color: #f1f1f1;
    }
`;

const AdForm = ({ formData, setFormData, handleSubmit, expanded, type }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    return (
        <Form onSubmit={handleSubmit} expanded={expanded}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <StyledFileInput
                type="file"
                name="image"
                id={`${type}-image`}
                onChange={handleImageChange}
                accept="image/*"
            />
            <FileInputLabel htmlFor={`${type}-image`}>Choose Image</FileInputLabel>
            <button type="submit">{type === 'add' ? 'Add Ad' : 'Save'}</button>
        </Form>
    );
};

export default AdForm;
