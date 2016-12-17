/**
 * Created by Pan on 2016-12-16.
 */
import * as types from "./mutation-types"


export const addWidget = ({commit, type}) => {
    commit(types.ADD_WIDGET, {type})
}

export const editWidget = ({commit}, info) => {
    commit(types.EDIT_WIDGET, info)
}

export const deleteWidget = ({commit}) => {
    commit(types.DELETE_WIDGET)
}

export const updateActiveWidget = ({commit}, widget) => {
    commit(types.ACTIVE_WIDGET, widget)
}
