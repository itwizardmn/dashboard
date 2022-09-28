<template>
	<div class="page-ecommerce-products flex" v-loading="pageLoading">
		<div class="list-container box grow flex column">
      <div>
        <el-button type="primary" plain class="addProperty" size="mini" @click="dialog.addProperty = true">Бүтээгдэхүүн нэмэх</el-button>
      </div>
			<div class="list scrollable only-y box grow">
				<div v-for="i in projectFilter" :key="i.seq" class="item" @click="getDetail(i)">
					<div class="wrapper card-shadow--medium">
						<div class="image">
              <img :src="$imgUrl + i.file_seq" alt="" style="width: 100%; height: 100%; object-fit: cover;" @error="replaceByDefault">
						</div>
						<div class="detail p-20">
							<div class="name">
								{{i.project_name}}
							</div>
							<div class="desc">
								{{getTeamName(i.team_seq)}}
							</div>
							<div class="price">
								<p>{{i.project_type}}</p>
							</div>							
						</div>
					</div>
				</div>
			</div>
      <el-pagination class="p-20" @current-change="chnagePaginate" :current-page="pagination.current" style="margin: auto;" :page-size="pagination.size" background layout="prev, pager, next" :total="projects.length"> </el-pagination>
		</div>

    <el-dialog title="Бүтээгдэхүүн" :visible.sync="dialog.detail" @close="disable.project = true">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12">
          <div class="img-container" v-bind:class="{'disabled' : disable.project}">
            <img :src="$imgUrl + selectedProject.file_seq" alt="" style="width: 100%; height: 100%; object-fit: cover;" @error="replaceByDefault">
            <div class="change-avatar" @click="$refs.avatar_upload.click()">
              <input type="file" ref="avatar_upload" hidden @change="changePhoto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/></svg>
            </div>
          </div>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-input placeholder="Бүтээгдэхүүний нэр" v-model="selectedProject.project_name" clearable :disabled="disable.project"> </el-input>
          <el-select v-model="selectedProject.team_seq" placeholder="Баг"  class="mt-10" style="width: 100%;" :disabled="disable.project">
            <el-option
              v-for="item in teams"
              :key="item.seq"
              :label="item.team_name"
              :value="item.seq">
            </el-option>
          </el-select>
          <el-select v-model="selectedProject.project_type" placeholder="Төрөл"  class="mt-10" style="width: 100%;" :disabled="disable.project">
            <el-option
              v-for="(item, index) in projectType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input placeholder="URL" class="mt-10" v-model="selectedProject.related_url" clearable :disabled="disable.project"> </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="disable.project" @click="disable.project = false">Засах</el-button>
        <el-button type="primary" v-else @click="updateProperty">Хадгалах</el-button>
        <el-button type="danger" @click="deleteProperty">Устгах</el-button>
      </span>
    </el-dialog>


    <el-dialog title="Бүтээгдэхүүн нэмэх" :visible.sync="dialog.addProperty">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12">
          <div class="img-container">
            <img :src="$imgUrl + selectedProject.file_seq" alt="" id="newProductImage" style="width: 100%; height: 100%; object-fit: cover;" @error="replaceByDefault">
            <div class="change-avatar" @click="$refs.new_file_upload.click()">
              <input type="file" ref="new_file_upload" hidden @change="photoChanged">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/></svg>
            </div>
          </div>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-input placeholder="Бүтээгдэхүүний нэр" v-model="addProject.projectName" clearable> </el-input>
          <el-select v-model="addProject.teamSeq" placeholder="Баг"  class="mt-10" style="width: 100%;">
            <el-option
              v-for="item in teams"
              :key="item.seq"
              :label="item.team_name"
              :value="item.seq">
            </el-option>
          </el-select>
          <el-select v-model="addProject.projectType" placeholder="Төрөл"  class="mt-10" style="width: 100%;">
            <el-option
              v-for="(item, index) in projectType"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input placeholder="URL" class="mt-10" v-model="addProject.relatedUrl" clearable> </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.addProperty = false">Болих</el-button>        
        <el-button type="danger" @click="saveProperty" :loading="loading.addProject">Хадгалах</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
