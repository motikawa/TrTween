#無視するファイル名を正規表現で
IGNORE_FILES = [
  '^\\..'         #先頭がドットから始まる隠しファイルや隠しディレクトリ
  '^Cakefile$'    #このファイル
  '^Thumbs.db$'   #Windowsが生成するサムネイルファイル
  '^_notes$'      #DreamWeaverデザインノート
  '^.mno$'        #DreamWeaverデザインノートファイル
  '^Templates$'   #DreamWeaverテンプレートディレクトリ
  '^Library$'     #DreamWeaverライブラリディレクトリ
  '.dwt$'         #DreamWeaverテンプレートファイル
  '.lbi$'         #DreamWeaverライブラリファイル
#  '.fla$'         #Flashファイル
#  '.fw.png$'      #FireWorksファイル
#  '.psd$'         #PhotoShopファイル
#  '.ai$'          #Illustratorファイル
#  '.tmp$'         #一時ファイル
]
COMMAND_PATH = '/opt/local/node_modules/coffee-script/bin/'
project_files = [
	{outfile:"./public_html/TrTween.js",
	minfile:"./public_html/TrTween.min.js",
	dir:"./jp/contents/TrTween/",
	order:[
		"../util/Application.coffee",
		"TrTweenCore.coffee",
		"LinkedList.coffee",
		"Render.coffee",
		"DOMWrappers.coffee"
		"PropertyMapper.coffee",
		"ITween.coffee",
		"BasicTween.coffee",
		"DelayTween.coffee",
		"BezierTween.coffee",
		"RepeatTween.coffee",
		"ParallelTween.coffee",
		"SerialTween.coffee",
		"EasingTween.coffee",
		"FuncTween.coffee",
		"PropertyTween.coffee",
		"TransitionTween.coffee",
		"AnimationTween.coffee",
		"TrTween.coffee"
	]}
]
{exec} = require 'child_process'
path = require("path")
fs   = require("fs")
ugl  = require("uglify-js")

task 'build', 'webソースをbuildします。', (options) ->
	init = ->
		return
	run = ->
		for val in project_files
			p = val.dir
			console.log p
			if path.existsSync(p)
				files = fs.readdirSync(p)
				coffeefiles = []
				if val.order
					for f,i in val.order
						coffeefiles.push("#{p}/#{f}")
				else

					for f,i in files
						if path.extname("#{p}/#{f}") is ".coffee"
							coffeefiles.push("#{p}/#{f}")
				val.command = "#{COMMAND_PATH}coffee  -cj #{val.outfile} #{coffeefiles.join(" ")}"
				console.log "実行 #{val.command}"
				exec val.command,(err,stdout,stderr)=>
					console.log stdout,stderr
					if val.minfile
						infile = fs.readFileSync(val.outfile)
						outfile = fs.createWriteStream(val.minfile)
						ast = ugl.parser.parse(infile.toString())
						ast = ugl.uglify.ast_mangle(ast);
						ast = ugl.uglify.ast_squeeze(ast);
						finalCode = ugl.uglify.gen_code(ast);
						outfile.write(finalCode);
				
	init()
	run()
	return

