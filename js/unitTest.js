$(document).ready(function(){
	var totalTime = getTotalTime();
	$("#coverPct").text(resData.gotest.codeCover);
	$("#pkgPct").text(resData.gotest.pkgCover);
	$("#unitTestTime").text(totalTime);
	/**
	 * package coverage rate 
	 */
	gotestResult();
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
	resData.gotest.noTest.forEach(function(d){
		var li = "<li>" + d + "</li>";
		$("#unitAbsentFiles").append(li);
	})
	/**
	 * calculate total time spent
	 */
	function getTotalTime(){
		return resData.gotest.res.reduce(function(a, b){
			return a + b.time
		}, 0)
	}
	function getTimeArr(){
		var result = [];
		resData.gotest.res.forEach(function(d){
			var element = [];
			element.push(d.path);
			element.push(d.time);
			result.push(element);
		})
		return result;
	}
	/**
	 * get unit test data format for highcharts
	 */
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
	}
})