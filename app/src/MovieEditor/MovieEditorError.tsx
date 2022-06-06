import React from 'react';

export const MovieEditorError = (props: { error?: string; isCreation: boolean }) => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6"
      role="alert"
    >
      <p className="font-bold">🥲 Oupss, something went wrong 🥲</p>
      <p>
        {props.isCreation
          ? 'This error occurred during the creation :'
          : 'This error occurred during the update :'}
      </p>
      <p>{props.error}</p>
    </div>
  );
};