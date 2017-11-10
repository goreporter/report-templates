//data
	var dataDefault = {
			"score": '',    //首页部分的“分数”一栏
			"issueNum": '',   //首页部分的“Issues"一栏：问题总数。
			"gotest":{        //单元测试页面的数据
				summary:{      //单元测试页面的上部分总结部分
					"code_cover": '',     //代码覆盖率
					"pkg_cover":  '',     //包覆盖率
					"total_time":  ''    //单元测试耗时
				},
				content:{
					pkg: [],
					time: [],   //每个包的耗时，位置跟pkg数组里的包相对应。
					cover: [],    //每个包的覆盖率，位置跟pkg数组里的包对应。
					no_test: []   //没有单元测试代码的包。
				}
			},
			//代码风格
			codeStyle: {
				summary: {
					issue_num: '',
					file_num: '',
					quality: ''
				},
				content:{
					gofmt: {
						label: '',
						score: '',   //这个值暂时没有用。这一版统计的是数值，不是百分比
						detail: [{
										rep: '',   //存在问题的路径
										content: []  //需要显示的每一行
								}]   
					},
					go_vet: {
						label: '',
						score: '',
						detail: []   //这个部分的每个detail字段都遵循上个detail的数据格式
					},
					golint: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
						]
					},
					misspell: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
						]
					}

				}
				
			},
			//代码优化
			goIssue: {
				summary: {
					issue_num: '',
					file_num: '',
					quality: ''
				},
				content:{
					dead_code: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
							]
					},
					copy_code: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
								]
					},
					simple_code: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
								]
					},
					static_code: {
						label: '',
						score: '',
						detail: [
									{
										rep: '',
										content: []
									}
								]
					}
				}
			},
			//代码统计
			countCode: {
				summary: {
					line_count: '',
					comment_count: '',
					function_count: '',
					file_count: ''
				},
				content: {
					pkg: [],
					pkg_line_count: [],
					pkg_comment_count: [],
					pkg_function_count: [],
					file: [],
					file_line_count: [],
					file_comment_count: [],
					file_function_count: []

				}
			},
			//圈复杂度
			codeSmell: {
				summary: {
					cyclo_avg: '',
					cyclo_high: '',
					cyclo_grave: ''
				},
				content: {
					percentage: {'1-15': 0,'15-50': 0,'50+': 0},
					pkg: [],
					cyclo: [],
					list: [{path: '', cyclo: 0}]

				}
			}    
		}