module.exports = {
    default: `--require-module esbuild-register --require './config/**/*.js' --require './steps/**/*.js' './features/**/*.feature'   --format html:./reports/cucumber_report.html`,
};