
var error_report = new GER({
    url:'https://www.gomeplus.com/ajax/log/index?err_msg=',
    repeat:5,
    delay: 1000,
    validTime : 3,
    proxyModules: true
});
seajs.config({
    base: "./",
});
seajs.use("./js/mod1", function(report){
	report.init()
});