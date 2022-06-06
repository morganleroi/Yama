import React from 'react';
import {FormAction} from "./MovieEditor";

export const MovieEditorError = ({error, action}: { error?: string; action?: FormAction }) => {

    const getMessage = () => {
        let message;

        switch (action) {
            case "CREATE":
                message = 'creation'
                break
            case "UPDATE":
                message = 'update'
                break
            case "DELETE":
                message = 'deletion'
                break
        }
        return message;
    }

    return (
        <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6"
            role="alert"
        >
            <p className="font-bold">🥲 Oupss, something went wrong 🥲</p>
            <p>This error occurred during the {getMessage()}</p>
            <p>{error}</p>
        </div>
    );
};