var cpuDataSets=[],windowGap=0;function get_cpu_use(){$.ajax({url:"cpu.api",type:"post",data:{counter:"0"}}).done(function(t){$("#cpuinfo").text(t[0]+"% ("+(t.length-1)+" CPU)");var e=0;if(0==cpuDataSets.length){e=1;for(var i=t.length-1;0<=i;i--)cpuDataSets.push(new TimeSeries),0<i&&($("#cpu0").after('<canvas id="cpu'+i+'" height="100" />'),$("cpu"+i)[0].width=window.innerWidth-windowGap)}for(i=0;i<t.length;i++)cpuDataSets[i].append((new Date).getTime(),t[i]),1==e&&initChart(i);1==e&&$(window).resize(function(){for(var e=0;e<t.length;e++)$("cpu"+e)[0].width=window.innerWidth-windowGap})})}function initChart(e){var t;t=0==e?{strokeStyle:"rgba(255, 0, 0, 1)",fillStyle:"rgba(255, 0, 0, 0.2)",lineWidth:3}:{strokeStyle:"rgba(0, 0, 255, 1)",fillStyle:"rgba(0, 0, 255, 0.2)",lineWidth:2};var i=new SmoothieChart({labels:{disabled:!0},maxValue:103,minValue:-3,millisPerPixel:80,grid:{strokeStyle:"#555555",lineWidth:1,millisPerLine:1e3,verticalSections:4}});i.addTimeSeries(cpuDataSets[e],t),i.streamTo($("#cpu"+e)[0],1e3)}$(function(){$("#status").text(""),$("cpu0")[0].width=window.innerWidth-windowGap,get_cpu_use(),setInterval(get_cpu_use,1e3);new SmoothieChart({millisPerPixel:80,grid:{strokeStyle:"#555555",verticalSections:4}});document.addEventListener("visibilitychange",function(){window.dispatchEvent(new Event("resize"))})});