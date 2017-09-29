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