export default {
	name: 'Products',
	data () {
		return {
      disable: {
        project: true
      },
      dialog: {
        detail: false,
        addProperty: false
      },
      projectType: ['WEB', 'APP'],
      projects: [],
      teams: [],
      addProject: {
        projectName   : '',
        projectType   : '',
        relatedUrl    : '',
        teamSeq       : '',
        selectedFile  : ''
      },
      selectedProject: {
        seq: null,
        file_seq: null
      },
      pagination: {
        current: 1,
        size: 20
      },
      selectedFile: '',
      pageLoading: false,
      loading: {
        addProject: false
      }
		}
	},
	computed: {
    projectFilter() {
      let arr = [];
      const min = this.pagination.current - 1;
      this.projects.forEach((elem, index) => {
        index >= min * this.pagination.size && index < this.pagination.current * this.pagination.size ? arr.push(elem) : null;
      });

      return arr;
    }
  },
	methods: {
    deleteProperty() {
      this.$confirm('Итгэлтэй байна уу?', 'Устгах', {
        confirmButtonText: 'Тийм',
        cancelButtonText: 'Үгүй',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/a1/project/delete',
          data: {
            seq: this.selectedProject.seq,
            file_seq: this.selectedProject.file_seq
          }
        }).then(() => {
          this.projects.forEach((elm, idx) => {
            elm.seq === this.selectedProject.seq ? this.projects.splice(idx, 1) : null;
          });

          this.dialog.detail = false;
        });
      });
    },
    saveProperty() {
      const fd = new FormData();
      fd.append('file', this.addProject.selectedFile, this.addProject.selectedFile.name);
      fd.append('projectName', this.addProject.projectName);
      fd.append('projectType', this.addProject.projectType);
      fd.append('relatedUrl', this.addProject.relatedUrl);
      fd.append('teamSeq', this.addProject.teamSeq);
      this.loading.addProject = true;
      this.$axios.post(
        '/a1/project/insert',
        fd
      ).then(() => {
        this.$refs.new_file_upload.value = '';
        this.getProjects();
        this.addProject = {projectName   : '',projectType   : '',relatedUrl    : '',teamSeq       : '',selectedFile  : ''};
        this.loading.addProject = false;
        this.dialog.addProperty = false;
      }).catch(err => {
        console.log(err);
        this.loading.addProject = false;
      });
    },
    updateProperty() {
      this.$axios({
          method: 'post',
          url: '/a1/project/update-property',
          data: {
            property: this.selectedProject
          }
      }).then(() => {
        this.getProjects();
        this.dialog.detail = false;
      });
    },
    replaceByDefault(e) {
      e.currentTarget.src = require('@/assets/images/noproduct.png');
    },
    photoChanged(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      this.addProject.selectedFile = file;
      

      if (FileReader && file) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('newProductImage').src = fr.result;
        }
        fr.readAsDataURL(file);
      }
    },
    changePhoto(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.selectedFile = file;
      this.pageLoading = true;
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      fd.append('data', JSON.stringify({seq: this.selectedProject.seq, file_seq: this.selectedProject.file_seq}));
      this.$axios.post(
        '/a1/project/update-photo',
        fd
      ).then(data => {
        this.selectedProject.file_seq = data.data.data;        
        this.getProjects();
        this.pageLoading = false;
        event.target.value = '';
      }).catch(err => {
        console.log(err);
        this.pageLoading = false;
      });
    },
    getDetail(property) {
      this.selectedProject = {...property};
      this.dialog.detail = true;
    },
    chnagePaginate(event) {
      this.pagination.current = event;
    },
    getTeamName(seq) {
      let name = '';
      this.teams.forEach(element => {
        element.seq === seq ? name = element.team_name : null; 
      });

      return name.toUpperCase();
    },
    getProjects() {
      this.pageLoading = true;
      this.$axios({
          method: 'get',
          url: '/v1/project/list',  
          headers: {},
      }).then(data => {
        this.pageLoading = false;
        if (data.data.message === 'Success') {
          this.projects = data.data.data;
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
    }
	},
	created() {
		this.getProjects();
    this.getTeams();
	},
	mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.addProperty {
  width: 200px;
  margin-bottom: 20px;
  float: right !important;
  @include mobile {
    width: 100%;
  }
}
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

.img-container.disabled {
  cursor: no-drop;
  &:hover {
    .change-avatar { height: 0;}
  }
}

.page-ecommerce-products {
	.sidebar {
		width: 300px;
		margin-right: 20px;
		margin-right: 10px;
		margin-left: -10px;

		.scroller {
			padding: 10px;
			padding-top: 0px;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}

		.widget {
			background: white;
			border-radius: 4px;
			margin-bottom: 20px;
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07), 0 3px 6px 0 rgba(0, 0, 0, 0.065);
			overflow: hidden;

			&.close-filter-box {
				display: none;
				text-align: center;

				button {
					width: 100%;
					border: none;
					text-transform: uppercase;
					outline: none;
					font-family: inherit;
					font-weight: bold;
					padding: 5px 0px;
					border-bottom: 2px solid;
					background: white;
					color: $text-color-accent;
					cursor: pointer;
				}
			}

			&.select-color {
				ul, li {
					padding: 0;
					list-style: none;
					margin: 0;
				}

				li {
					margin-bottom: 10px;
				}

				.color-box {
					background: transparent;
					width: 12px;
					height: 12px;
					display: inline-block;
					margin-right: 10px;
				}
			}

			.title {
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				padding: 15px 20px;
			}
			.content {
				padding: 15px 20px;
			}
		}
	}

	.toggle-filter-box {
		padding: 10px;
		padding-top: 0px;
		text-align: right;
		display: none;

		button {
			border: none;
			text-transform: uppercase;
			outline: none;
			font-family: inherit;
			font-weight: bold;
			padding: 1px 2px;
			border-bottom: 2px solid;
			color: $text-color-accent;
			background: transparent;
			cursor: pointer;
		}
	}

	.list {
		.item {
			display: block;
			width: 20%;
			padding: 0 10px;
			padding-bottom: 20px;
			box-sizing: border-box;
			float: left;

			.wrapper {
				box-sizing: border-box;
				height: 100%;
				position: relative;
				cursor: pointer;
				transition: all .25s;

				.image {
					box-sizing: border-box;
					height: 150px;
					width: 100%;
					background-color: white;	
					padding-bottom: 10px;		

					.bg {
						background-color: white;			
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center center;
						width: 100%;
						height: 100%;
					}
				}

				.detail {
					padding-top: 10px;

					.rate {
						margin-top: 10px; 

						& > div {
							margin: 0 auto;
							display: block;
							width: 120px;
						}
					}

					.name {
						text-transform: uppercase;
						font-weight: bold;
						text-align: center;
						padding: 10px;
						padding-bottom: 5px;
            white-space: nowrap;
            width: 70%;
            overflow: hidden;
            margin: auto;
            text-overflow: ellipsis;
					}

					.desc {
						text-align: center;
						font-size: 14px;
						opacity: .5;
            white-space: nowrap;
					}

					.price {
						text-align: center;
						font-weight: bold;
						font-size: 13px;
						// padding: 10px;
						// color: $text-color-accent;
            p {
              background: #000;
              width: auto;
              display: inline-block;
              padding: 4px 8px;
              color: #fff;
            }
					}
				}

				.buttons {
					position: absolute;
					left: 20px;
					bottom: 20px;
					right: 20px; 

					button {
						background: white;
						color: $text-color;
						border: none;
						text-transform: uppercase;
						outline: none;
						font-family: inherit;
						font-weight: bold;
						padding: 3px 7px;
					}
				}

				&:hover {
					box-shadow: 0 8px 16px 0 rgba(40, 40, 90, 0.09), 0 3px 6px 0 rgba(0, 0, 0, 0.065), 0px 10px 0px 0px $text-color-accent;
				}
			}
		}
	}
}

@media (max-width: 1400px) {
	.page-ecommerce-products {

		.list {
			.item {
				width: 25%;
			}
		}
	}
}


@media (max-width: 1100px) {
	.page-ecommerce-products {

		.list {
			.item {
				width: 50%;
			}
		}
	}
}



@media (max-width: 900px) {
	.page-ecommerce-products {

		.sidebar {
			width: 200px;
		}

	}
}

@media (max-width: 768px) {
	.page-ecommerce-products {

		.sidebar {
			width: 230px;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: 0;
			z-index: 999;
			transform: translateX(-100%);
			transition: all .25s;
			background: white;

			.scroller {				
				padding: 15px;
				padding-top: 20px;
			}

			.widget {
				&.close-filter-box {
					display: block;
				}
			}

			&.open {
				transform: translateX(0%);
				box-shadow: 3px 0px 10px -3px rgba(0, 0, 0, 0.4);
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
			}
		}

		.toggle-filter-box {
			display: block;
		}

	}
}

@media (max-width: 480px) {
	.page-ecommerce-products {

		.list {
			.item {
				width: 100%;
			}
		}
	}
}

</style>


