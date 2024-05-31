'use client'
import { loggedIn } from '@/utils/is-loggedin'
import React, { FC, useMemo } from 'react'

export interface State {
    isAuthorize: boolean
}

const initialState = {
    isAuthorize: loggedIn(),
}

type Action =
    | {
        type: 'AUTHORIZE'
    }
    | {
        type: 'UNAUTHORIZE'
    }

export const UIContext = React.createContext<State | any>(initialState)
UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
    switch (action.type) {
        case 'AUTHORIZE': {
            return {
                ...state,
                isAuthorize: true,
            }
        }
        case 'UNAUTHORIZE': {
            return {
                ...state,
                isAuthorize: false,
            }
        }
    }
}
type ContainerProps = {
    children: React.ReactNode //👈 children prop typr
}

export const UIProvider = (props: ContainerProps) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState)

    const authorize = () => dispatch({ type: 'AUTHORIZE' })
    const unauthorize = () => dispatch({ type: 'UNAUTHORIZE' })

    const value = useMemo(
        () => ({
            ...state,
            authorize,
            unauthorize
        }),
        [state]
    )

    return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
    const context = React.useContext(UIContext)
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`)
    }
    return context
}
