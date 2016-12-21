/**
 * Created by Pan on 2016-12-16.
 */
import * as types from "./mutation-types"


export const addWidget = ({commit}, type) => {
    setTimeout(() => {
        commit(types.ADD_WIDGET, type)

    }, 1000)
    // commit(types.ADD_WIDGET, type)
}

export const editWidget = ({commit}, info) => {
    commit(types.UPDATE_WIDGET, info)
}

export const deleteWidget = ({commit}) => {
    commit(types.DELETE_WIDGET)
}

export const updateActiveWidget = ({commit}, widget) => {
    commit(types.ACTIVE_WIDGET, widget)
}
