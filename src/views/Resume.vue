<template>
	<div class="page-ecommerce-dashboard scrollable">
    <!-- <div class="page-invoice printer">
      <div class="invoice bg-white black-text" id="print-html-builder"></div>
    </div> -->

    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="Resume"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <div class="page-invoice">            

            <div class="invoice bg-white black-text">		
              <div class="invoice-top">
                <div class="logo">
                  <img src="@/assets/images/logo_blck.png" alt="logo">
                </div>
                <div class="info">
                  <h2>itwizard.mn</h2>
                  <p>admin@itwizard.mn<br>+976 7511-0023</p>
                </div><!--End Info-->
                <div class="title" align="right">
                  <h1>RESUME</h1>
                  <p>{{new Date().toLocaleString()}}</p>
                </div>
              </div>

              <hr>			

              <div class="invoice-middle" v-if="selectedResume">
                <!-- <div class="clientlogo">
                  <img src="@/assets/images/avatar.jpg" alt="client logo">
                </div> -->
                <div class="info">
                  <h2>{{selectedResume.firstname}} {{selectedResume.lastname}}</h2>
                  <p>{{selectedResume.register}}<br> {{selectedResume.email}}<br>{{selectedResume.phone}}</p>
                </div>

                <div class="project" align="right">
                  <h2>Гэрийн хаяг</h2>
                  <p>{{selectedResume.address}}</p>
                </div>   
              </div>

              <div class="invoice-bottom">
                <div class="invoice-bottom-title">Гэр бүлийн байдал</div>
                <table>
                  <thead>
                    <tr>
                      <th>Таны хэн болох</th>
                      <th>Нэр</th>
                      <th>Мэргэжил/Ажлын байр</th>
                      <th>Төрсөн огноо</th>
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.family)" :key="index">
                      <td>{{item.role}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.birthdate.substr(0, 10)}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="invoice-bottom-title">Боловсролын талаарх мэдээлэл</div>
                <table>
                  <thead>
                    <tr>
                      <th>Сургуулийн нэр</th>
                      <th>Эзэмшсэн мэргэжил</th>
                      <th>Элссэн огноо</th>
                      <th>Төгссөн огноо</th>
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.edu)" :key="index">
                      <td>{{item.school}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.inYear.substr(0, 10)}}</td>
                      <td>{{item.outYear.substr(0, 10)}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="invoice-bottom-title">Гадаад хэлний мэдээлэл</div>
                <table>
                  <thead>
                    <tr>
                      <th>Гадаад хэл</th>
                      <th>Түвшин</th>
                      <th>Судалсан жил</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.lang)" :key="index">
                      <td>{{item.language}}</td>
                      <td><el-progress :percentage="item.percent" class="themed"></el-progress></td>
                      <td>{{item.year}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="invoice-bottom-title page-break">Ажлын туршлага</div>
                <table>
                  <thead>
                    <tr>
                      <th>Байгууллага</th>
                      <th>Албан тушаал</th>
                      <th>Орсон огноо</th>                      
                      <th>Гарсан огноо</th>                      
                      <th>Шалтгаан</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.experience)" :key="index">
                      <td>{{item.company}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.inYear.substr(0, 10)}}</td>
                      <td>{{item.outYear.substr(0, 10)}}</td>
                      <td>{{item.outReason}}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="invoice-bottom-title">Ур чадвар</div>
                <table>
                  <thead>
                    <tr>
                      <th>Программын нэр</th>
                      <th>Түвшин</th>
                      <th>Судалсан жил</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.skill)" :key="index">
                      <td>{{item.programm}}</td>
                      <td><el-progress :percentage="item.level" class="themed"></el-progress></td>
                      <td>{{item.year}}</td>
                    </tr>
                  </tbody>
                </table>    
                <div class="invoice-bottom-title">Давуу/Сул талууд</div>
                <table>
                  <thead>
                    <tr>
                      <th>Давуу тал</th>
                      <th>Сул тал</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr>
                      <td width="50%">{{JSON.parse(selectedResume.personal).advantage}}</td>
                      <td width="50%">{{JSON.parse(selectedResume.personal).disadvantage}}</td>
                    </tr>
                  </tbody>
                </table>              
              </div>
            </div>
          </div>
        </section>
    </vue-html2pdf>
		<div class="table-box card-base card-outline mt-20 unprinter">
			<table class="styled striped hover">
				<thead>
					<tr>
						<th>Овог</th>
						<th>Нэр</th>
						<th>Утас</th>
						<th>Имэйл</th>
						<th>Тө.Огноо</th>
            <th>Төлөв</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in property" :key="index" @click="showProperty(item)">
						<td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.lastname}}</h5>
								<!-- <p class="m-0 o-060"><a></a></p> -->
							</div>
						</td>
						<td>
							<div class="item-box item-location">
								<h5 class="m-0 o-070">{{item.firstname}}</h5>
							</div>
						</td>
						<td>
							<div class="item-box item-location">
								<h5 class="m-0 o-070">{{item.phone}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-location">
								<h5 class="m-0 o-070">{{item.email}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-location">
								<h5 class="m-0 o-070">{{item.birthdate.substr(0, 10)}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-location item-status" v-bind:class="{'status-Complete' : item.status == 'accepted', 'status-Paid' : item.status == 'pending', 'status-Returned': item.status == 'returned'}">
								<h5 class="m-0 o-070">{{item.status == 'accepted' ? 'Баталгаажсан' : (item.status == 'pending' ? 'Илгээгдсэн' : 'Татгалзсан')}}</h5>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
      <el-dialog title="Анкет дэлгэрэнгүй" :visible.sync="dialog.resume" class="resume">
        <div>
          <div class="page-invoice scrollable">
            <div class="toolbar" v-if="selectedResume">
              <el-button class="animated fadeInRight" type="primary" plain size="small" @click="changeStatus" :disabled="selectedResume.status == 'accepted'"><i class="mdi mdi-check"></i> {{selectedResume.status == 'accepted' ? 'Баталгаажсан' : 'Төлөв өөрчлөх'}}</el-button>			
              <el-button class="animated fadeInRight" plain size="small" @click="print"><i class="mdi mdi-download"></i> Татах</el-button>		
            </div>

            <div class="invoice bg-white black-text" id="print">		
              <div class="invoice-top">
                <div class="logo">
                  <img src="@/assets/images/logo_blck.png" alt="logo">
                </div>
                <div class="info">
                  <h2>itwizard.mn</h2>
                  <p>admin@itwizard.mn<br>+976 7511-0023</p>
                </div><!--End Info-->
                <div class="title" align="right">
                  <h1>RESUME</h1>
                  <p>{{new Date().toLocaleString()}}</p>
                </div>
              </div>

              <hr>			

              <div class="invoice-middle" v-if="selectedResume">
                <div class="info">
                  <h2>{{selectedResume.firstname}} {{selectedResume.lastname}}</h2>
                  <p>{{selectedResume.register}}<br> {{selectedResume.email}}<br>{{selectedResume.phone}}</p>
                </div>

                <div class="project" align="right">
                  <h2>Гэрийн хаяг</h2>
                  <p>{{selectedResume.address}}</p>
                </div>   
              </div>

              <div class="invoice-bottom">
                <div class="invoice-bottom-title">Гэр бүлийн байдал</div>
                <table>
                  <thead>
                    <tr>
                      <th>Таны хэн болох</th>
                      <th>Нэр</th>
                      <th>Мэргэжил/Ажлын байр</th>
                      <th>Төрсөн огноо</th>
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.family)" :key="index">
                      <td>{{item.role}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.birthdate.substr(0, 10)}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="invoice-bottom-title">Боловсролын талаарх мэдээлэл</div>
                <table>
                  <thead>
                    <tr>
                      <th>Сургуулийн нэр</th>
                      <th>Эзэмшсэн мэргэжил</th>
                      <th>Элссэн огноо</th>
                      <th>Төгссөн огноо</th>
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.edu)" :key="index">
                      <td>{{item.school}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.inYear.substr(0, 10)}}</td>
                      <td>{{item.outYear.substr(0, 10)}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="invoice-bottom-title">Гадаад хэлний мэдээлэл</div>
                <table>
                  <thead>
                    <tr>
                      <th>Гадаад хэл</th>
                      <th>Түвшин</th>
                      <th>Судалсан жил</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.lang)" :key="index">
                      <td>{{item.language}}</td>
                      <td><el-progress :percentage="item.percent" class="themed"></el-progress></td>
                      <td>{{item.year}}</td>
                    </tr>
                  </tbody>
                </table>
                <h5 style="page-break-before: always;"></h5>
                <div class="invoice-bottom-title page-break">Ажлын туршлага</div>
                <table>
                  <thead>
                    <tr>
                      <th>Байгууллага</th>
                      <th>Албан тушаал</th>
                      <th>Орсон огноо</th>                      
                      <th>Гарсан огноо</th>                      
                      <th>Шалтгаан</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.experience)" :key="index">
                      <td>{{item.company}}</td>
                      <td>{{item.profession}}</td>
                      <td>{{item.inYear.substr(0, 10)}}</td>
                      <td>{{item.outYear.substr(0, 10)}}</td>
                      <td>{{item.outReason}}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="invoice-bottom-title">Ур чадвар</div>
                <table>
                  <thead>
                    <tr>
                      <th>Программын нэр</th>
                      <th>Түвшин</th>
                      <th>Судалсан жил</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr v-for="(item, index) in JSON.parse(selectedResume.skill)" :key="index">
                      <td>{{item.programm}}</td>
                      <td><el-progress :percentage="item.level" class="themed"></el-progress></td>
                      <td>{{item.year}}</td>
                    </tr>
                  </tbody>
                </table>    
                <div class="invoice-bottom-title">Давуу/Сул талууд</div>
                <table>
                  <thead>
                    <tr>
                      <th>Давуу тал</th>
                      <th>Сул тал</th>                      
                    </tr>
                  </thead>
                  <tbody v-if="selectedResume">
                    <tr>
                      <td width="50%" v-html="JSON.parse(selectedResume.personal).advantage"></td>
                      <td width="50%" v-html="JSON.parse(selectedResume.personal).disadvantage"></td>
                    </tr>
                  </tbody>
                </table>              
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="Баталгаажуулах цонх" :visible.sync="dialog.confirm" width="30%" center>
        <div style="display: flex; align-items: center; gap: 10px; flex-direction: column;">
          <el-select v-model="change.status" filterable placeholder="Төлөв" @change="statusChanged" style="width: 70%;">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="change.team" filterable placeholder="Баг" style="width: 70%;" :disabled="disabled.confirmSelects">
            <el-option
              v-for="item in teams"
              :key="item.seq"
              :label="item.team_name.toUpperCase()"
              :value="item.seq">
            </el-option>
          </el-select>
          <el-select v-model="change.profession" filterable placeholder="Ажлын байр" style="width: 70%;" :disabled="disabled.confirmSelects">
            <el-option
              v-for="item in professions"
              :key="item.seq"
              :label="item.pro_name.toUpperCase()"
              :value="item.seq">
            </el-option>
          </el-select>
          <el-select v-model="change.levels" filterable placeholder="Түвшин" style="width: 70%;" :disabled="disabled.confirmSelects">
            <el-option
              v-for="item in levels"
              :key="'level' + item"
              :label="item.toUpperCase()"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.confirm = false">Болих</el-button>
          <el-button type="primary" :loading="loading.change" @click="submitResume">Үргэлжлүүлэх</el-button>
        </span>
      </el-dialog>
    </div>
	</div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
