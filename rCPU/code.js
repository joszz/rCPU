var cpuDataSets = [];

$(function() {
	$("#status").text("");
	get_cpu_use();
	setInterval("get_cpu_use()", 1000);

	var timeline = new SmoothieChart(
  	{
		millisPerPixel: 80,
     	grid:
     	{
        	strokeStyle: '#555555',
        	verticalSections: 4 
     	}
  	});
});

function get_cpu_use()
{
   $.ajax({
		url: "cpu.api",
		type: "post",
		data: { counter:"0" }
	}).done(function(cpu_info)
	{
    	$("#cpuinfo").text(cpu_info[0]+"% ("+(cpu_info.length-1)+" CPU)");       
     	var needs_init = 0;
    	if (cpuDataSets.length==0)
    	{
        	needs_init = 1;
        	for (var n=cpu_info.length-1; n>=0; n--)
            {
                cpuDataSets.push(new TimeSeries());
            }
    	}
    	for (var n=0; n<cpu_info.length; n++)
    	{
    		cpuDataSets[n].append(new Date().getTime(), cpu_info[n]);
        	if (needs_init == 1)
            {
        		initChart(n);
        	}
      	}
	});
}

function initChart(cpuId)
{
  var seriesOptions;
  if (cpuId==0)
  {
    seriesOptions =
    { 
      strokeStyle: 'rgba(255, 0, 0, 1)',
      fillStyle: 'rgba(255, 0, 0, 0.2)',
      lineWidth: 3
    };
  }
  else
  {
    seriesOptions =
    { 
     strokeStyle: 'rgba(0, 0, 255, 1)',
     fillStyle: 'rgba(0, 0, 255, 0.2)',
     lineWidth: 2
    };
  }
  var timeline = new SmoothieChart(
  {
     labels: {disabled: true},
     maxValue: 103,
     minValue: -3,
     millisPerPixel: 80,
     grid:
     {
        strokeStyle: '#555555',
        lineWidth: 1,
        millisPerLine: 1000,
        verticalSections: 4 
     }
  });
  timeline.addTimeSeries(cpuDataSets[cpuId], seriesOptions);
  timeline.streamTo($('#cpu'+cpuId)[0], 1000);
}
