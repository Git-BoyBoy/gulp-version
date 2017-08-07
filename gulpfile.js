'use strict';
var gulp = require('gulp'),//加载gulp包
	assetRev = require('gulp-asset-rev'),//添加文字图片hash值
	rev = require('gulp-rev'),//添加css/js版本号到.json文件中
	revCollector = require('gulp-rev-collector'),//添加html中css、js版本号
	runSequence = require('run-sequence');//按顺序执行任务
	
	//添加文字图片hash值
	gulp.task('assetRev',function(){
		return gulp.src('develop/css/*.css')
			   .pipe(assetRev())
			   .pipe(gulp.dest('dest/css/'));
	});
	
	//添加css版本号到.json文件中
	gulp.task('revCss',function(){
		return gulp.src('develop/css/*.css')
			   .pipe(rev())
			   .pipe(rev.manifest())
			   .pipe(gulp.dest('dest/rev/css'));
	});
	
	//添加js版本号到.json文件中
	gulp.task('revJs',function(){
		return gulp.src('develop/js/*.js')
			   .pipe(rev())
			   .pipe(rev.manifest())
			   .pipe(gulp.dest('dest/rev/js'));
	});
	
	//添加html中css、js版本号
	gulp.task('revCollector',function(){
		return gulp.src(['dest/rev/**/*.json','develop/*.html'])
			   .pipe(revCollector())
			   .pipe(gulp.dest('dest/'));
	});
	
	//按顺序执行任务
	gulp.task('runSequence',function(done){
		runSequence(
			['assetRev'],
			['revCss'],
			['revJs'],
			['revCollector'],
		done);
	});
