<template>
  <div class="page-quill scrollable">
      <div>
        <el-button type="success" style="margin-left: 10px;" @click="saveCareer" plain class="addProperty" size="medium">Хадгалах</el-button>
        <router-link to="/blog"><el-button plain class="addProperty" size="medium">Буцах</el-button></router-link>
      </div>
        <el-form :model="career" :rules="regx" ref="form">
          <h5>Үндсэн</h5>
          <div class="card-base card-outline shadow p-30" style="padding-top: 50px;"> 
            <el-row :gutter="20">
              <el-col :sm="24" :md="12">
                <el-form-item prop="title">
                  <el-input placeholder="Гарчиг" v-model="career.title" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="8">
                <el-select v-model="career.contentType" placeholder="Контентын төрөл" style="width: 100%;">
                  <el-option
                    v-for="item in conType"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="4">
                <el-checkbox v-model="career.isVisible" :label="career.isVisible ? 'Харагдана' : 'Харагдахгүй'"  border></el-checkbox>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :sm="24" :md="8">
                <div class="thumbnanil-container" @click="addThumbnail" ref="thumbnailContainer">
                  <input type="file" ref="upload_thumbnail" hidden @change="changePhoto">
                  <div class="selected">
                    {{career.thumbnail.name === '' ? 'Зургаа оруулна уу...' : career.thumbnail.name}}
                  </div>
                  <div class="clear" v-if="career.thumbnail.name !== ''">
                    <i class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :sm="24" :md="8">
                <el-input placeholder="Бичлэг (Заавал биш)" v-model="career.url" clearable></el-input>
              </el-col>
              <el-col :sm="24" :md="8">
                <el-select v-model="career.lang" placeholder="Хэлний сонголт" style="width: 100%;">
                  <el-option
                    v-for="item in language"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20">
            <el-col :span="24">
              <h5>Контент</h5>
              <div class="card-base card-shadow--medium" style="min-height: 300px;">
                <quill-editor v-model="requirement" style="width: 100%;"
                  ref="requirementEditor"
                  :options="editorOption1">
                </quill-editor>
              </div>
            </el-col>
          </el-row>
      </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      career: {
        title: '',
        isVisible: true,
        url: '',
        thumbnail: {
          name: ''
        },
        content: '',
        contentType: 1,
        lang: 'MN'
      },
      language: [{value: 'MN', text: 'Монгол'}, {value: 'KR', text: 'Korean'}],
      conType: [
        {
          value: 1,
          text: 'Блог'
        },
        {
          value: 2,
          text: 'Мэдээ мэдээлэл'
        },
        {
          value: 3,
          text: 'Ярилцлага'
        }
      ],
      editorOption1: {
				theme: 'snow',
        modules: {
					toolbar: [
						['bold', 'italic', 'underline'],
            [{ 'list': 'bullet' }]
					]
				}
			},
      requirement: '',
      role: '',
      about: '',
      regx: {
        title: [{required: true, message: 'Гарчиг' }],
      }
    }
  },
  methods: {
    addThumbnail(event) {
      if ( event.target.tagName === 'I') {
        this.$refs.upload_thumbnail.value = '';
        this.career.thumbnail = { name: '' };
      } else {
        this.$refs.upload_thumbnail.click();
      }
    },
    changePhoto(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      this.career.thumbnail = file;
      const elm = this.$refs.thumbnailContainer;
      elm.style.border = '1px solid #DCDFE6';
    },
    saveCareer() {
      const el = this.$refs.requirementEditor.$el;
      if (el) {
        const cont = el.querySelector('.ql-editor');
        this.career.content = cont.innerHTML;
      }
      
      this.$refs.form.validate((valid) => {
        if (valid) {

          if (!this.career.thumbnail.size) {
            const elm = this.$refs.thumbnailContainer;
            elm.style.border = '1px solid red';
            return;
          }

          const fd = new FormData();
          fd.append('file', this.career.thumbnail, this.career.thumbnail.name);
          fd.append('title', this.career.title);
          fd.append('content', this.career.content);
          fd.append('isVisible', this.career.isVisible);
          fd.append('url', this.career.url);
          fd.append('contentType', this.career.contentType);
          fd.append('lang', this.career.lang);

          this.$axios.post(
            '/a1/blog/insert',
            fd
          ).then(() => {
            this.$notify({
              title: 'Амжилттай',
              message: 'Бүртгэгдлээ',
            });
            this.$router.push('/blog');
          }).catch(err => {
            console.log(err);
          });
        }
      });
    },
    onEditorReady(quill) {
			let container = quill.container.querySelector('.ql-editor');
      container.innerHTML = '<ul></ul>';
		}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.el-input__inner {
  font-size: 13px !important;
  font-family: 'Exo 2', sans-serif;
}

.thumbnanil-container {
  width: 100%;
  cursor: pointer;
  height: 38px;
  border-radius: 5px;
  border: 1px solid #DCDFE6;
  font-size: 13px;
  position: relative;
  @include mobile {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .selected {
    position: absolute;
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
  }

  .clear {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
  }
}
.page-quill {
  display: flex;
  flex-direction: column;
	.card-base {
		box-sizing: border-box;

		.quill-editor {
			.ql-toolbar.ql-snow {
				border: none;
				background: lighten($background-color, 2%);
				border-bottom: 1px solid $background-color;
			}
			.ql-container.ql-snow {
				border: none;
			}
		}

		&.t-bubble {
			overflow: inherit;
		}
	}
}

@media (max-width: 768px) {
	.page-quill {
		.card-base {
			&.t-bubble {
				padding: 40px 20px;
			}
		}
	}
}
</style>