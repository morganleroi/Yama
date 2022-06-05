import React from "react";

export const MovieEditorSuccess = (props: { isCreation: boolean }) => {
    return (<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
        <p className="font-bold">🙌 Hooray 🙌</p>
        <p>{props.isCreation ? "Your new movie is now in YAMA" : "Your movie is now updated"}</p>
    </div>);
}