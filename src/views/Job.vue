<template>
	<div class="scrollable page-ecommerce-dashboard">
		<div class="mt-10 unprinter">
			<div>
        <router-link to="/add-career"><el-button type="primary" plain class="addProperty" size="mini">Hэмэх</el-button></router-link>
      </div>
			<table class="table-box card-base card-outline styled striped hover">
				<thead>
					<tr>
						<th>Гарчиг</th>
            <th>Үүсгэсэн огноо</th>
						<th>Хэл</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in ads" :key="index">
						<td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.title}}</h5>
							</div>
						</td>
            <td>
							<div class="item-box item-customer">
								<h5 class="m-0 o-070">{{item.created_at.substr(0, 10)}}</h5>
							</div>
						</td>
						<td>
							<div class="item-box item-customer">
								<el-tag size="mini" :type="item.lang == 'MN' ? 'info' : 'warning'">{{item.lang}}</el-tag>
							</div>
						</td>
						<td align="right">
              <el-button @click="$router.push({name: 'edit-career', params: { id: item.seq } })" type="primary" plain icon="el-icon-edit" size="mini"></el-button>
							<el-popover
								placement="top-end"
								width="160"
								v-model="item.confirm">
								<p>Итгэлтэй байна уу?</p>
								<div style="text-align: right; margin: 0;">
									<el-button size="mini" type="text" @click="item.confirm = false">Үгүй</el-button>
									<el-button type="primary" size="mini" @click="deleteCareer(item)">Тийм</el-button>
								</div>
								<el-button type="danger" slot="reference" plain icon="el-icon-delete" size="mini" style="margin-left: 10px;"></el-button>
							</el-popover>
						</td>
					</tr>
				</tbody>
			</table>
    </div>
	</div>
</template>

<script>
export default {
	name: 'Teams',
	data () {
		return {
      teams: [],
			dialog: {
				addPro: false
			},
      ads: []
		}
	},
  created() {
    this.getCareers();
  },
	mounted() {},
	methods: {
    getCareers() {
      this.$axios({
        method: 'POST',
        url: '/v1/team/get-career',
        data: {}
      }).then((data) => {
        this.ads = data.data.data;
      });
    },
    deleteCareer(item) {
      this.$axios({
        method: 'PUT',
        url: '/a1/team/delete-career',
        data: {
          seq: item.seq
        }
      }).then(() => {
        this.$notify({
          title: 'Амжилттай',
          message: 'Устгагдлаа',
        });
        
        this.ads.forEach((elm, index) => {
          elm.seq === item.seq ? this.ads.splice(index, 1) : null;
        });
      });
    }
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';
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