export default {
  components: {
    VueHtml2pdf
  },
	name: 'Resume',
	data () {
		return {
      dialog: {
        resume: false,
        confirm: false
      },
			property: [],
      selectedResume: null,
      teams: [],
      statusList: [{label: 'Зөвшөөрсөн', value: 'accepted'}, {label: 'Татгалзсан', value: 'returned'}],
      levels: ['Trainee', 'Junior', 'Mid Level', 'Senior'],
      change: {
        status: '',
        team: '',
        profession: '',
        levels: ''
      },
      professions: [],
      disabled: {
        confirmSelects: false
      },
      loading : {
        change: false
      }
		}
	},
  created() {
    this.getResumes();
    this.getTeams();
    this.getProfession();
  },
	mounted() {},
	methods: {
    submitResume() {
      if (this.change.status != '') {
        if (this.change.status == 'returned') {
          this.updateCareerStatus();
        } else {
          if (this.change.team != '' && this.change.profession != '' && this.change.levels) {
            this.updateCareerStatus();
          }
        }
      }
    },
    updateCareerStatus() {
      this.loading.change = true;
      this.$axios({
          method: 'post',
          url: '/a1/update-status-resume',
          data: {
            change: this.change,
            resume: this.selectedResume
          }
      }).then(() => {
        this.loading.change = false;
        this.selectedResume.status = this.change.status;
        this.dialog.confirm = false;
      }).catch(err => {
        this.loading.change = false;
        console.log(err);
      });
    },
    statusChanged() {
      this.disabled.confirmSelects = this.change.status == 'returned' ?  true : false;
    },
    getProfession() {
      this.$axios({
          method: 'get',
          url: '/v1/employee/get-professions',
          headers: {},
      }).then(data => {
        if (data.data.message === 'Success') {
          this.professions = data.data.data;
        }
      });
    },
    getTeams() {
      this.$axios({
          method: 'get',
          url: '/v1/team/list',
          headers: {},
      }).then(data => {
        if (data.data.message === 'Success') {
          this.teams = data.data.data;
        }
      });
    },
    changeStatus() {
      this.dialog.resume = false;
      this.dialog.confirm = true;
    },
    print() {
      this.dialog.resume = false;
      this.$refs.html2Pdf.generatePdf();
		},
    getResumes() {
      this.$axios({
        method: 'post',
        url: '/a1/project/get-list',
        data: {
          cont: "CAREER"
        }
      }).then(data => {
        this.property = data.data.data;
      }).catch(err => {
        console.log(err);
      });
    },
    showProperty(property) {      
      this.selectedResume = property;
      console.log(this.selectedResume.personal, this.selectedResume);

      this.dialog.resume = true;
    }
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';
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


