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