	//data
		var resData = {
				"score": 37,    //首页部分的“分数”一栏
				"issueNum": 52,   //首页部分的“Issues"一栏：问题总数。
				"gotest":{        //单元测试页面的数据
					summary:{      //单元测试页面的上部分总结部分
						"code_cover": '75',     //代码覆盖率
						"pkg_cover":  '80',     //包覆盖率
						"total_time":  '0.874'    //单元测试耗时
					},
					content:{
						pkg: ["/gocode", "/gocode/dupl/output", "/gotest", "/gocode/copycode/output", "/gocode/dupl/suffixtree", "/gosimple/gotool", "/gocode/dupl/syntax", "/gocyclo", "/godep", "/gosimple/lint", "/gocode/deadcode", "/gosimple/simple"],
						time: [0.04, 0.009, 0.505, 0.008, 0.09, 0.09, 0.008, 0.01, 0.101, 0.013, 0, 0],   //每个包的耗时，位置跟pkg数组里的包相对应。
						cover: [49.4, 23.4, 65.2, 22, 90.6, 45.7, 55.8, 66.7, 70.4, 6.2, 0, 0],    //每个包的覆盖率，位置跟pkg数组里的包对应。
						no_test: ["/gocheck", "/gocheck/structcheck", "/gocheck/structcheck"]   //没有单元测试代码的包。
					}
				},
				//代码风格
				codeStyle: {
					summary: {
						issue_num: 25,
						file_num: 18,
						quality: 'A+'
					},
					content:{
						gofmt: {
							label: 'Gofmt formats Go programs. We run gofmt -s on your code, where -s is for the "simplify" command',
							score: '100%',   //这个值暂时没有用。这一版统计的是数值，不是百分比
							detail: [{
											rep: 'Sia/compatibility/siag_1.0_test.go',   //存在问题的路径
											content: [ "Line 18: warning: don't use underscores in Go names; type KeyPairSiag_1_0 should be KeyPairSiag1_0 (golint)",
													 "Line 28: warning: don't use underscores in Go names; func verifyKeysSiag_1_0 should be verifyKeysSiag1_0 (golint)"
											]  //需要显示的每一行
										},{
											rep: 'Sia/types/target.go',
											content: ["Line 24: warning: exported var ErrNegativeTarget should have comment or be unexported (golint)","Line 46: warning: receiver name t should be consistent with previous receiver name x for Target (golint)"]
										}]   
						},
						go_vet: {
							label: 'go vet examines Go source code and reports suspicious constructs, such as Printf calls whose arguments do not align with the format string.',
							score: '100%',
							detail: []   //这个部分的每个detail字段都遵循上个detail的数据格式
						},
						golint: {
							label: 'Golint is a linter for Go source code.',
							score: '80%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "Line 18: warning: don't use underscores in Go names; type KeyPairSiag_1_0 should be KeyPairSiag1_0 (golint)",
													 "Line 28: warning: don't use underscores in Go names; func verifyKeysSiag_1_0 should be verifyKeysSiag1_0 (golint)"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["Line 24: warning: exported var ErrNegativeTarget should have comment or be unexported (golint)","Line 46: warning: receiver name t should be consistent with previous receiver name x for Target (golint)"]
										}
							]
						},
						misspell: {
							label: 'Misspell Finds commonly misspelled English words',
							score: '96%',
							detail: [
										{
											rep: 'Sia/siac/walletcmd.go',
											content: [ 'Line 213: warning: "sucessfully" is a misspelling of "successfully" (misspell)'
											]
										},{
											rep: 'Sia/modules/transactionpool/update.go',
											content: ['Line 187: warning: "extermely" is a misspelling of "extremely" (misspell)'
													]
										},{
											rep: 'Sia/api/ecosystem_helpers_test.go',
											content: ['Line 47, warning: "inital" is a misspelling of "initial" (misspell)'
													]
										} 
							]
						}

					}
					
				},
				//代码优化
				goIssue: {
					summary: {
						issue_num: 85,
						file_num: 15,
						quality: 'A+'
					},
					content:{
						dead_code: {
							label: 'deadCode description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
								]
						},
						copy_code: {
							label: 'copy code description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/',
											content: ["/gocode/copycode/copycode.go:77,94",'/gocode/copycode/copycode.go:77,94']
										},{
											rep: 'type/',
											content: ['/gocode/copycode/copycode.go:77,94','/gocode/copycode/copycode.go:77,94']
										}
									]
						},
						simple_code: {
							label: 'simplecode description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
									]
						},
						static_code: {
							label: 'static code description',
							score: '85%',
							detail: [
										{
											rep: 'Sia/compatibility/siag_1.0_test.go',
											content: [ "/gocode/copycode/syntax/golang/golang.go:221,229",
													 "/gocode/copycode/syntax/golang/golang.go:255,263"
											]
										},{
											rep: 'Sia/types/target.go',
											content: ["/gocode/copycode/copycode.go:77,94",
													  "/gocode/dupl/copycode.go:77,94"]
										}
									]
						}
					}
				},
				//代码统计
				countCode: {
					summary: {
						line_count: 23412,
						comment_count: 5321,
						function_count: 555,
						file_count: 54
					},
					content: {
						pkg: ['gocode','gotest','gosimple','copycode'],
						pkg_line_count: [225,331,554,852],
						pkg_comment_count: [225,331,554,852],
						pkg_function_count: [225,331,554,852],
						file: ['file1','file2','file3','file4','file5'],
						file_line_count: [225,331,554,852],
						file_comment_count: [225,331,554,852],
						file_function_count: [225,331,554,852]

					}
				},
				//圈复杂度
				codeSmell: {
					summary: {
						cyclo_avg: 20,
						cyclo_high: 12,
						cyclo_grave: 8
					},
					content: {
						percentage: {'1-15': 20,'15-50': 25,'50+': 10},
						pkg: ['aa','bb','cc','dd','ee'],
						cyclo: [15,23,12,34,41],
						list: [{path: 'aa/bb/cc', cyclo: 88},{path: 'dd/ee/ff', cyclo: 75},{path: 'ab/cd/ef', cyclo: 60}]

					}
				}    
			}