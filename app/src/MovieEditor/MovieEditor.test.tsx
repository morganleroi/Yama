import MovieEditor from './MovieEditor';
import {MovieDto} from '../MovieDto';
import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import userEvent from "@testing-library/user-event";

describe('MovieEditor', () => {
    const movieEditorProps = {
        onCreateOrUpdate: () => Promise.resolve(),
        onDelete: () => Promise.resolve(),
        onClose: () => Promise.resolve(),
    }

    it('should loads a movie in the editor', async () => {
        let starWars: MovieDto = {
            objectID: '42',
            title: 'Star Wars',
            year: 2012
        } as MovieDto;

        render(<MovieEditor {...movieEditorProps} movie={starWars}/>);

        expect(screen.getByRole('textbox', {name: 'Title'})).toHaveValue("Star Wars");
        expect(screen.getByRole('textbox', {name: 'Year'})).toHaveValue("2012");
        expect(screen.getByRole('button', {name: 'Update the movie'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument();
    });

    it('should load a blank form when creating a new movie', async () => {
        let newMovie: MovieDto = {} as MovieDto;

        render(<MovieEditor {...movieEditorProps} movie={newMovie}/>);

        expect(screen.getByRole('textbox', {name: 'Title'})).toHaveValue("");
        expect(screen.getByRole('textbox', {name: 'Year'})).toHaveValue("");
        expect(screen.getByRole('button', {name: 'Create a new movie'})).toBeInTheDocument();
    });

    it('should update movie when user submit form', async () => {
        let starWars: MovieDto = {
            objectID: '42',
            title: 'Star Wars',
            year: 2012
        } as MovieDto;

        const handler = vi.fn((movie: MovieDto) => Promise.resolve());

        render(<MovieEditor {...movieEditorProps} onCreateOrUpdate={handler} movie={starWars}/>)

        await userEvent.click(screen.getByRole('button', {name: 'Update the movie'}));

        expect(handler).toHaveBeenCalledWith(starWars);
    });

    it('should create movie when user submit form', async () => {
        let newStarWars: MovieDto = {
            title: 'Star Wars',
            year: 2023
        } as MovieDto;

        const handler = vi.fn((movie: MovieDto) => Promise.resolve());

        render(<MovieEditor {...movieEditorProps} onCreateOrUpdate={handler} movie={newStarWars}/>)

        await userEvent.click(screen.getByRole('button', {name: 'Create a new movie'}));

        expect(handler).toHaveBeenCalledWith(newStarWars);
    });

    it('should create movie when user submit form', async () => {
        let starWars: MovieDto = {
            objectID: '42',
            title: 'Star Wars',
            year: 2019
        } as MovieDto;

        const handler = vi.fn((objectID: string) => Promise.resolve());

        render(<MovieEditor {...movieEditorProps} onDelete={handler} movie={starWars}/>)

        await userEvent.click(screen.getByRole('button', {name: 'Delete'}));

        expect(handler).toHaveBeenCalledWith("42");
    });

    it('should react on close button', async () => {
        let starWars: MovieDto = {
            objectID: '42',
            title: 'Star Wars',
            year: 2012
        } as MovieDto;


        const handler = vi.fn(() => Promise.resolve());

        render(<MovieEditor {...movieEditorProps}
                            movie={starWars} onClose={handler}/>)

        await userEvent.click(screen.getByRole('button', {name: 'Close'}));

        expect(handler).toHaveBeenCalledOnce();
    });
});
