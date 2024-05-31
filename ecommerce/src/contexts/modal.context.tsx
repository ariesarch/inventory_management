"use client";
import React from "react";

type MODAL_VIEWS =
    | "REGISTER"
    | "LOGIN_VIEW"

interface State {
    view?: MODAL_VIEWS;
    isOpen: boolean;
    // title?:string;
}
type Action =
    | { type: "open"; view?: MODAL_VIEWS; title?: any }
    | { type: "close" };

const initialState: State = {
    view: undefined,
    isOpen: false,
    // title:""
};

function modalReducer(state: State, action: Action): State {
    switch (action.type) {
        case "open":
            return {
                ...state,
                view: action.view,
                // title: action.title,
                isOpen: true,
            };
        case "close":
            return {
                ...state,
                view: undefined,
                // title:"",
                isOpen: false,
            };
        default:
            throw new Error("Unknown Modal Action!");
    }
}

const ModalStateContext = React.createContext<State>(initialState);
ModalStateContext.displayName = "ModalStateContext";
const ModalActionContext = React.createContext<
    React.Dispatch<Action> | undefined
>(undefined);
ModalActionContext.displayName = "ModalActionContext";

interface ModalProviderProps {
    children: React.ReactNode; // Add children prop
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [state, dispatch] = React.useReducer(modalReducer, initialState);
    return (
        <ModalStateContext.Provider value={state}>
            <ModalActionContext.Provider value={dispatch}>
                {children}
            </ModalActionContext.Provider>
        </ModalStateContext.Provider>
    );
};

export function useModalState() {
    const context = React.useContext(ModalStateContext);
    if (context === undefined) {
        throw new Error(`useModalState must be used within a ModalProvider`);
    }
    return context;
}

export function useModalAction() {
    const dispatch = React.useContext(ModalActionContext);
    if (dispatch === undefined) {
        throw new Error(`useModalAction must be used within a ModalProvider`);
    }
    return {
        openModal(view?: MODAL_VIEWS, title?: unknown) {
            dispatch({ type: "open", view, title });
        },
        closeModal() {
            dispatch({ type: "close" });
        },
    };
}
