export default {
  created () {
    this.getList()
  },
  methods: {
    // 排序
    sortChange ({order, prop}) {
      let value = order
      if (order) {
        value = this.sortMap[order]
      } else {
        value = ''
      }
      let propKey = this.sortKeyMap[prop] || prop
      this.searchForm.sort = value ? `${propKey},${value}` : ''
      this.getList()
    },
    // 表格选择变化
    handleSelect (arr) {
      this.selectedList = arr || []
    },
    // 切换单页数量
    handleSizeChange (e) {
      this.pageInfo.size = e
      this.getList()
    },
    // 切页
    handleCurrentChange (e) {
      this.pageInfo.page = e
      this.getList()
    },
    // 获取列表
    getList (customParams) {
      this.selectedList = []
      this.loadings.list = true
      let params = {
        ...this.searchForm,
        ...this.pageInfo
      }
      params.page = params.page - 1
      delete params.totalElements
      delete params.pageSizes
      delete params.totalPages
      delete params.layout
      if (Object.prototype.toString.call(customParams) === '[object Object]') {
        params = {...params, ...customParams}
      }
      this.getListApi(params)
        .then(res => {
          this.loadings.list = false
          if (typeof this.listCallback === 'function') {
            res.result = this.listCallback(res.result.content || [])
          }
          this.pageInfo.totalElements = res.result.totalElements
          this.pageInfo.totalPages = res.result.totalPages
          this.tableData = res.result.content || []
        })
    },
    // 删除批量删除
    batchDelete (arr, isBatch, message) {
      if (isBatch && arr && arr.length === 0) {
        this.$message.warning('请选择删除项！')
        return
      }
      this.$confirm(message, '提示', {type: 'warning'})
        .then(res => {
          let idKey = this.idKey || 'id'
          const ids = arr.map(item => item[idKey])
          this.deleteApi(ids)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('删除成功！')
                this.getList()
                if (isBatch) {
                  // 批量删除后清空
                  this.selectedList = []
                } else {
                  // 单个删除清空当前的删除的
                  this.selectedList = this.selectedList.filter(item => {
                    if (ids.indexOf(item[idKey]) < 0) {
                      return true
                    } else {
                      return false
                    }
                  })
                }
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        })
    },
    addOrEdit (path, id) {
      this.$router.push({path: path, query: {id: id}})
    },
    reset (params) {
      this.selectedList = []
      this.searchForm = {
        ...params,
        sort: ''
      }
      this.getList()
    }
  },
  data () {
    return {
      sortMap: {
        ascending: 'asc',
        descending: 'desc'
      },
      loadings: {
        list: false
      },
      selectedList: [],
      tableData: [],
      pageInfo: {
        layout: 'total,prev,pager,next,sizes,jumper',
        pageSizes: [10, 20, 30, 40],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }
    }
  }
}
