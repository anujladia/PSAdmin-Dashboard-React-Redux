//Allowing console call here bcz this is a build files
/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from './../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';  //this ensures that Babel dev config (for hot reloading) doesn't apply.

console.log('Generatin minified bundle for production via webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if(err) { //so a fatal error occured. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const joinStats = stats.toJson();

  if(joinStats.hasErrors) {
    return joinStats.errors.map(error => console.log(error.red));
  }

  if(joinStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    joinStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  //if we got this far the build succeeded.
  console.log('Your app has been compiled to production mode and written to /dist. It\'s ready to roll!'.green);

  return 0;
});
