export default {
  data () {
    return {
      loadings: {
        detail: false,
        operate: false
      }
    };
  },
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    id: function (val) {
      this.tableForm.id = Number(val);
      if (val) {
        this.getDetail(Number(this.id));
      }
    }
  },
  created () {
    if (this.id) {
      let idKey = this.idKey || 'id';
      this.tableForm[idKey] = this.id;
      this.getDetail();
    }
  },
  computed: {
    title () {
      return `${this.id ? '修改' : '新建'}${this.pageTitle || ''}`;
    }
  },
  methods: {
    // 获取详情接口
    getDetail () {
      this.loadings.detail = true;
      this.detailApi(this.tableForm.id)
        .then(res => {
          this.loadings.detail = false;
          if (res.status && res.code && res.status !== 200) {
            this.$message.error(res.message);
          } else {
            try {
              this.tableForm = res.result;
            } catch (e) {}
          }
        })
        .catch(err => {
          this.loadings.detail = false;
          this.$message.error(err);
        });
    },
    // 新建
    add (params, routerName) {
      this.loadings.operate = true;
      this.addApi(params)
        .then(res => {
          this.loadings.operate = false;
          if (res.status === 200) {
            this.$message.success('新建成功！');
            this.$router.push({path: routerName});
            this.addCallback && this.addCallback();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 编辑更新
    update (params, routerName) {
      this.loadings.operate = true;
      this.updateApi(params)
        .then(res => {
          this.loadings.operate = false;
          if (res.status === 200) {
            this.$message.success('修改成功！');
            this.$router.push({path: routerName});
            this.updateCallback && this.updateCallback();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 取消
    cancel () {
      this.$router.go(-1);
    }
  }
};
