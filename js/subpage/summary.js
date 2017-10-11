//******************************** summary ************************************
module.exports = function(resData){
	$("#score").text(resData.score);
	$("#testCover").text(resData.gotest.summary.code_cover);
	$("#testPkgCover").text(resData.gotest.summary.pkg_cover);
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
	new Highcharts.Chart({
	//$("#gotestChart").highcharts({
		chart: {
			renderTo: 'gotestChart',
			type: 'bar',
	        alignTicks: false,
	        height: 550
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
	        name: '覆盖率',
	        data: resData.gotest.content.cover,
	        color: '#47bac1',
	        stack: 'coverage',
	        dataLabels: {
	        	align: 'right',
	            x: 40
	        }
	    },
	    {
	    	id: 'time',
	        name: '时间',
	        data: resData.gotest.content.time,
	        yAxis: 1,
	        //color: '#7ccc5d'
	        color: '#BB8FCE',
	        stack: 'time',
	        dataLabels: {
	        	align: 'right',
	            x: 40
	        }
	    }]
	});

	$("#noTestCount").text(resData.gotest.content.no_test.length);
	$("#coverLessCount").text(resData.gotest.content.cover.filter(function(d){return d<50}).length);
	$("#timeGreaterCount").text(resData.gotest.content.time.filter(function(d){return d>=1}).length);
	
	//******************************** go cyclo ************************************

	$("#gocycleChart").highcharts({
		  chart: {
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
		            showInLegend: true,
		            //colors: ['#debbdf', '#bf8ac0', '#ae69af']
		            colors: ['rgba(0,169,239,1)', 'rgba(0,169,239,0.6)','rgba(0,169,239,0.2)'],
		            size: '60%'
		        }
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
		    	align: 'left',
		    	layout: "vertical",
		    },
		    series: [{
		        type: 'pie',
		        name: '包圈复杂度',
		        innerSize: '85%',
		        data: [
		        	['50以上',  parseInt(highscore, 10)],
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
	$("#goIssue").highcharts({
		  chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor: '#fff'
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
		            showInLegend: true,
		            //colors: ['#B03A2E', '#E74C3C', '#F1948A', '#F5B7B1']
		            colors: issueData.map(function(d,i){var opacity = 1 - 0.2*i; return 'rgba(76,114,195,' + opacity + ')'}),
		            size: '60%'
		        }
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
		    	align: 'left',
		    	layout: "vertical",
		    },
		    series: [{
		        type: 'pie',
		        name: '包Issue',
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
	$("#goPercentage").highcharts({
		  chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        backgroundColor: '#fff'
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
		    		color: "#596679"
		    	},
		    	symbolRadius: 0,
		    	verticalAlign: 'top',
		    	align: 'left',
		    	layout: "vertical",
		    },
		    series: [{
		        type: 'pie',
		        name: '包代码行数',
		        innerSize: '85%',
		        data: countCodeData
		    }]
	});
}