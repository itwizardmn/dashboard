<template>
  <div class="scrollable">
    <div align="right">
      <el-select v-model="filter.selected" placeholder="Бүгд" clearable class="filter-box" size="mini">
        <el-option
          v-for="item in filter.list"
          :key="item + 'vote'"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <table class="table-box card-base card-outline styled striped hover">
      <thead>
        <tr>
          <th>Гарчиг</th>
          <th>Төрөл</th>
          <th>Огноо</th>
          <th>Илгээсэн</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filterFeedback" :key="index">
          <td>
            <div class="item-box item-customer">
              <h5 class="m-0 o-070">{{item.title}}</h5>
            </div>
          </td>
          <td>
            <div class="item-box item-customer">
              <h5 class="m-0 o-070">{{item.vote}}</h5>
            </div>
          </td>
          <td>
            <div class="item-box item-customer">
              <h5 class="m-0 o-070">{{item.date}}</h5>
            </div>
          </td>
          <td>
            <div class="item-box item-customer">
              <h5 class="m-0 o-070">{{item.name}}</h5>
            </div>
          </td>
          <td>
            <el-tag v-if="item.status == 'pending'" size="mini">Sent</el-tag>
            <el-tag v-else-if="item.status == 'resolved'" size="mini" type="success">Resolved</el-tag>
            <el-tag v-else-if="item.status == 'returned'" size="mini" type="warning">Returned</el-tag>
          </td>
          <td align="right">
            <el-button type="primary" plain icon="el-icon-edit" :loading="item.loading" size="mini" @click="selectItem(item)"></el-button>
            <el-popover
              v-bind:class="{'hidden': item.status === 'returned'}"
              placement="top-end"
              width="160"
              v-model="item.confirm">
              <p>Итгэлтэй байна уу?</p>
              <div style="text-align: right; margin: 0;">
                <el-button size="mini" type="text" @click="item.confirm = false">Үгүй</el-button>
                <el-button type="primary" @click="updateFeedback(item, 'returned')" size="mini">Тийм</el-button>
              </div>
              <el-button type="danger" slot="reference" :loading="item.loading" plain icon="el-icon-delete" size="mini" style="margin-left: 10px;"></el-button>
            </el-popover>
          </td>
        </tr>
      </tbody>
    </table>

    <el-pagination
      style="text-align: center;margin-top: 20px;"
      background
      :page-size="page.size"
      :current-page="page.current"
      @current-change="chnagePaginate"
      layout="prev, pager, next"
      :total="page.total">
    </el-pagination>

    <el-dialog class="dialogInfo" :title="this.feedback.selected.vote" v-if="this.feedback.selected" :visible.sync="dialog.info">
      <div class="feedback">
        <div class="box">
          <ul>
            <li><strong>{{this.feedback.selected.name}}</strong></li>
            <li>{{this.feedback.selected.date}}</li>
            <li>{{this.feedback.selected.title}}</li>
            <li>{{this.feedback.selected.content}}</li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.info = false">Гарах</el-button>
        <el-button type="success" v-if="feedback.selected.status !== 'resolved'" @click="updateFeedback(feedback.selected, 'resolved')" plain>Шийдвэрлэсэн болгох</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: {
        info: false
      },
      feedback: {
        list: [],
        selected: null
      },
      filter: {
        selected: null,
        list: []
      },
      page: {
        total: 0,
        current: 1,
        size: 20
      }
    }
  },
  created() {
    this.getFeedback();
  },
  computed: {
    filterFeedback() {
      let arr = [], page = [];
      if (!this.filter.selected) {
        arr = this.feedback.list;
      } else {
        this.feedback.list.forEach(elm => {
          elm.vote === this.filter.selected ? arr.push(elm) : null;
        });
      }

      const min = this.page.current - 1;
      arr.forEach((elem, index) => {
        index >= min * this.page.size && index < this.page.current * this.page.size ? page.push(elem) : null;
      });
      this.page.total = arr.length;
      return page;
    }
  },
  methods: {
    async updateFeedback(item, status) {
      item.loading = true;
      item.confirm = false;
      this.dialog.info = false;
      const data = await this.$useapi('PUT', '/a1/update-feedback', { status, seq: item.seq });
      if (data) {
        this.getFeedback();
        item.loading = false;
      }
    },
    chnagePaginate(event) {
      this.page.current = event;
    },
    async getFeedback() {
      const data = await this.$useapi('GET', '/a1/get-votes');
      if (data.data && data.data.message == 'Success') {
        this.feedback.list = data.data.data;
        data.data.data.forEach(elm => {
          if(!this.filter.list.includes(elm.vote)) {
            this.filter.list.push(elm.vote);
          }
        });
      }
    },
    selectItem(item) {
      this.feedback.selected = item;
      this.dialog.info = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins';

.hidden {
  pointer-events: none;
  opacity: 0;
}
.dialogInfo {
  margin: 20px;
  .feedback {
    width: 100%;
    ul {
      list-style: none;

      li {
        border-bottom: 1px solid rgba(#000, 0.1s);
        padding: 5px 0px;
        &:last-child {
          border: none;
        }
      }
    }
  }
}

.filter-box {
  margin-bottom: 10px;

  @include mobile {
    width: 100%;
  }
}
</style>