import React from 'react';
import {FormAction} from "./MovieEditor";

export const MovieEditorSuccess = ({action}: { action?: FormAction }) => {

    const getMessage = () => {
        let message;

        switch (action) {
            case "CREATE":
                message = 'Your new movie is now in YAMA'
                break
            case "UPDATE":
                message = 'Your movie is now updated'
                break
            case "DELETE":
                message = 'Your movie is now deleted'
                break
        }
        return message;
    }

    return (
        <div id="success" className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
            <p className="font-bold">🙌 Hooray 🙌</p>
            <p>{getMessage()}</p>
        </div>
    );
};