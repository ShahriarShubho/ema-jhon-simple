import React from 'react';
import swal from 'sweetalert';

const NotFound = () => {
    return (
        <div>
            swal("Good job!", "You clicked the button!", "success");
            <h1>This page is not Found</h1>
            <h3>404 Error!!!</h3>
        </div>
    );
};

export default NotFound;