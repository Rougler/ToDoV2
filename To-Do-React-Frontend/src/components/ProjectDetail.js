import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { name } = useParams();

    return (
        <div>
            <h1>{name}</h1>
            <p>Description for {name} goes here.</p>
        </div>
    );
};

export default ProjectDetail;
