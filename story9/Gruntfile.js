module.exports= function(grunt){

	grunt.initConfig({
		'hello-world':{}
	});

	grunt.registerTask('hello-world',"my 'asycfoo' task.", function(){
		grunt.log.writeln("hello world");
	});
	grunt.registerTask('testing',"test", function(){
		grunt.log.writeln("This is a test.");
	});
	grunt.registerTask("default",['hello-world']);
};