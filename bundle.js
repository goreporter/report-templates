(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var subPageMap = {
	navSummary 	  : 'summary',
	navUnitTest   : 'unitTest',
	navCodeCount  : 'codeCount',
	navCodeOpt 	  : 'codeOpt',
	navCodeSmell  : 'codeSmell',
	navCodeStyle  : 'codeStyle'
}

Object.keys(subPageMap).forEach(function(d, i){
	(function(nav){
		$("#"+nav).on("click", function(){
			$("#"+ subPageMap[nav]).removeClass("none");
			$(this).addClass("active");
			Object.keys(subPageMap).forEach(function(dd, k){
				if(dd !== nav){
					$("#" + subPageMap[dd]).removeClass("none").addClass("none");
					$("#" + dd).removeClass("active");
				}
			})

		})
	})(d)
});


require('./subpage/codeCount.js')(resData.countCode);
require('./subpage/codeOpt.js')(resData.goIssue);
require('./subpage/codeSmell.js')(resData.codeSmell);
require('./subpage/codeStyle.js')(resData.codeStyle);
require('./subpage/summary.js')(resData);
require('./subpage/unitTest.js')(resData.gotest);

},{"./subpage/codeCount.js":2,"./subpage/codeOpt.js":3,"./subpage/codeSmell.js":4,"./subpage/codeStyle.js":5,"./subpage/summary.js":6,"./subpage/unitTest.js":7}],2:[function(require,module,exports){
/*************************************code count************************************************/
module.exports = function codeCount(codeCount){
	$("#line_count").text(codeCount.summary.line_count);
	$("#comment_count").text(codeCount.summary.comment_count);
	$("#function_count").text(codeCount.summary.function_count);
	$("#file_count").text(codeCount.summary.file_count);
	/**
	 * package coverage rate 
	 */
	$("#lineCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: codeCount.content.pkg,
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
					yAxis: {
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
					},
				    plotOptions: {
				        column: {
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
				        name: '包代码行详情',
				        data: codeCount.content.pkg_line_count,
				        color: '#47bac1'
				    }]
				});
	$("#commentCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: codeCount.content.pkg,
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
					yAxis: {
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
					},
				    plotOptions: {
				        column: {
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
				        name: '注释行详情',
				        data: codeCount.content.pkg_comment_count,
				        color: '#47bac1'
				    }]
				});
	$("#funcCountChart").highcharts({
					chart: {
						type: 'column',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: codeCount.content.pkg,
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
					yAxis: {
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
					},
				    plotOptions: {
				        column: {
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
				        name: '函数行详情',
				        data: codeCount.content.pkg_function_count,
				        color: '#47bac1'
				    }]
				});
	$("#fileCountChart").highcharts({
			chart: {
				type: 'column',
		        alignTicks: false,
		        backgroundColor: '#ecf2f6'
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: codeCount.content.file,
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
			yAxis: {
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
			},
		    plotOptions: {
		        column: {
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
		        name: '代码行详情',
		        data: codeCount.content.file_line_count,
		        color: '#47bac1'
		    },{
		        name: '注释行详情',
		        data: codeCount.content.file_comment_count,
		        color: '#BB8FCE'
		    },{
		        name: '函数行详情',
		        data: codeCount.content.file_function_count,
		        color: '#2aafff'
		    }]
		});
}
},{}],3:[function(require,module,exports){
/********************************code opt*****************************************/
module.exports = function codeOpt(goIssue){
	var summary 		= goIssue.summary,
		data 			= goIssue.content,
		keys 			= Object.keys(data),
		indexHtml 		= "",
		contentHtml 	= "";
	//顶部summary
	$("#optIssueNum").text(goIssue.summary.issueNum);
	$("#optFileNum").text(goIssue.summary.fileNum);
	$("#optQualityRank").text(goIssue.summary.quality);

	//底部图表
	keys.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			if(k != 'copyCode'){
				content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
			}else{
				content += "<h5>" + d.length + "</h5>" + d.map(function(cc){return "<p>" + cc +"</p>"}).join("");
			}
		});
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span>" + data[k].score + "</span></h4>" + "<div><p class='description'>" + data[k].label + "</p><div>" + content + "</div></div></section>"
	});

	//底部内容
	$("#optSubNav").append(indexHtml);
	$("#optContent").append(contentHtml);
}
},{}],4:[function(require,module,exports){
/********************************code smell***************************************/
module.exports = function(codeSmell){
	$("#cyclo_avg").text(codeSmell.summary.cyclo_avg);
	$("#cyclo_high").text(codeSmell.summary.cyclo_high);
	$("#cyclo_grave").text(codeSmell.summary.cyclo_grave);
	/**
	 * time cost of package unit test distribution 
	 */
	$("#cycloPertChart").highcharts({
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
	        pointFormat: '{series.name}: {point.y}s <br>占比：{point.percentage:.0f}%'
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
	            showInLegend: true,
	            size: '70%'
	            //colors: ['#76448A', '#9B59B6', '#C39BG', '#D7BDE2', '#EBDEF0']
	        }
	    },
	    legend: {
	    	enabled: true,
	    	align: 'left',
	    	layout: "vertical",
	    	verticalAlign: 'top',
	    	padding: 16,
	    	itemMarginBottom: 5,
	    	itemMarginTop: 5
	    },
	    series: [{
	        type: 'pie',
	        name: '耗时',
	        //innerSize: '50%',
	        data: codeSmell.content.percentage
	    }]
	});
	/**
	 * package coverage rate 
	 */
	$("#cycloRankChart").highcharts({
			chart: {
				type: 'column',
		        alignTicks: false,
		        backgroundColor: '#ecf2f6'
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: codeSmell.content.pkg,
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
		        name: '圈复杂度',
		        data: codeSmell.content.cyclo,
		        color: '#47bac1'
		    }]
		});
	
	/**
	 * list for files no having test code
	 */
	codeSmell.content.list.forEach(function(d,index){
		var li = "<li><span>" + (index+1) + "</span><span>" + d.path + "</span><span>" + d.cyclo + "</span></li>";
		$("#cycloList").append(li);
	})
}
},{}],5:[function(require,module,exports){
/***************************codeStyle****************************/
module.exports = function(codeStyle){
	var summary 		= codeStyle.summary,
		data 			= codeStyle.content;

		//顶部summary
	$("#styleIssueNum").text(summary.issueNum);
	$("#styleFileNum").text(summary.fileNum);
	$("#styleQualityRank").text(summary.quality);

	//底部图表
	key = Object.keys(data),
	indexHtml = "",
	contentHtml = "";
	key.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
		});
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span>" + data[k].score + "</span></h4>" + "<div><p class='description'>" + data[k].label + "</p><div>" + content + "</div></div></section>"
	});

	//底部内容
	$("#styleSubNav").append(indexHtml);
	$("#styleContent").append(contentHtml);
}
},{}],6:[function(require,module,exports){
//******************************** summary ************************************
module.exports = function(resData){
	$("#score").text(resData.score);
	$("#testCover").text(resData.gotest.summary.codeCover);
	$("#testPkgCover").text(resData.gotest.summary.pkgCover);
	$("#goIssueNum").text(resData.issueNum);
	$("#codeLineNum").text(resData.countCode.summary.line_count);
	
	var mediumscore = 0,
		highscore = 0,
		lowscore = 0,
		codeSmell = resData.codeSmell.content;
	if(!(codeSmell.percentage instanceof Array) || codeSmell.percentage.length != 3){
		console.error("codeSmell中的percentage数据出错！");
	}else{
		lowscore = codeSmell.percentage[0][1];
		mediumscore = codeSmell.percentage[1][1];
		highscore = codeSmell.percentage[2][1];
	}
	$("#mediumCycleNum").text(mediumscore);
	$("#highCycleNum").text(highscore);
	//******************************** gotest ************************************

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
			categories: resData.gotest.content.pkg,
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
	        data: resData.gotest.content.cover,
	        color: '#47bac1'
	    },
	    {
	        name: '时间',
	        data: resData.gotest.content.time,
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
		        pointFormat: '{series.name}: {point.y}个<br>占比：{point.percentage:.0f}%'
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
	var countCodeData = [];
	if(resData.countCode.content.pkg.length !== resData.countCode.content.pkg_line_count.length){
		console.error("数据中countCode部分出错，请检查数据");
	}else{
		resData.countCode.content.pkg.forEach(function(d, i){
			var element = [];
			element.push(d);
			element.push(resData.countCode.content.pkg_line_count[i]);
			countCodeData.push(element);
		})
	}
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
		        pointFormat: '{series.name}: {point.y}个<br>占比：{point.percentage:.0f}%'
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
		        name: '包代码行数',
		    //    innerSize: '80%',
		        data: countCodeData
		    }]
	});
}
},{}],7:[function(require,module,exports){
/***************************unitTest****************************/
module.exports = function(gotest){
	$("#coverPct").text(gotest.summary.codeCover);
	$("#pkgPct").text(gotest.summary.pkgCover);
	$("#unitTestTime").text(gotest.summary.totalTime);
	/**
	 * package coverage rate 
	 */
	$("#unitCover").highcharts({
					chart: {
						type: 'bar',
				        alignTicks: false,
				        backgroundColor: '#ecf2f6'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: gotest.content.pkg,
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
				        data: gotest.content.cover,
				        color: '#47bac1'
				    },
				    {
				        name: '时间',
				        data: gotest.content.time,
				        yAxis: 1,
				        color: '#BB8FCE'
				    }]
				});
	/**
	 * time cost of package unit test distribution 
	 */
	$("#pie-chart").highcharts({
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
	        pointFormat: '{series.name}: {point.y}s <br>占比：{point.percentage:.0f}%'
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
	            showInLegend: true,
	            size: '70%'
	            //colors: ['#76448A', '#9B59B6', '#C39BG', '#D7BDE2', '#EBDEF0']
	        }
	    },
	    legend: {
	    	enabled: true,
	    	align: 'left',
	    	layout: "vertical",
	    	verticalAlign: 'top',
	    	padding: 16,
	    	itemMarginBottom: 5,
	    	itemMarginTop: 5
	    },
	    series: [{
	        type: 'pie',
	        name: '耗时',
	        //innerSize: '50%',
	        data: getTimeArr()
	    }]
	});
	/**
	 * list for files no having test code
	 */
	gotest.content.noTest.forEach(function(d){
		var li = "<li>" + d + "</li>";
		$("#unitAbsentFiles").append(li);
	})
	
	function getTimeArr(){
		if(gotest.content.pkg.length !== gotest.content.time.length){
			console.error("包的数量和时间的数量不一致，请检查数据..");
			return [];
		}
		var result = [];
		gotest.content.pkg.forEach(function(d,i){
			var element = [];
			element.push(d);
			element.push(gotest.content.time[i]);
			result.push(element);
		})
		return result;
	}
}

},{}]},{},[1]);
