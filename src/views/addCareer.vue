<template>
  <div class="page-quill scrollable">
      <div>
        <el-button type="success" style="margin-left: 10px;" @click="saveCareer" plain class="addProperty" size="medium">Hэмэх</el-button>
        <router-link to="/career"><el-button plain class="addProperty" size="medium">Буцах</el-button></router-link>
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
              <el-col :sm="24" :md="12">
                <el-form-item prop="jobType">
                  <el-select v-model="career.jobType" placeholder="Төрөл" style="width: 100%;">
                    <el-option
                      v-for="(item, index) in workType"
                      :key="item + index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="24" :md="8">
                <el-form-item prop="level">
                  <el-select v-model="career.level" placeholder="Түвшин" style="width: 100%;">
                    <el-option
                      v-for="(item, index) in levels"
                      :key="item + index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="8">
                <el-form-item prop="salary">
                  <el-input placeholder="Цалин" v-model="career.salary" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="8">
                <el-form-item>
                  <el-select v-model="career.lang" placeholder="Хэлний сонголт" style="width: 100%;">
                    <el-option
                      v-for="(item, index) in language"
                      :key="item.value + index"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20">
            <el-col :span="24">
              <h5>Тавигдах шаардлага</h5>
              <div class="card-base card-shadow--medium" style="min-height: 300px;">
                <quill-editor v-model="requirement" style="width: 100%;"
                  ref="requirementEditor"
                  :options="editorOption1"
                  @ready="onEditorReady($event)">
                </quill-editor>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <h5>Гүйцэтгэх үүрэг</h5>
              <div class="card-base card-shadow--medium" style="min-height: 300px;">
                <quill-editor v-model="role" style="width: 100%;"
                  ref="roleEditor"
                  :options="editorOption1"
                  @ready="onEditorReady($event)">
                </quill-editor>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <h5>Нэмэлт мэдээлэл</h5>
              <div class="card-base card-shadow--medium" style="min-height: 300px;">
                <quill-editor v-model="about" style="width: 100%;"
                  ref="aboutEditor"
                  :options="editorOption1"
                  @ready="onEditorReady($event)">
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
        jobType: '',
        level: '',
        salary: '',
        requirement: null,
        role: null,
        about: null,
        lang: 'MN'
      },
      language: [{
        value: 'MN',
        text: 'Монгол'
      }, {
        value: 'KR',
        text: 'Солонгос'
      }],
      // workType: ['Бүтэн цагийн', 'Хагас цагийн', 'Зайнаас ажиллах'],
      // levels: {
      //   KR: [],
      //   MN: ['Мэргэжилтэн', 'Мэргэжил хамаарахгүй', 'Оюутан/Дадлага/']
      // },
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
        jobType: [{required: true, message: 'Төрөл' }],
        level: [{required: true, message: 'Түвшин' }],
        salary: [{required: true, message: 'Цалин' }]
      }
    }
  },
  computed: {
    levels () {
      if (!this.career.lang || this.career.lang === 'MN') {
        return ['Мэргэжилтэн', 'Мэргэжил хамаарахгүй', 'Оюутан/Дадлага/'];
      }

      return ['전문가', '전공 무관', '대학생/ 실습'];
    },
    workType () {
      if (!this.career.lang || this.career.lang === 'MN') {
        return ['Бүтэн цагийн', 'Хагас цагийн', 'Зайнаас ажиллах'];
      }

      return ['풀타임', '파트 타임', '재택근무'];
    }
  },
  methods: {
    saveCareer() {
      const el = this.$refs.requirementEditor.$el;
      const el1 = this.$refs.roleEditor.$el;
      const el2 = this.$refs.aboutEditor.$el;
      if (el) {
        const ul = el.querySelector('.ql-editor ul');
        if (ul) {
          this.career.requirement = ul.outerHTML;
        }
      }

      if (el1) {
        const ul = el1.querySelector('.ql-editor ul');
        if (ul) {
          this.career.role = ul.outerHTML;
        }
      }

      if (el2) {
        const ul = el2.querySelector('.ql-editor ul');
        if (ul) {
          this.career.about = ul.outerHTML;
        }
      }
      
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/a1/team/add-career',
            data: {
              career: this.career
            }
          }).then(() => {
            this.$notify({
              title: 'Амжилттай',
              message: 'Бүртгэгдлээ',
            });
            this.$router.push('/career');
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

<style lang="scss">
@import '../assets/scss/_variables';

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