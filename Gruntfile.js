'use strict';

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt); //加载所有的任务
  //require('time-grunt')(grunt); 如果要使用 time-grunt 插件

  grunt.initConfig({
    connect: {
      options: {
        port: 9000,
        hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },

      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            'app'  //主目录
          ]
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },

        files: [  //下面文件的改变就会实时刷新网页
          'app/*.html',
          'app/style/{,*/}*.css',
          'app/js/{,*/}*.js',
          'app/images/{,*/}*.{png,jpg}'
        ]
      }
    }
  });

  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);
}