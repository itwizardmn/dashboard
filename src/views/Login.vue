<template>
	<div class="login-page flex">
		<div class="box grow scrollable align-vertical side-box box-right">
			<div class="align-vertical-middle wrapper">
				
				<form class="form-box" @submit.prevent="Login">
					<h2>НЭВТРЭХ</h2>
					
					<float-label class="styled">
						<input type="username" name="username" placeholder="Хэрэглэгчийн нэр" v-model="user_id">
					</float-label>
					<float-label class="styled">
						<input type="password" name="password" placeholder="Нууц үг" v-model="password">
					</float-label>
					<div class="flex text-center center pt-30 pb-10">			
						<el-button plain native.type="submit" size="small" native-type="submit" class="login-btn pulse animated themed">
							ҮРГЭЛЖЛҮҮЛЭХ
						</el-button>
					</div>

				</form>
			</div>
			
		</div>

	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			user_id: '',
			password: ''
		}
	},
	methods: {
    Login() {
      if (this.user_id != '' && this.password != '') {
        this.$axios({
            method: 'post',
            url: '/a1/login',
            data: {
              user_id: this.user_id,
              password: this.password
            }
          }).then(data => {
            localStorage.setItem('user', JSON.stringify(data.data.data));
            localStorage.setItem('token', data.data.data.token);
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + data.data.data.token;
            this.$notify({
              title: 'Амжилттай',
              message: 'Системд нэвтэрлээ',
            });

            this.$router.push('/');
          }).catch(err => {
            this.loading = false;
            if (err.request.status === 401) {
              this.$notify({
                title: 'Амжилтгүй',
                message: 'ID эсвэл нууц үг буруу',
              });
            }
          });
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';

@media (max-width: 720px) {
  .wrapper {
    height: 100vh;
  }
}

.login-page {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 !important;

	.side-box {
		.wrapper {
			width: 100%;
			box-sizing: border-box;
			padding: 20px;
		}
	}

	.box-left {
		background-image: url('../assets/images/login2.jpg');
		background-size: cover;
		background-position: 50% 50%;

		.wrapper {
			.image-logo {
				width: 90%;
				max-width: 100px;
				margin-top: 20px;
			}

		}
	}
	.box-right {
		background: white;
		color: var(--background-color);
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;
		//background: transparent;

		a {
			font-size: 14px;
			color: var(--color-accent);
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 70px;
			display: block;
		}

		.login-btn {
			background: rgba(var(--color-accent-rgb), .2);
			color: var( --text-color);
			border-color: var(--text-color);
			border-width: 2px;
			font-weight: bold;
			border-radius: 0;

			&:hover {
				background: rgba(var(--color-accent-rgb), 1);
				border-color: var(--text-color);
				color: var( --text-color);
			}
		}
	}
}

@media (max-width: 1200px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 50px;
			}
		}
	}
}
}
@media (max-width: 900px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 30px;
			}
		}
	}
}
}
@media (max-width: 768px) {
.login-page {
	display: block;
	overflow: auto;
	
	.side-box {
		display: block;
	}
}
}
</style>
