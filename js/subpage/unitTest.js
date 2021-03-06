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
