module.exports = {
    default: {
        requireModule: ["esbuild-register"],
        require: ['./config/**/*.ts', './steps/**/*.ts'],
        paths: ['./features/**/*.feature'],
        format: ["html:./reports/cucumber_report.html"],
        parallel: 4
    },
};