import React from 'react'

export const Alert = (props) => {
    return (
        <div class="container">
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
        </div>
    )
}
