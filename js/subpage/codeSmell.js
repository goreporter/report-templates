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
	        pointFormat: '个数：{point.y} <br>占比：{point.percentage:.0f}%'
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
	$("#cycloRankChart").highcharts({
			chart: {
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
}