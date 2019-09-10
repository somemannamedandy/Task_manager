$(document).ready(rRow(),$('#dateRequest').val(getToday()));/*sets today as default value*/
$('#addTask').click(function(){addTask();});/* calls function add task */
/*update task*/
updateTask();
save();