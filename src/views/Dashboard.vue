<template>
	<div class="page-ecommerce-dashboard scrollable">

		<resize-observer @notify="__resizeHanlder" />

		<div class="card-base card-alt">
			<el-row :gutter="30" style="display:flex;justify-content:center;flex-direction:row;align-items:center;">
				<el-col :sm="24" :md="16">
					<el-col :span="24">
						<div>
							<div id="pie" :style="{height:'700px',width:'100%'}"></div>
						</div>
					</el-col>
				</el-col>
				<el-col :sm="24" :md="8">
					<el-col :span="24">
						<div class="widget p-20">
							<div class="text-uppercase text-right flex">
								<div class="box grow">
									<h3 class="m-0 splitWord">{{dashHeader.admins}} people</h3>
									<p class="m-0 splitWord">Administrator</p>
								</div>
								<div class="icon-box ph-15 accent-text">
									<i class="mdi mdi-currency-usd"></i>
								</div>
							</div>
							<div class="progress-box mt-10">
								<el-progress v-if="dashHeader.admins > 0" :percentage="parseInt(dashHeader.admins / employee.length * 100)" class="themed"></el-progress>
								<el-progress v-else :percentage="0" class="themed"></el-progress>
							</div>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="widget p-20">
							<div class="text-uppercase text-right flex">
								<div class="box grow">
									<h3 class="m-0 splitWord">{{dashHeader.teamLeader}} people</h3>
									<p class="m-0 splitWord">Team leader</p>
								</div>
								<div class="icon-box ph-15 accent-text">
									<i class="mdi mdi-account-tie"></i>
								</div>
							</div>
							<div class="progress-box mt-10">
								<el-progress v-if="dashHeader.teamLeader > 0" :percentage="parseInt(dashHeader.teamLeader / employee.length * 100)" class="themed"></el-progress>
								<el-progress v-else :percentage="0" class="themed"></el-progress>
							</div>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="widget p-20">
							<div class="text-uppercase text-right flex">
								<div class="box grow">
									<h3 class="m-0 splitWord">{{dashHeader.proManager}} people</h3>
									<p class="m-0 splitWord">Pro. Manager</p>
								</div>
								<div class="icon-box ph-15 accent-text">
									<i class="mdi mdi-account-key"></i>
								</div>
							</div>
							<div class="progress-box mt-10">
								<el-progress v-if="dashHeader.proManager > 0" :percentage="parseInt(dashHeader.proManager / employee.length * 100)" class="themed"></el-progress>
								<el-progress v-else :percentage="0" class="themed"></el-progress>
							</div>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="widget p-20">
							<div class="text-uppercase text-right flex">
								<div class="box grow">
									<h3 class="m-0 splitWord">{{dashHeader.developer}} people</h3>
									<p class="m-0 splitWord">Developer</p>
								</div>
								<div class="icon-box ph-15 accent-text">
									<i class="mdi mdi-account-group"></i>
								</div>
							</div>
							<div class="progress-box mt-10">
								<el-progress v-if="dashHeader.developer > 0" :percentage="parseInt(dashHeader.developer / employee.length * 100)" class="themed"></el-progress>
								<el-progress v-else :percentage="0" class="themed"></el-progress>
							</div>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="widget p-20">
							<div class="text-uppercase text-right flex">
								<div class="box grow">
									<h3 class="m-0 splitWord">{{dashHeader.generalStaff}} people</h3>
									<p class="m-0 splitWord">General staff</p>
								</div>
								<div class="icon-box ph-15 accent-text">
									<i class="mdi mdi-card-account-details"></i>
								</div>
							</div>
							<div class="progress-box mt-10">
								<el-progress v-if="dashHeader.generalStaff > 0" :percentage="parseInt(dashHeader.generalStaff / employee.length * 100)" class="themed"></el-progress>
								<el-progress v-else :percentage="0" class="themed"></el-progress>
							</div>
						</div>
					</el-col>
				</el-col>
			</el-row>
		</div>

		<div class="card-base card-shadow--medium bg-white black-text ph-5 p-0 pb-20 mt-20">
			<el-row>
				<el-col :span="24">
					<div>
						<div id="chart" :style="{height:'500px',width:'100%'}"></div>
					</div>
				</el-col>
			</el-row>
		</div>

		<!-- <vue-scroll class="table-box card-base card-outline mt-20">
			<div class="card-base card-shadow--medium bg-white black-text p-30">
				<p class="mt-0 mb-30">PERSONAL SKILLS INFORMATION</p>
				<div style="position: relative;">
					<bar-chart height="1000px" :data="barData" :max="this.employee.length"></bar-chart>
				</div>
			</div>
    </vue-scroll> -->
	
	</div>
</template>

<script>
import echarts from 'echarts'
import Chance from 'chance'
const chance = new Chance()

