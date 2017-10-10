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
	        backgroundColor: '#fff',
	        type: 'pie'
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
	            showInLegend: true,
	            size: '60%',
	            colors: ['rgba(0,169,239,1)', 'rgba(0,169,239,0.6)','rgba(0,169,239,0.2)']
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
	        name: '耗时',
	        innerSize: '85%',
	        data: codeSmell.content.percentage
	    }]
	});
	/**
	 * package coverage rate 
	 */
	$("#cycloRankChart").highcharts({
			chart: {
				type: 'bar'
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
		            dataLabels: {
		                enabled: true,
		                color: "#596679",
		                fontSize: "10px",
		                pointPadding: 0.2,
		                groupPadding: 0.1,

		            }
		        },
		        series: {
		                pointWidth: 14
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