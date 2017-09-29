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