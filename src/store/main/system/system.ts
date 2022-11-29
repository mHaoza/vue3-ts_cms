import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState, PageName } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, userList: any[]) {
      state.roleList = userList
    },
    changeRoleCount(state, userCount: number) {
      state.roleCount = userCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: PageName) => state[`${pageName}List`]
    },
    pageCounttData(state) {
      return (pageName: PageName) => state[`${pageName}Count`]
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      // const pageUrl = `${pageName}/list`
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
      }

      // 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 将数据存到state
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}

export default systemModule
