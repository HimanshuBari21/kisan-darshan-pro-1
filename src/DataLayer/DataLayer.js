import React, {createContext, useContext, useReducer} from 'react'
export const DataLayerContext = createContext()

export const DataLayer = ({initialState, reducer, childern }) =>{
    return(<DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {childern}
    </DataLayerContext.Provider>)
}
export const useDataLayerValue = () => useContext(DataLayerContext)