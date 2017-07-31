	$(document).ready(function(){
				//******************************* constants **********************************
				var MEDIUM_GOCYCLO_SCORE = 15,
					HIGH_GOCYCLO_SCORE = 50,
					PATH_PREFIX = 3,
					PROGRESS_BAR_LEN = 220,
					project = resData.project,
					pjLen = project.length;

				//******************************* change to relative path **********************************
				changeToRelativePath(resData.gotest.res, "path");
				changeToRelativePath(resData.gotest.noTest);
				changeToRelativePath(resData.gosimple, "path");
				changeToRelativePath(resData.deadcode, "path");
				for(var i=0 ;i<resData.copycode.length;i++){
					changeToRelativePath(resData.copycode[i].infos);
				}
				

				//******************************** summary ************************************
				$("#score").text(resData.score);
				//$("#project").text(resData.project);
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

				$("#gotestList").append(resData.gotest.noTest.map(function(d){
					return $("<li>" + d + "</li>");
				}));
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
				//******************************** gosimple ************************************
				
				// resData.gosimple_result = goSimpleResult(resData.gosimple, "path", resData.gosimpleLevel);
				// $("#gosimpleChart").highcharts({
			 //        chart: {
			 //            type: 'column',
			 //            backgroundColor: '#ecf2f6'
			 //        },
			 //        title: {
			 //            text: '代码精简',
			 //            style: {
			 //                fontSize: "16px"
			 //            },
			 //            align: 'left'
			 //        },
			 //        xAxis: {
			 //            type: 'category',
			 //            labels: {
			 //                rotation: -45,
			 //                style: {
			 //                    fontSize: '13px',
			 //                    fontFamily: 'Verdana, sans-serif'
			 //                }
			 //            }
			 //        },
			 //        yAxis: {
			 //            min: 0,
			 //            title: {
			 //                text: 'info数量'
			 //            }
			 //        },
			 //        legend: {
			 //            enabled: false
			 //        },
			 //        credits: {
			 //            enabled: false
			 //        },
			 //        plotOptions: {
			 //            series: {
			 //                cursor: 'pointer',
			 //                point: {
			 //                    events: {
			 //                        click: function () {
			 //                            var $tbody = $("#gosimpleTable").find("tbody");
			 //                            $tbody.empty();
			 //                            var content =[];
			 //                            resData.gosimple_result.data_dic[this.name].forEach(function(item){
			 //                                content.push($("<tr><td>" + item.path + "</td><td>" + item.info + "</td></tr>"));
			 //                            })
			 //                           $tbody.append(content);
			 //                        }
			 //                    }
			 //                }
			 //            }
			 //        },
			 //        series: [{
			 //            name: 'info数量',
			 //            data: resData.gosimple_result.data_render,
			 //            color: '#01b8aa',
			 //            dataLabels: {
			 //                enabled: true,
			 //                color: '#666',
			 //                align: 'center',
			 //                style: {
			 //                    fontSize: '12px',
			 //                    fontFamily: 'Verdana, sans-serif'
			 //                }
			 //            }
			 //        }]
				// });

				//******************************** deadcode ************************************

				//$("#deadcodeTable").children("tbody").append(deadcodeResult());

				//******************************** copycode ************************************
				
				//$("#copycodeList").append(copycodeResult());
			   
				//******************************** 圈复杂度 ************************************

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
					        data: resData.goIssue
					    }]
				});
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


			 
				/**
				 * 获取相对路径
				 * @param  {[Array]} array [包含路径信息的数组]
				 * @param  {[string]} key  [路径的key值。可选，没有传递的话表示该数组中的元素不是对象，而是“路径”字符串]
				 */
				function changeToRelativePath(array, key){
					for(var i=0; i<array.length; i++){
						var path = key ? array[i][key] : array[i];
						if(path.indexOf(project) > -1){
							key ? array[i][key] = path.substring(path.indexOf(project) + pjLen) : array[i] =  path.substring(path.indexOf(project) + pjLen);
						}else if(path.indexOf(project.substring(PATH_PREFIX)) > -1){
							key ? array[i][key] = path.substring(path.indexOf(project.substring(PATH_PREFIX)) + pjLen - PATH_PREFIX) : array[i] =  path.substring(path.indexOf(project.substring(PATH_PREFIX)) + pjLen - PATH_PREFIX);
						}
					}
				}

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

				function deadcodeResult(){
					return resData.deadcode.map(function(item){
						return $("<tr><td>" + item.path + "</td><td>" + item.info + "</td></tr>")
					})
				}

				function copycodeResult(){
					return resData.copycode.map(function(item){
						var container = $("<div></div>");
						var title = $("<h3>" + item.files + "</h3>")
						var content = item.infos.map(function(info){
							if(info.indexOf(project) > -1){
								info.substring(info.indexOf(project + pjLen));
							}
							return $("<li>" + info + "</li>");
						});
						container.append(title);
						container.append($("<ul></ul>"));
						container.children("ul").append(content);
						return container;
					});
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