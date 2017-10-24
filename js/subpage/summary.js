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
		    		var unitLength = 15;
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