export default {
	name: 'Dashboard',
	data () {
		return {
			chart: null,
			pie: null,
			skillBar: [],
			gridData: [],
			employee: [],
			professions: [],
			dashHeader: {
				admins: 0,
				teamLeader: 0,
				proManager: 0,
				developer: 0,
				generalStaff: 0
			},
			levels: {
				Trainee: 0,
				Junior: 0,
				MidLevel: 0,
				Senior: 0
			},
			experience: {
				level1: 0,
				level2: 0,
				level3: 0,
				level4: 0,
				level5: 0,
				level6: 0
			}
		}
	},
	created() {
		this.getEmployees();
		this.getProfession();
		this.initGridData()
	},
	computed: {
		barData() {
			let arr = [];
			this.skillBar.forEach(elm => {
				arr.push([elm.title, elm.total]);
			});
			return arr;
		}
	},
	mounted() {
		window.addEventListener('resize', this.__resizeHanlder)
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}

		if (!this.pie) {
			return
		}
		
		window.removeEventListener('resize', this.__resizeHanlder)
		this.chart.dispose()
		this.pie.dispose()
		this.chart = null
		this.pie = null
	},
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
		setGroupData() {
			const dev = ['Вэб хөгжүүлэгч', 'Жава хөгжүүлэгч', 'Ахлах програмист'];

			let emp = 0;
			this.employee.forEach(elm => {
				dev.includes(elm.pro_name) ? emp++ : null;
			});

			const pManager = ['Төслийн менежер'];

			let pmanage = 0;
			this.employee.forEach(elm => {
				pManager.includes(elm.pro_name) ? pmanage++ : null;
			});

			const admin = ['Удирдлагын хэлтсийн дарга', 'Ерөнхий менежер', 'Хуулийн зөвлөх', 'Гүйцэтгэх захирал', 'Ерөнхий захирал', 'Программ хангамж хэлстийн дарга', 'Технологи судалгааны хэлтсийн дарга']


			let adm = 0;
			this.employee.forEach(elm => {
				admin.includes(elm.pro_name) ? adm++ : null;
			});
			

			let leader = 0;
			this.employee.forEach(elm => {
				elm.pro_name === 'Багийн ахлагч' ? leader++ : null;
			});

			let manger = 0;
			this.employee.forEach(elm => {
				elm.pro_name === 'Оффис менежер' ? manger++ : null;
				if (this.levels[elm.levels] || this.levels[elm.levels] === 0) {
					this.levels[elm.levels] = this.levels[elm.levels] + 1;
				}
				const year = this.getMinYear(elm.experience);

				if (year <= 2) {
					this.experience.level1+=1;
				} else if(year <= 4) {
					this.experience.level2+=1;
				} else if (year <= 6) {
					this.experience.level3+=1;
				} else if (year <= 8) {
					this.experience.level4+=1;
				} else if (year <= 10) {
					this.experience.level5+=1;
				} else if ( year > 10 ) {
					this.experience.level6+=1;
				}
			});
			
			this.dashHeader.admins = adm;
			this.dashHeader.generalStaff = manger;
			this.dashHeader.teamLeader = leader;
			this.dashHeader.developer = emp;
			this.dashHeader.proManager = pmanage;
		},
		async getProfession() {
			const data = await this.$useapi('POST', '/a1/project/get-list', { cont: 'PROFESSION'});
			if (data) {				
				this.professions = data.data.data;
			}
    },
		checkSkillNameExisted(skill) {
			let result = false;
			this.skillBar.forEach(elm => {
				elm.title === skill.toUpperCase() ? result = elm : null;
			});
			
			return result;
		},
		setEmployeeSkillBar() {
			const profs = ['Вэб хөгжүүлэгч', 'Жава хөгжүүлэгч', 'Ахлах програмист', 'Багийн ахлагч', 'Технологи судалгааны хэлтсийн дарга']
			this.employee.forEach(elm => {
				if (profs.includes(elm.pro_name) && elm.skill) {
					const obj = JSON.parse(elm.skill);
					obj.forEach(skill => {
						const res = this.checkSkillNameExisted(skill.programm);
						if (!res) {
							this.skillBar.push({ title: skill.programm.toUpperCase(), total: 1});
						} else {
							res.total = res.total + 1;
						}
					});
				}
			});			
		},
		async getEmployees() {
			const data = await this.$useapi('GET', '/v1/employee/employees');
			if (data) {
				this.employee = data.data.data;
				this.setGroupData();
				this.setEmployeeSkillBar();
				this.initChart();
				this.initPie();
			}
		},
		__resizeHanlder: _.throttle(function (e) {
			if (this.chart) {
				this.chart.resize()
			}
			if (this.pie) {
				this.pie.resize()
			}
		}, 700),
		initChart() {
			this.chart = echarts.init(document.getElementById('chart'))
			this.chart.setOption({
				//backgroundColor: '#394056',
				title: {
					top: 20,
					text: 'DEVELOPER EXPERIENCE',
					textStyle: { fontWeight: 'normal', fontSize: 16, fontFamily:'Nunito Sans' /*color: '#F1F1F3'*/ },
					left: '1%'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { lineStyle: { /*color: '#57617B'*/ } }
				},
				legend: {
					top: 40,
					icon: 'rect',
					itemWidth: 14,
					itemHeight: 5,
					itemGap: 13,
					data: ['개발자 평균 경력'],
					right: '4%',
					textStyle: { fontSize: 12, fontFamily:'Nunito Sans' /*color: '#F1F1F3'*/ }
				},
				grid: {
					top: 100,
					left: '-5px',
					right: '30px',
					bottom: '2%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					axisLine: { lineStyle: { /*color: '#57617B'*/ } },
					data: ['   1-2 years', '3-4 years', '5-6 years', '7-8 years', '9-10 years', '10+ years']
				}],
				yAxis: [{
					show: false,
					type: 'value',
					name: '(%)',
					axisTick: { show: false },
					axisLine: { lineStyle: { /*color: '#57617B'*/ } },
					axisLabel: {
						margin: 10,
						textStyle: { fontSize: 14 }
					},
					splitLine: { lineStyle: { color: '#eee' /*color: '#57617B'*/ } }
				}],
				series: [{
					name: '개발자 평균 경력',
					type: 'line',
					smooth: true,
					symbol: 'circle',
					symbolSize: 5,
					showSymbol: false,
					lineStyle: { normal: { width: 1 } },
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(19, 206, 102, 0.3)'
							}, {
								offset: 0.8,
								color: 'rgba(19, 206, 102, 0)'
							}], false),
							shadowColor: 'rgba(0, 0, 0, 0.1)',
							shadowBlur: 10
						}
					},
					itemStyle: {
						normal: {
							color: 'rgb(19, 206, 102)',
							borderColor: 'rgba(19, 206, 102, 0.27)',
							borderWidth: 12
						}
					},
					data: [this.experience.level1, this.experience.level2, this.experience.level3, this.experience.level4, this.experience.level5, this.experience.level6]
				}]
			})
		},
		initPie() {
			this.pie = echarts.init(document.getElementById('pie'))
			this.pie.setOption({
				title: {
					top: 20,
					text: 'EMPLOYEE STATUS',
					textStyle: { fontWeight: 'normal', fontSize: 16, fontFamily:'Nunito Sans' /*color: '#F1F1F3'*/ },
					left: '1%'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: [
					{
						name:'status',
						type:'pie',
						selectedMode: 'single',
						radius: [0, '35%'],

						label: {
							normal: {
								position: 'inner'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
							{value: this.dashHeader.admins, name:'ADMINISTRATOR', selected:true, itemStyle: { normal: { color: 'rgb(95, 143, 223)', } }},
							{value:this.dashHeader.teamLeader, name:'TEAM LEADER', itemStyle: { normal: { color: 'rgb(19, 206, 102)', } }},
							{value:this.dashHeader.proManager, name:'PROJECT MANAGER', itemStyle: { normal: { color: 'rgb(247, 186, 43)', } }},
							{value:this.dashHeader.developer, name:'DEVELOPER', itemStyle: { normal: { color: 'rgb(149, 163, 222)', } }},
							{value:this.dashHeader.generalStaff, name:'GENERAL STAFF', itemStyle: { normal: { color: 'rgb(184, 58, 222)', } }}
						],
					},
					{
						name:'개발자 현황',
						type:'pie',
						radius: ['45%', '60%'],

						data:[
							{value:this.levels.Trainee, name:'초급', itemStyle: { normal: { color: '#3f84f6', } }},
							{value: this.levels.Junior, name:'중급', itemStyle: { normal: { color: '#4c8bf7', } }},
							{value: this.levels.MidLevel, name:'고급', itemStyle: { normal: { color: '#5a95f7', } }},
							{value: this.levels.Senior, name:'특급', itemStyle: { normal: { color: '#70a3f8', } }}
						],
						itemStyle: {
							normal: {
								color: 'rgb(19, 206, 102)',
							}
						},
					}
				]
			})
		},
		initGridData() {
			const year = new Date().getFullYear()
			const status_list = ['Complete', 'Pending', 'Returned', 'Paid']

			_.times(10, (number) => {
				let price = chance.floating({ min: 1, max: 100, fixed: 2 })
				let qnt = chance.integer({ min: 1, max: 5 })
				let amount = price * qnt

				this.gridData.push({
					customer: chance.name(),
					photo: '/static/images/shop/'+chance.integer({ min: 0, max: 19 })+'.jpg',
					city: chance.city(),
					address: chance.address(),
					email: chance.email(),
					product: chance.sentence({ words: 3 }),
					price: _.replace(price.toFixed(2).toString(), '.', ','),
					qnt,
					amount: _.replace(amount.toFixed(2).toString(), '.', ','),
					status: status_list[chance.integer({ min: 0, max: 3 })],
					date: chance.date({string: true, year: year}),
					id: number
				})
			})
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.page-ecommerce-dashboard {

	.splitWord {
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
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
}

</style>


