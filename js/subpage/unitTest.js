/***************************unitTest****************************/
module.exports = function(gotest){
	$("#coverPct").text(gotest.summary.code_over);
	$("#pkgPct").text(gotest.summary.pkg_cover);
	$("#unitTestTime").text(gotest.summary.total_time);
	/**
	 * package coverage rate 
	 */
	$("#unitCover").highcharts({
					chart: {
			type: 'bar',
	        alignTicks: false,
	        height: 550,
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
	                pointWidth: 14,
	                groupPadding: 0.15
	              
	        }
	    },
	    credits: {
	        enabled: false
	    },
	    legend: {
	    	itemDistance: 15,
	    	itemStyle: {
	    		color: "#596679"
	    	},
	    	verticalAlign: 'top',
	    	align: 'left',
	    	// backgroundColor: '#fff',
	    	// borderColor: '#d2dae2',
	    	// borderRadius: 24,
	    	// borderWidth: 2,
	    	// padding: 15,
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
	        name: '覆盖率',
	        data: gotest.content.cover,
	        color: '#47bac1',
	        stack: 'coverage'
	    },{
	        name: null,
	        data: gotest.content.time.map(function(d,i,arr){return Math.max.apply(Math, arr) - d}),
	        yAxis: 1,
	        //color: '#7ccc5d'
	        dataLabels: {
	        	enabled: false
	        },
	        linkedTo: 'time',
	        color: '#d9e4eb',
	        stack: 'time',
	        enableMouseTracking:false
	    },
	    {
	    	id: 'time',
	        name: '时间',
	        data: gotest.content.time,
	        yAxis: 1,
	        //color: '#7ccc5d'
	        color: '#BB8FCE',
	        stack: 'time'
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
	    	itemMarginTop: 5,
	    	symbolRadius: 0
	    },
	    series: [{
	        type: 'pie',
	        name: '耗时',
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
}
