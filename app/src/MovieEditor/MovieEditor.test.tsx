import '@testing-library/jest-dom'
import MovieEditor from "./MovieEditor";
import {MovieDto} from "../MovieDto";
import {render, screen, userEvent} from "../utils/test-utils";

describe("Movie", () => {
    it("loads a movie in the editor", async () => {
        let starWars: MovieDto = {
            title: "Star Wars",
        } as MovieDto;

        render(<MovieEditor movie={starWars} onClose={() => {
        }}/>);

        expect(screen.getByRole("textbox", {name: "Title"})).toBeInTheDocument();
        expect(screen.getByRole("textbox", {name: "Year"})).toBeInTheDocument();
    });
});
