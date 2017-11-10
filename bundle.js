(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//解析数据
try{
	resData.gotest = JSON.parse(resData.gotest);
}catch(e){
	resData.gotest = {};
	console.error("gotest" + $.i18n('json_parse_error'));
}

try{
	resData.codeStyle = JSON.parse(resData.codeStyle);
}catch(e){
	resData.codeStyle = {};
	console.error("codeStyle" + $.i18n('json_parse_error'));
}

try{
	resData.goIssue = JSON.parse(resData.goIssue);
}catch(e){
	resData.goIssue = {};
	console.error("goIssue" + $.i18n('json_parse_error'));
}

try{
	resData.codeSmell = JSON.parse(resData.codeSmell);
}catch(e){
	resData.codeSmell = {};
	console.error("codeSmell" + $.i18n('json_parse_error'));
}

try{
	resData.countCode = JSON.parse(resData.countCode);
}catch(e){
	resData.countCode = {};
	console.error("countCode" + $.i18n('json_parse_error'));
}

initData(resData.gotest);
initData(resData.codeStyle, 'detail');
initData(resData.goIssue, 'detail');
initData(resData.codeSmell);
initData(resData.countCode);

function initData(data, value){
	Object.keys(data.content).forEach(function(d){
		typeof value === 'undefined' ? data.content[d] = data.content[d] || [] : data.content[d][value] = data.content[d][value] || [];
	})
}

var subPageMap = {
	navSummary: 
	{
		id: 'summary'
	},
	navUnitTest: {
		id: 'unitTest'
	},
	navCodeCount: {
		id: 'codeCount'
	},
	navCodeOpt: {
		id: 'codeOpt'
	},
	navCodeSmell: {
		id: 'codeSmell'
	},
	navCodeStyle: {
		id: 'codeStyle'
	}
}

/**
 * 切换菜单
 */
Object.keys(subPageMap).forEach(function(d, i){
	(function(nav){
		$("#"+nav).on("click", function(){
			$("#"+ subPageMap[nav].id).removeClass("none");
			$(this).addClass("active");
			Object.keys(subPageMap).forEach(function(dd, k){
				if(dd !== nav){
					$("#" + subPageMap[dd].id).removeClass("none").addClass("none");
					$("#" + dd).removeClass("active");
				}
			})

		})
	})(d)
});

/**
 * 语言切换
 */
$.i18n({
	locale: 'en'
})
$.i18n().load({
	en: en_text,
	zh: ch_text
})

function changeLang(){
	var allTexts = Object.keys(en_text);
	allTexts.forEach(function(dom){
		if($("#"+dom).length > 0){
			$("#"+dom).i18n();
		}
	});
}

changeLang();

/**
 * 引入子页面的js文件
 */
var codeCountPage = require('./subpage/codeCount.js')(resData.countCode);
require('./subpage/codeOpt.js')(resData.goIssue);
var codeSmellPage = require('./subpage/codeSmell.js')(resData.codeSmell);
require('./subpage/codeStyle.js')(resData.codeStyle);
var summaryPage = require('./subpage/summary.js')(resData);
var unitTestPage = require('./subpage/unitTest.js')(resData.gotest);

/**
 * 监听语言切换按钮
 */
$("#changeLang").on("click", function(){
	var lang = $.i18n().locale;
	if(lang == "zh"){
		$(this).text("中文");
		$.i18n().locale = "en";
	}else if(lang == "en"){
		$(this).text("ENGLISH");
		$.i18n().locale = "zh";
	}
	changeLang();
	redrawAllCharts();
})

/**
 * redraw all highcharts after changing language
 */

function redrawAllCharts(){
	summaryPage.updateHighcharts();
	unitTestPage.updateHighcharts();
	codeCountPage.updateHighcharts();
	codeSmellPage.updateHighcharts();
}





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
	//计算最大值
	var maxChart1Data = Math.max(Math.max.apply(Math, codeCount.content.pkg_line_count),Math.max.apply(Math, codeCount.content.pkg_comment_count),Math.max.apply(Math, codeCount.content.pkg_function_count));
	var maxChart2Data = Math.max(Math.max.apply(Math, codeCount.content.file_line_count),Math.max.apply(Math, codeCount.content.file_comment_count),Math.max.apply(Math, codeCount.content.file_function_count));
	var chart1 = new Highcharts.Chart({
		chart: {
			renderTo: 'lineCountChart',
			type: 'bar',
			height: codeCount.content.pkg.length * 60 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: codeCount.content.pkg,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '14px'
				}
			}
		},
		yAxis: {
	        title: {
	            text: ''
	        },
	        gridLineColor: '',
	        gridLineWidth: 0,
	        labels: {
	        	enabled: false
	        }
		},
	    plotOptions: {
	        bar: {
	        	stacking: 'percentage',
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                align: 'right',
	                x: 40
	            }
	        },
	        series: {
                pointWidth: 12,
	            groupPadding: 0.15
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	margin: 30,
	    	itemStyle: {
	    		fontSize: '14px',
	    		color: "#596679"
	    	},
	    	symbolRadius: 0,
	    	verticalAlign: 'top',
	    	align: 'left'
	    },
	    series: [{
	        name: null,
	        data: codeCount.content.pkg_line_count.map(function(d){return maxChart1Data-d}),
	        color: '#d9e4eb',
	        stack: 'pkg_code_line',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'pkg_code_line',
	        enableMouseTracking:false
	    },
	    {
	    	id: 'pkg_code_line',
	        name: $.i18n('cc_pkg_code_legend'),
	        data: codeCount.content.pkg_line_count,
	        color: '#47bac1',
	        stack: 'pkg_code_line'
	    },{
	        name: null,
	        data: codeCount.content.pkg_comment_count.map(function(d){return maxChart1Data-d}),
	        color: '#d9e4eb',
	        stack: 'pkg_comment_line',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'pck_comment_line',
	        enableMouseTracking:false
	    },{
	    	id: 'pkg_comment_line',
	    	stack: 'pkg_comment_line',
	        name: $.i18n('cc_pkg_comment_legend'),
	        data: codeCount.content.pkg_comment_count,
	        color: '#4d73c4'
	    },{
	        name: null,
	        data: codeCount.content.pkg_function_count.map(function(d){return maxChart1Data-d}),
	        color: '#d9e4eb',
	        stack: 'pkg_function_line',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'pck_function_line',
	        enableMouseTracking:false
	    },{
	    	id: 'pkg_function_line',
	    	stack: 'pkg_function_line',
	        name: $.i18n('cc_pkg_func_legend'),
	        data: codeCount.content.pkg_function_count,
	        color: '#0382be'
	    }]
	});
	var chart2 = new Highcharts.Chart({
		chart: {
			renderTo: 'fileCountChart',
			type: 'bar',
			height: codeCount.content.file.length * 60 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: codeCount.content.file,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '12px'
				}
			}
		},
		yAxis: {
	        title: {
	            text: ''
	        },
	        gridLineColor: '',
	        gridLineWidth: 0,
	        labels: {
	        	enabled: false
	        }
		},
	    plotOptions: {
	        bar: {
	        	stacking: 'percentage',
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                align: 'right',
	                x: 40
	            }
	        },
	        series: {
	                pointWidth: 12,
	                groupPadding: 0.15
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	margin: 30,
	    	itemStyle: {
	    		fontSize: '14px',
	    		color: "#596679"
	    	},
	    	symbolRadius: 0,
	    	verticalAlign: 'top',
	    	align: 'left'
	    },
	    series: [{
	        name: null,
	        data: codeCount.content.file_line_count.map(function(d){return maxChart2Data-d}),
	        color: '#d9e4eb',
	        stack: 'file_code_count',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'file_code_count',
	        enableMouseTracking:false
	    },{
	    	id: 'file_code_count',
	    	stack: 'file_code_count',
	        name: $.i18n('cc_code_legend'),
	        data: codeCount.content.file_line_count,
	        color: '#47bac1'
	    },{
	        name: null,
	        data: codeCount.content.file_comment_count.map(function(d){return maxChart2Data-d}),
	        color: '#d9e4eb',
	        stack: 'file_comment_count',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'file_comment_count',
	        enableMouseTracking:false
	    },{
	    	id: 'file_comment_count',
	    	stack: 'file_comment_count',
	        name: $.i18n('cc_comment_legend'),
	        data: codeCount.content.file_comment_count,
	        color: '#BB8FCE'
	    },{
	        name: null,
	        data: codeCount.content.file_function_count.map(function(d){return maxChart2Data-d}),
	        color: '#d9e4eb',
	        stack: 'file_function_count',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'file_function_count',
	        enableMouseTracking:false
	    },{
	    	id: 'file_function_count',
	    	stack: 'file_function_count',
	        name: $.i18n('cc_function_legend'),
	        data: codeCount.content.file_function_count,
	        color: '#2aafff'
	    }]
	});
	/**
	 * update Highcharts after changing language
	 */
	function updateHighcharts(){
		chart1.update({
						series:[{
							id: 'pkg_code_line',
					        name: $.i18n('cc_pkg_code_legend')
					    },{
					    	id: 'pkg_comment_line',
					        name: $.i18n('cc_pkg_comment_legend')
					    },{
					    	id: 'pkg_function_line',
					        name: $.i18n('cc_pkg_func_legend')
					    }]
					});
		chart2.update({
			 series: [{
			 	id: 'file_code_count',
		        name: $.i18n('cc_code_legend')
		    },{
		    	id: 'file_comment_count',
		        name: $.i18n('cc_comment_legend')
		    },{
		    	id: 'file_function_count',
		        name: $.i18n('cc_function_legend')
		    }]
		})
	}
	return {
		updateHighcharts: updateHighcharts
	}
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
	$("#optIssueNum").text(goIssue.summary.issue_num);
	$("#optFileNum").text(goIssue.summary.file_num);
	$("#optQualityRank").text(goIssue.summary.quality);

	//底部图表
	keys.forEach(function(k){
		indexHtml += "<li><a href='#" + k + "'>" + k + "</a></li>";
		var content = "";
		data[k].detail.forEach(function(d){
			content += "<h5>" + d.rep + "</h5>" + d.content.map(function(cc){return "<a>" + cc + "<br/></a>"}).join("");
		});
		var issueNum = data[k].detail.reduce(function(sum, d){
										return sum + d.content.length;
									},0);
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span class='emp-num'>" + issueNum + "</span><span class='description'>" + data[k].label + "</span></h4><div>" + content + "</div></div></div></section>"
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
	var pieChart = new Highcharts.Chart({
		chart: {
			renderTo: 'cycloPertChart',
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
	        backgroundColor: '#fff',
	        type: 'pie'
	    },
	    title: {
	        text: ''
	    },
	    tooltip: {
	        pointFormat: $.i18n('unit_piece') + '：{point.y} <br>' + $.i18n('unit_pct') + '{point.percentage:.0f}%'
	    },
	    credits: {
            enabled: false
        },
	    plotOptions: {
	        pie: {
	            dataLabels: {
	                enabled: false
	            },
	            showInLegend: true,
	            size: '60%',
	            colors: ['rgba(0,169,239,1)', 'rgba(0,169,239,0.2)','rgba(0,169,239,0.6)']
	        }
	    },
	    legend: {
	    	layout:'vertical',
	    	symbolRadius: 0,
	    	itemStyle: {
	    		color: "#596679",
	    		fontSize: "14px"
	    	},
	    	verticalAlign: 'top',
    		align: 'left'
	    },
	    series: [{
	        type: 'pie',
	        innerSize: '85%',
	        data: Object.keys(codeSmell.content.percentage).map(function(d){return [d, codeSmell.content.percentage[d]]})
	    }]
	});
	/**
	 * package coverage rate 
	 */
	var barChart = new Highcharts.Chart({
			chart: {
				renderTo: 'cycloRankChart',
				type: 'bar',
				height: codeSmell.content.pkg.length * 20 + 120
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: codeSmell.content.pkg,
				title:{
					text: null
				},
				tickLength: 0,
				lineWidth: 0,
				labels: {
					style: {
						color: "#596679",
						fontSize: '12px'
					}
				}
			},
			yAxis: {
		        title: {
		            text: ''
		        },
		        gridLineColor: '',
		        gridLineWidth: 0,
		        labels: {
		        	enabled: false
		        }
			},
		    plotOptions: {
		        bar: {
		        	stacking: 'percentage',
		            dataLabels: {
		                enabled: true,
		                color: "#596679",
		                fontSize: "10px",
		                pointPadding: 0.2,
		                groupPadding: 0.1,
		                align: 'right',
		                x: 20

		            }
		        },
		        series: {
		                pointWidth: 12
		        }
		    },
		    credits: {
		        enabled: false
		    },
		    legend: {
		    	layout:'vertical',
		    	symbolRadius: 0,
		    	itemStyle: {
		    		color: "#596679",
		    		fontSize: "14px"
		    	},
		    	verticalAlign: 'top',
	    		align: 'left'
		    },
		    series: [{
		        name: null,
	        	color: '#d9e4eb',
	        	stack: 'code_smell',
	        	data: codeSmell.content.cyclo.map(function(d, i, arr){return Math.max.apply(Math, arr) - d}),
		        dataLabels: {
		        	enabled: false
		        },
	        	linkedTo: 'code_smell',
	        	enableMouseTracking:false
		    },{
		    	id: 'code-smell',
		        name: $.i18n('cm_circle_comp_legend'),
		        data: codeSmell.content.cyclo,
		        color: '#47bac1',
		        stack: 'code_smell'
		    }]
		});
	
	/**
	 * list for files no having test code
	 */
	codeSmell.content.list.forEach(function(d,index){
		var li = "<li><span>" + (index+1) + "</span><span title=" + d.path+ ">" + d.path + "</span><span>" + d.cyclo + "</span></li>";
		$("#cycloList").append(li);
	})
	/**
	 * update Highcharts after changing language
	 */
	function updateHighcharts(){
		pieChart.update({
			 tooltip: {
			    pointFormat: $.i18n('unit_piece') + '：{point.y} <br>' + $.i18n('unit_pct') + '{point.percentage:.0f}%'
			}
		});
		barChart.update({
						series:[{
					    	id: 'code-smell',
					        name: $.i18n('cm_circle_comp_legend')
					    }]
					});
	}
	return {
		updateHighcharts: updateHighcharts
	}
}
},{}],5:[function(require,module,exports){
/***************************codeStyle****************************/
module.exports = function(codeStyle){
	var summary 		= codeStyle.summary,
		data 			= codeStyle.content;

		//顶部summary
	$("#styleIssueNum").text(summary.issue_num);
	$("#styleFileNum").text(summary.file_num);
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
		var issueNum = data[k].detail.reduce(function(sum, d){
												return sum + d.content.length;
											},0);
		contentHtml += "<section id=" + k + "><h4><span>" + k  + "</span><span class='emp-num'>" + issueNum + "</span><span class='description'>" + data[k].label + "</span></h4><div>" + content + "</div></div></div></section>"
	});

	//底部内容
	$("#styleSubNav").append(indexHtml);
	$("#styleContent").append(contentHtml);
}
},{}],6:[function(require,module,exports){
//******************************** summary ************************************
module.exports = function(resData){
	var LEGEND_STYLE = {
		itemDistance: 15,
    	margin: 30,
    	itemStyle: {
    		fontSize: '14px',
    		color: "#596679",
    		fontWeight: 'normal'
    	},
    	symbolRadius: 0,
    	verticalAlign: 'top',
    	align: 'left'
	};
	var LEGEND_VERTICAL_STYLE={
		itemDistance: 15,
    	margin: 30,
    	itemStyle: {
    		fontSize: '14px',
    		color: "#596679",
    		fontWeight:'normal'
    	},
    	symbolRadius: 0,
    	verticalAlign: 'top',
    	align: 'left',
    	layout: "vertical"

	}

	$("#score").text(resData.score);
	$("#testCover").text(resData.gotest.summary.code_cover);
	$("#testPkgCover").text(resData.gotest.summary.pkg_cover);
	$("#goIssueNum").text(resData.issueNum);
	$("#codeLineNum").text(resData.countCode.summary.line_count);
	
	var mediumscore = 0,
		highscore = 0,
		lowscore = 0,
		codeSmell = resData.codeSmell.content;
	
		lowscore = codeSmell.percentage['1-15'];
		mediumscore = codeSmell.percentage['15-50'];
		highscore = codeSmell.percentage['50+'];

	$("#mediumCycleNum").text(mediumscore);
	$("#highCycleNum").text(highscore);
	//******************************** gotest ************************************
	var barChart = new Highcharts.Chart({
		chart: {
			renderTo: 'gotestChart',
			type: 'bar',
	        alignTicks: false,
	        height: resData.gotest.content.pkg.length * 40 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: resData.gotest.content.pkg,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '14px'
				}
			}
		},
		yAxis: [{
			min: 0,
			ceiling: 100,
	        title: {
	            text: ''
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
	        maxPadding: 0,
	        labels: {
	        	enabled: false
	        }
	    }],
	    plotOptions: {
	        bar: {
	        	stacking: 'percentage',
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "18px",
	                pointPadding: 0.2
	            }
	        },
	        series: {
	                pointWidth: 12,
	                groupPadding: 0.15
	              
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: LEGEND_STYLE,
	    series: [{
	        name: null,
	        data: resData.gotest.content.cover.map(function(d){return 100-d}),
	        color: '#d9e4eb',
	        stack: 'coverage',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'coverage',
	        enableMouseTracking:false
	    },{
	    	id: 'coverage',
	        name: $.i18n('hp_coverage_legend'),
	        data: resData.gotest.content.cover,
	        color: '#47bac1',
	        stack: 'coverage',
	        dataLabels: {
	        	align: 'right',
	            x: 40
	        },
	        tooltip: {
	        	pointFormat: '{series.name}: {point.y}%'
	        }
	    },
	    {
	    	id: 'time',
	        name: $.i18n('hp_time_legend'),
	        data: resData.gotest.content.time,
	        yAxis: 1,
	        color: '#BB8FCE',
	        stack: 'time',
	        dataLabels: {
	        	align: 'right',
	            x: 40
	        },
	        tooltip: {
	        	pointFormat: '{series.name}: {point.y}s'
	        }
	    }]
	});

	$("#noTestCount").text(resData.gotest.content.no_test.length);
	$("#coverLessCount").text(resData.gotest.content.cover.filter(function(d){return d<50}).length);
	$("#timeGreaterCount").text(resData.gotest.content.time.filter(function(d){return d>=1}).length);
	
	//******************************** go cyclo ************************************

	var pie1 = new Highcharts.Chart({
		  chart: {
		  		renderTo: 'gocycleChart',
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor: '#fff',
		        type: 'pie'
		    },
		    title: {
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
		    credits: {
	            enabled: false
	        },
		    plotOptions: {
		        pie: {
		            dataLabels: {
		                enabled: false
		            },
		            showInLegend: true,
		            colors: ['rgba(0,169,239,1)', 'rgba(0,169,239,0.6)','rgba(0,169,239,0.2)'],
		            size: '60%'
		        }
		    },
		    legend: LEGEND_VERTICAL_STYLE,
		    series: [{
		        type: 'pie',
		        name: $.i18n('hp_pkg_circle_comp'),
		        innerSize: '85%',
		        data: [
		        	['50+',  parseInt(highscore, 10)],
		        	['15-50',  parseInt(mediumscore,10)],
		            ['1-15',   parseInt(lowscore,10)]
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
	var pie2 = new Highcharts.Chart({
		  chart: {
		  		renderTo: 'goIssue',
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor: '#fff'
		    },
		    title: {
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
		    credits: {
	            enabled: false
	        },
		    plotOptions: {
		        pie: {
		            dataLabels: {
		                enabled: false
		            },
		            showInLegend: true,
		            //colors: ['#B03A2E', '#E74C3C', '#F1948A', '#F5B7B1']
		            colors: issueData.map(function(d,i){var opacity = 1 - 0.2*i; return 'rgba(76,114,195,' + opacity + ')'}),
		            size: '60%'
		        }
		    },
		    legend: LEGEND_VERTICAL_STYLE,
		    series: [{
		        type: 'pie',
		        name: $.i18n('hp_pkg_issues_count'),
		        innerSize: '85%',
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
	pie3 = new Highcharts.Chart({
		  chart: {
		  		renderTo: 'goPercentage',
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor: '#fff'
		    },
		    title: {
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
		    credits: {
	            enabled: false
	        },
		    plotOptions: {
		        pie: {
		            dataLabels: {
		                enabled: false
		            },
		            showInLegend: true,
		            colors: countCodeData.map(function(d, i){var opacity = 1 - (0.9 / countCodeData.length) * i; return "rgba(71,186,193," + opacity + ")"}),
		            size: '60%'
		        }
		    },
			legend: {
				itemDistance: 15,
		    	margin: 30,
		    	itemStyle: {
		    		fontSize: '14px',
		    		color: "#596679",
		    		fontWeight:'normal'
		    	},
		    	symbolRadius: 0,
		    	verticalAlign: 'top',
		    	align: 'left',
		    	layout: "vertical",
		    	labelFormatter: function(){
		    		var length = this.name.length;
		    		var unitLength = 20;
		    		var breakIndex = Math.ceil(length / unitLength);
		    		var label = ""
		    		for(var i=1; i<=breakIndex; i++){
		    			label += this.name.slice((i-1)*unitLength, i*unitLength) + (i == breakIndex ? "" : "<br/>");
		    		}
		    		return label;
		    	}
			},
		    series: [{
		        type: 'pie',
		        name: $.i18n("hp_pkg_code_amount"),
		        innerSize: '85%',
		        data: countCodeData
		    }]
	});

	/**
	 * update Highcharts after changing language
	 */
	function updateHighcharts(){
		barChart.update({
							series:[{
						    	id: 'coverage',
						        name: $.i18n('hp_coverage_legend')
						    },
						    {
						    	id: 'time',
						        name: $.i18n('hp_coverage_legend')
						    }]
						});
		pie1.update({
			tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
			series:[{
				name: $.i18n('hp_pkg_circle_comp')
			}]
		});
		pie2.update({
			tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
			series: [{
				name: $.i18n('hp_pkg_issues_count')
			}]
		});
		pie3.update({
			tooltip: {
		        pointFormat: '{series.name}: <br>' + $.i18n('unit_piece') + '{point.y}<br>'+$.i18n('unit_pct')+'{point.percentage:.0f}%'
		    },
			series: [{
				name: $.i18n("hp_pkg_code_amount")
			}]
		})
	}
	return {
		updateHighcharts: updateHighcharts
	}
}
},{}],7:[function(require,module,exports){
/***************************unitTest****************************/
module.exports = function(gotest){
	$("#coverPct").text(gotest.summary.code_cover);
	$("#pkgPct").text(gotest.summary.pkg_cover);
	$("#unitTestTime").text(gotest.summary.total_time);
	/**
	 * package coverage rate 
	 */
	var barChart = new Highcharts.Chart({
		chart: {
			renderTo: 'unitCover',
			type: 'bar',
	        alignTicks: false,
	        height: gotest.content.pkg.length * 40 + 120
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: gotest.content.pkg,
			title:{
				text: null
			},
			tickLength: 0,
			lineWidth: 0,
			labels: {
				style: {
					color: "#596679",
					fontSize: '14px'
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
	        },
	        maxPadding: 0
	    }],

	    plotOptions: {
	        bar: {
	        	stacking: 'percentage',
	            dataLabels: {
	                enabled: true,
	                color: "#596679",
	                fontSize: "10px",
	                pointPadding: 0.2,
	                align: 'right',
	                x: 40

	            }
	        },
	        series: {
	                pointWidth: 12,
	                groupPadding: 0.15
	              
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	itemStyle: {
	    		color: "#596679",
	    		fontSize: '14px',
	    		fontWeight: 'normal'
	    	},
	    	verticalAlign: 'top',
	    	align: 'left',
	    	symbolRadius: 0
	    },
	    series: [{
	        name: null,
	        data: gotest.content.cover.map(function(d){return 100-d}),
	        color: '#d9e4eb',
	        stack: 'coverage',
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'coverage',
	        enableMouseTracking:false
	    },{
	    	id: 'coverage',
	        name: $.i18n('ut_coverage_legend'),
	        data: gotest.content.cover,
	        color: '#47bac1',
	        stack: 'coverage',
	        tooltip: {
	        	pointFormat: '{series.name}: {point.y}%'
	        }
	    },
	    {
	    	id: 'time',
	        name: $.i18n('ut_time_legend'),
	        data: gotest.content.time,
	        yAxis: 1,
	        color: '#BB8FCE',
	        stack: 'time',
	        tooltip: {
	        	pointFormat: '{series.name}: {point.y}s'
	        }
	    }]
				});
	/**
	 * time cost of package unit test distribution 
	 */
	var pieChart = new Highcharts.Chart({
		chart: {
			renderTo: 'pie-chart',
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    title: {
	        text: ''
	    },
	    tooltip: {
	        pointFormat: '{series.name}: {point.y}s <br>' + $.i18n('unit_pct')+ '{point.percentage:.0f}%'
	    },
	    credits: {
            enabled: false
        },
	    plotOptions: {
	        pie: {
	            dataLabels: {
	                enabled: false,
	                color: "#596679"

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
	    	itemMarginTop: 5,
	    	symbolRadius: 0,
	    	itemStyle:{
	    		color: "#596679"
	    	},
	    	labelFormatter: function(){
	    		var length = this.name.length;
	    		var unitLength = 40;
	    		var breakIndex = Math.ceil(length / unitLength);
	    		var label = ""
	    		for(var i=1; i<=breakIndex; i++){
	    			label += this.name.slice((i-1)*unitLength, i*unitLength) + (i == breakIndex ? "" : "<br/>");
	    		}
	    		return label;
	    	}
	    },
	    series: [{
	        type: 'pie',
	        name: $.i18n('ut_time_pct_tooltip'),
	        innerSize: '85%',
	        data: getTimeArr()
	    }]
	});
	/**
	 * list for files no having test code
	 */
	gotest.content.no_test.forEach(function(d){
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

	/**
	 * update Highcharts after changing language
	 */
	function updateHighcharts(){
		barChart.update({
							series:[{
						    	id: 'coverage',
						        name: $.i18n('ut_coverage_legend')
						    },
						    {
						    	id: 'time',
						        name: $.i18n('ut_time_legend')
						    }]
						});
		pieChart.update({
			tooltip: {
		        pointFormat: '{series.name}: {point.y}s <br>' + $.i18n('unit_pct')+ '{point.percentage:.0f}%'
		    },
		    series: [{
		        name: $.i18n('ut_time_pct_tooltip')
		    }]

		})
	}
	return {
		updateHighcharts: updateHighcharts
	}
}

},{}]},{},[1]);
