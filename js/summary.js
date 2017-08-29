	$(document).ready(function(){
				//******************************** summary ************************************
				$("#score").text(resData.score);
				$("#testCover").text(resData.gotest.summary);
				$("#testPkgCover").text((resData.gotest.res.length / (+resData.gotest.res.length + +resData.gotest.noTest.length) * 100).toFixed(0));
				$("#goIssueNum").text(resData.issueNum);
				
				var mediumscore = resData.gocyclo.reduce(function(a,b){
					return a + b.res.filter(function(d){
						return d.comp < HIGH_GOCYCLO_SCORE && d.comp >= MEDIUM_GOCYCLO_SCORE;
					}).length;
				}, 0);
				var highscore = resData.gocyclo.reduce(function(a,b){
					return a + b.res.filter(function(d){
						return d.comp >= HIGH_GOCYCLO_SCORE;
					}).length;
				}, 0);
				var lowscore = resData.gocyclo.reduce(function(a, b){
					return a + b.res.filter(function(d){
						return d.comp > 0 && d.comp <=MEDIUM_GOCYCLO_SCORE;
					}).length
				}, 0);
				$("#mediumCycleNum").text(mediumscore);
				$("#highCycleNum").text(highscore);
				//******************************** gotest ************************************

				gotestResult();
				$("#gotestChart").highcharts({
					chart: {
						type: 'bar',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: resData.gotest.gotest_result.xAxis,
						title:{
							text: null
						},
						tickLength: 3,
						labels: {
							style: {
								color: "#596679",
								fontSize: '12px'
							}
						}
					},
					yAxis: [{
						min: 0,
						ceiling: 100,
				        title: {
				            text: ''
				        },
				        labels: {
				            overflow: 'justify'
				        },
				        gridLineColor: '',
				        gridLineWidth: 0,
				        labels: {
				        	enabled: false
				        }
					},{
				        min: 0,
				        title:{
				            text: ''
				        },
				        opposite: true,
				        gridLineColor: '',
				        gridLineWidth: 0,
				        labels: {
				        	enabled: false
				        }
				    }],
				    plotOptions: {
				        bar: {
				            dataLabels: {
				                enabled: true,
				                color: "#596679",
				                fontSize: "10px",
				                pointPadding: 0.2,
				                groupPadding: 0.1,

				            }
				        },
				        series: {
				                pointWidth: 12,
				                borderRadius: 3,
				              
				        }
				    },
				    credits: {
				        enabled: false
				    },
				    legend: {
				    	align: 'center',
				    	itemDistance: 15,
				    	itemStyle: {
				    		color: "#596679"
				    	}
				    },
				    series: [{
				        name: '覆盖率',
				        data: resData.gotest.gotest_result.cover,
				        color: '#47bac1'
				    },
				    {
				        name: '时间',
				        data: resData.gotest.gotest_result.time,
				        yAxis: 1,
				        //color: '#7ccc5d'
				        color: '#BB8FCE'
				    }]
				});
				
				//******************************** go cyclo ************************************

				$("#gocycleChart").highcharts({
					  chart: {
					        plotBackgroundColor: null,
					        plotBorderWidth: 0,
					        plotShadow: false,
					        backgroundColor: '#ecf2f6'
					    },
					    title: {
					        text: ''
					    },
					    tooltip: {
					        pointFormat: '{series.name}: <b>{point.y}%</b>'
					    },
					    credits: {
				            enabled: false
				        },
					    plotOptions: {
					        pie: {
					            dataLabels: {
					                enabled: false
					            },
					            startAngle: -180,
					            endAngle: 180,
					            colors: ['#debbdf', '#bf8ac0', '#ae69af']
					        }
					    },
					    legend: {
					    	enabled: true,
					    	align: 'center'
					    },
					    series: [{
					        type: 'pie',
					        name: '包圈复杂度',
					      //  innerSize: '80%',
					        data: [
					            ['1-15',   parseInt(lowscore,10)],
					            ['15-50',  parseInt(mediumscore,10)],
					            ['50以上',  parseInt(highscore, 10)]
					        ]
					    }]
				});
				//******************************** go issue ************************************
				var issueKeys = Object.keys(resData.goIssue.content);
				var issueData = [];
				issueKeys.forEach(function(d){
					var element = [];
					element.push(d);
					element.push(resData.goIssue.content[d].detail.length);
					issueData.push(element);
				})
				$("#goIssue").highcharts({
					  chart: {
					        plotBackgroundColor: null,
					        plotBorderWidth: 0,
					        plotShadow: false,
					        backgroundColor: '#ecf2f6'
					    },
					    title: {
					        text: ''
					    },
					    tooltip: {
					        pointFormat: '{series.name}: <b>{point.y}</b>'
					    },
					    credits: {
				            enabled: false
				        },
					    plotOptions: {
					        pie: {
					            dataLabels: {
					                enabled: false
					            },
					            startAngle: -180,
					            endAngle: 180,
					            colors: ['#B03A2E', '#E74C3C', '#F1948A', '#F5B7B1']
					        }
					    },
					    legend: {
					    	enabled: false,
					    	align: 'right'
					    },
					    series: [{
					        type: 'pie',
					        name: '包Issue',
					     //   innerSize: '80%',
					        data: issueData
					    }]
				});
				//******************************** go code percentage ************************************
				$("#goPercentage").highcharts({
					  chart: {
					        plotBackgroundColor: null,
					        plotBorderWidth: 0,
					        plotShadow: false,
					        backgroundColor: '#ecf2f6'
					    },
					    title: {
					        text: ''
					    },
					    tooltip: {
					        pointFormat: '{series.name}: {point.y}个，<br>占比：{point.percentage:.0f}%'
					    },
					    credits: {
				            enabled: false
				        },
					    plotOptions: {
					        pie: {
					            dataLabels: {
					                enabled: false
					            },
					            startAngle: -180,
					            endAngle: 180,
					            //colors: ['#76448A', '#9B59B6', '#C39BG', '#D7BDE2', '#EBDEF0']
					        }
					    },
					    legend: {
					    	enabled: false,
					    	align: 'right'
					    },
					    series: [{
					        type: 'pie',
					        name: '包代码量占比',
					    //    innerSize: '80%',
					        data: getCodePercentage()
					    }]
				});


				function gotestResult(){
					var gotest_result = {};
					gotest_result.xAxis = [];
					gotest_result.cover = [];
					gotest_result.time = [];
					resData.gotest.res.forEach(function(item){
						gotest_result.xAxis.push(item.path);
						gotest_result.cover.push(item.cover);
						gotest_result.time.push(item.time);
					});
					resData.gotest.gotest_result = gotest_result;
					delete resData.gotest.res;
				}

				function goSimpleResult(array, key, level){
					var data_dic = {}, data_render = []; 
					array.forEach(function(arr){
						var pathArr = arr[key].split("/"), pathKey = "";
						for(var i=0 ; i<level; i++){    
							pathKey += ("/" + pathArr[i+1]);
						}
						if(!data_dic[pathKey]){
							data_dic[pathKey] = [];
						}
						data_dic[pathKey].push(arr);
					});
					for(var i in data_dic){
						var element = [];
						element.push(i);
						element.push(data_dic[i].length);
						data_render.push(element);
					}
					delete resData.gosimple;
					return {
						data_dic,
						data_render
					}
				}
				//计算
				function getCodePercentage(){
					var result = [];
				 	resData.countCode.forEach(function(d){
						var element = [];
						element.push(d.package);
						element.push(d.codeNum);
						result.push(element);
					});
					return result;
				}
			})