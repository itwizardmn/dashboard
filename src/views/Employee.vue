<template>
		<div class="mt-10 unprinter scrollable">
			<div>
				<export-excel
					class   = "btn btn-default"
					:data="xlsData"
					:fields="xlsFields"
					worksheet = "My Worksheet"
					:before-generate="beforeDownloadExcel"
					:title="xlsHeader"
					name    = "filename.xls">
				<el-button type="primary" plain class="addProperty" icon="el-icon-download" size="mini">Татах</el-button>
			</export-excel>
      </div>
			<table class="table-box card-base card-outline styled striped hover">
				<thead>
					<tr>
						<th>Зураг</th>
            <th>Нэр</th>
            <th>Мэргэжил</th>
            <th>Баг</th>
						<th>Дараалал</th>
            <th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in employee" :key="index">
						<td>
							<div class="item-box item-customer">
                <!-- <el-avatar shape="square" size="large" :src="$imgUrl + item.profile"></el-avatar> -->
                <div class="avatar">
                  <img :src="$imgUrl + item.profile" :alt="'profile' + item.profile" @error="onerror">
                </div>
								<!-- <h5 class="m-0 o-070">{{item.profile}}</h5> -->
							</div>
						</td>
            <td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.name}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.pro_name}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.team_name}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.sort}}</h5>
							</div>
						</td>
						<td align="right">
							<el-button type="primary" plain icon="el-icon-edit" @click="showEditForm(item)" size="mini"></el-button>
							<el-popover
								placement="top-end"
								width="160"
								v-model="item.confirm">
								<p>Итгэлтэй байна уу?</p>
								<div style="text-align: right; margin: 0;">
									<el-button size="mini" type="text" @click="item.confirm = false">Үгүй</el-button>
									<el-button type="primary" size="mini" @click="deletePro(item)">Тийм</el-button>
								</div>
								<el-button type="danger" slot="reference" plain icon="el-icon-delete" size="mini" style="margin-left: 10px;"></el-button>
							</el-popover>
						</td>
					</tr>
				</tbody>
			</table>

      <!-- <el-dialog
        title="Засварлах"
        :visible.sync="dialog.edit"
        width="30%">
        <div style="padding: 0px 30px;">
          
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog.edit = false">Болих</el-button>
          <el-button @click="update">Хадгалах</el-button>
        </span>
      </el-dialog> -->


			<el-dialog title="Бүтээгдэхүүн" :visible.sync="dialog.edit">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12">
          <div class="img-container">
            <img :src="$imgUrl + selected.photo" alt="" style="width: 100%; height: 100%; object-fit: cover;" @error="replaceByDefault">
            <div class="change-avatar" @click="$refs.avatar_upload.click()">
              <input type="file" ref="avatar_upload" hidden @change="changePhoto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/></svg>
            </div>
          </div>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-select v-model="selected.pro_seq" placeholder="Мэргэжил" style="width: 100%;">
            <el-option
              v-for="item in professions"
              :key="item.seq"
              :label="item.pro_name"
              :value="item.seq">
            </el-option>
          </el-select>

          <el-select v-model="selected.team_seq" placeholder="Баг" style="width: 100%; margin-top: 10px;">
            <el-option
              v-for="item in teams"
              :key="item.seq"
              :label="item.team_name"
              :value="item.seq">
            </el-option>
          </el-select>

					<el-select v-model="selected.levels" placeholder="Түвшин" style="width: 100%; margin-top: 10px;">
            <el-option
              v-for="item in levels"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>

          <el-input-number v-model="selected.sort" :min="1" :max="10000" style="width: 100%; margin-top: 10px;"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
				<el-button @click="dialog.edit = false">Болих</el-button>
        <el-button type="primary" @click="update">Хадгалах</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
	name: 'Teams',
	data () {
		return {
      employee: [],
      teams: [],
      professions: [],
			dialog: {
				edit: false
			},
      selected: {
       seq: 0,
       pro_seq: '',
       team_seq: '',
       sort: 0,
			 levels: '',
			 photo: ''
      },
			levels: ['Trainee', 'Junior', 'MidLevel', 'Senior'],
			selectedFile: '',
			xlsHeader: '<h3 style="text-align: left; background: yellow;">▶ 몽골 개발자 인력 현황</h3>',
			xlsFields: {
				'<div style="font-size: 20px; background-color: #D8D8D8; width: 200px; height: 100px;border-style: solid;">번호</div>'				: {field: 'index', callback: (value) => {
					return `<div style="border: 1px solid grey;">${value}</div>`;
				}},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">이름</div>'				: {field: 'name', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">기술등급</div>'		: {field: 'level', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">업무</div>'				: {field: 'position', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">학력</div>'				: {field: 'education', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">경력</div>'				: {field: 'career', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">기술</div>'				: {field: 'technology', callback: (value) => {
					return `<div style="border: 1px solid grey;">${value}</div>`;
				}},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">영어</div>'				: {field: 'english', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">한국어</div>'			: {field: 'korean', width: 500},
				'<div style="font-size: 20px; background: #D8D8D8;border-style: solid;">기타</div>'				: {field: 'about', width: 500}
			},
			xlsData: []
		}
	},
  created() {
    this.getEmployee();
    this.getTeams();
    this.getProfession();
  },
	mounted() {},
	methods: {
		getMinYear(exp) {
			if (!exp) {
				return 1;
			}
			let min = new Date().getFullYear(), now = new Date().getFullYear();
			const obj = JSON.parse(exp);

			obj.forEach(elm => {
				let year = new Date(elm.inYear);
				min > year.getFullYear() ? min = year.getFullYear() : null;
			});

			return now - min < 1 ? 1 : now - min;
		},
		getProName(seq) {
			let name = '';
			this.professions.forEach(element => {
				element.seq === seq ? name = element.pro_name_ko : null;
			});
			return name;
		},
		getKorean(lang) {
			if (!lang) {
				return 0;
			}

			let perc = 0;
			let obj = JSON.parse(lang);
			obj.forEach(elm => {
				elm.language === 'Korean' ? perc = elm.percent : null;
			});

			console.log(perc);
		},
		getSkills(skill) {
			if (!skill) {
				return '';
			}

			let str = '';
			let obj = JSON.parse(skill);
			obj.forEach(elm => {
				str += str === '' ? elm.programm : ', ' + elm.programm;
			});
			
			return str;
		},
		async beforeDownloadExcel() {
			this.employee.forEach((elm, index) => {
				this.getKorean(elm.lang);
				this.xlsData.push({
					index: index + 1, 
					name: elm.name, 
					level: this.$textApi(elm.levels), 
					position: this.getProName(elm.pro_seq),
					career: this.getMinYear(elm.experience) + ' 년',
					technology: this.getSkills(elm.skill)
				});
			});
		},
		changePhoto(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      this.selectedFile = file;
      // this.pageLoading = true;
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      fd.append('data', JSON.stringify({seq: this.selected.seq, file_seq: this.selected.photo}));
      this.$axios.post(
        '/a1/update-photo',
        fd
      ).then(data => {
        this.selected.photo = data.data.data;        
        this.getEmployee();
        event.target.value = '';
				console.log(data);
      }).catch(err => {
        console.log(err);
      });
    },
		replaceByDefault(e) {
      e.currentTarget.src = require('@/assets/images/no-user.png');
    },
    async update() {
			const data = await this.$useapi('PUT', '/a1/update-employee', { info : this.selected }); 
			if (data) {
				this.employee = [];
        this.getEmployee();
        this.dialog.edit = false;
			}
    },
    async getProfession() {
			const data = await this.$useapi('POST', '/a1/project/get-list', { cont: 'PROFESSION'});
			if (data) {				
				this.professions = data.data.data;
			}
    },
    showEditForm(item) {
      this.selected = {
        seq: item.seq,
        pro_seq: item.pro_seq,
        team_seq: item.team_seq,
        sort: item.sort,
				levels: item.levels,
				photo: item.photo
      };
      this.dialog.edit = true;
    },
    onerror(event) {
      event.currentTarget.style.display = 'none';
    },
		async deletePro(item) {
			const data = await this.$useapi('PUT', '/a1/delete-employee', { seq: item.seq });
			if (data) {
				this.getEmployee();
			}
		},
    async getEmployee() {
			const data = await this.$useapi('GET', '/v1/employee/employees');
			if (data) {
				this.employee = data.data.data;
			}
    },
    async getTeams() {
			const data = await this.$useapi('GET', '/v1/team/list');
      if (data) {
				this.teams = data.data.data;
			}
    }
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';


.img-container {

  position: relative;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  .change-avatar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 50%;
    transition: .5s;
    height: 0;
    background: #000;
    opacity: .5;
    display: flex;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 10%;
      height: auto;
      fill: #fff;
    }
  }
  &:hover {
    .change-avatar { height: 70%; }
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  background: #c0c4cc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

div[role=tooltip] {
	overflow: hidden;
	text-align: center;
}
.addProperty {
  width: 200px;
  margin-bottom: 20px;
  float: right !important;
  @include mobile {
    width: 100%;
  }
}

.printer {
  display: none;
}
.page-ecommerce-dashboard {
  .el-dialog {
    width: 720px;
  }
  table tbody tr {
    cursor: pointer;
  }
  h5 {
    font-weight: 600;
  }
	.widget {
		.icon-box {
			font-size: 30px;
		}
	}

	.table-box {
		.item-box {
			&.item-product {
				.product-image {
					width: 50px;
					margin-right: 15px;
					float: left;

					img {
						width: 100%;
					}
				}
			}

			&.item-status {
				padding: 5px 10px;

				&.status- {
					&Complete { background: rgba(44, 196, 120, 0.25); }
					&Pending { background: rgba(247, 186, 42, 0.25); }
					&Returned { background: rgba(243, 24, 71, 0.25); }
					&Paid { background: rgba(45, 109, 211, 0.25); }
				}
			}
		}
	}

  @include mobile {
    .el-dialog {
      width: 100%;
    }
  }
}


.page-invoice {
	.toolbar {
		max-width: 100%;
		margin: 0 auto;
		text-align: right;
		margin-bottom: 20px;
	}

	.invoice {
		background: white;
		width: 100%;
		max-width: 100%;
		min-height: 1123px;
		margin: 0 auto;
		padding: 2em;
		box-sizing: border-box;
		box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.3);

		hr {
			border: 1px solid rgba(0, 0, 0, 0.05);
		}

		.invoice-top {
			overflow: hidden;
			margin-bottom: 30px;

			.logo {
				float: left;
				box-sizing: border-box;
				overflow: hidden;
        height: 60px;
				// background: rgba(0, 0, 0, 0.07);
				text-align: center;
				
				img {          
          // transform: translateY(-50%);
					width: 60px;
          height: auto;
					margin-top: 10%;
				}
			}
			.info {
				display: block;
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}
			.title {
				float: right;

				& > * {
					margin: 0;
				}

				p {
					text-align: right;
				}
			}
		}

		.invoice-middle { 
			overflow: hidden;
			margin-top: 30px;
			margin-bottom: 30px;

			.clientlogo {
				float: left;
				height: 60px;
				width: 60px;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				background: grey;
				
				img {
					width: 100%;
				}
			}

			.info {
				display: block;
				float:left;
				margin-left: 20px;
				margin-top: 5px;

				& > * {
					margin: 0;
				}
			}

			.project {
				margin-left: 52%;

				& > * {
					margin: 0;
				}
			}
		}

		.invoice-bottom {
      &-title {
        font-weight: 600;
        margin-bottom: 0;
        margin-top: 40px;
      }
			table {
				width: 100%;
				border-collapse: collapse;
				
				th {
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					opacity: .7;
					
					&:first-child {
						text-align: left;
						padding-left: 0px;
						// width: 100%;
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				td {
					text-align: right;
					padding: 20px;
					padding-bottom: 5px;
					border-bottom: 1px solid #EEE;

					&:first-child {
						text-align: left;
						padding-left: 0px;
						// width: 100%;
					}
					&:last-child {
						padding-right: 0px;
					}
				}

				tfoot td {
					border: none;
					padding-top: 5px;
				}
			}
		}

		h1 { font-size: 1.5em; color: #222; }
		h2 { font-size: .9em; }
		h3 { font-size: 1.2em; font-weight: 300; line-height: 2em; }
		p  { font-size: .7em; color: #666; line-height: 1.2em; }
	}

}


@media screen and (max-width: 768px) {
	.page-invoice {
		.invoice {
			.invoice-middle { 
				.project {
					display: block;
					width: 100%;
					clear: both;
					padding: 10px 0;
					margin: 0;
				}
			}
			.invoice-bottom {
				table {
					th {
						padding: 5px;
					}

					td {
						padding: 5px;
					}
				}
			}
		}
	}
}

@media print{
	.layout-container .container .footer ,
	.layout-container .container .header ,
	.layout-container .container .horizontal-nav ,
	.layout-container .footer ,
	.layout-container .layout-picker ,
	.layout-container .vertical-nav ,
	.layout-container .header{
		display:none;
	}

	.page-invoice {
		.toolbar {
			display: none;
		}

		.invoice {
			box-shadow: none;
			max-width: 100%;
			padding: 0;
		}
	}

  .unprinter {
    display: none;
  }

  .printer {
    display: block;
  }
}

</style>


