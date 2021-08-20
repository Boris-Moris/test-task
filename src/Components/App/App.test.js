import {getByRole, render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import {Provider} from "react-redux";
import {store} from "../../reducers/reducer";
import {BrowserRouter as Router, Link} from "react-router-dom";
import React from "react";
import Card from "../Card/Card";

describe("Reducer", function () {
    it("renders with form", () => {
        render(<React.StrictMode>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        </React.StrictMode>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getAllByRole("combobox")[0]).toBeInTheDocument();
        expect(screen.getAllByRole("option")[0]).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    // it("submit works", () => {
    //     render(<React.StrictMode>
    //         <Provider store={store}>
    //             <Router>
    //                 <App/>
    //             </Router>
    //         </Provider>
    //     </React.StrictMode>);
    //     const buttonSubmit = screen.getByText("Search");
    //     userEvent.click(buttonSubmit);
    //     expect(screen.getByText("Total books found:")).toBeInTheDocument();
    //     // expect(screen.)
    // })
});