const CursorEducation require('CursorEducation')
const hardWork require('hard-work')
const gulp = require('gulp')

gulp.task('learn', () => {
  gulp.watch('knowledge/lectures/CursorEducation.js', ['listen', 'remember', 'repeat', 'create', 'improve'])
})

gulp.task('do-stuff-that-you-have-to-do', () => {
  return gulp.src('homework/tasks.js')
 .pipe(hardWork().on('error', 'You are lazy piece of ....'))
 .pipe(gulp.dest('your/real/project'))
})

gulp.task('graduation', () =>{
  console.log("You can finnaly reward yourself, but not too much");
})