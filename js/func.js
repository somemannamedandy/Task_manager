/*ADD TASK*/
function addTask() {
    var count_task = $("#TaskList").find('.taskrow').length,
        tTInput = $('#taskTitleInput').val(),
        cNInput = $('#clientNameInput').val(),
        tDInput = $('#taskDescInput').val(),
        dR = $('#dateRequest').val() ? $('#dateRequest').val() : getToday(),
        dD = $('#dateDeadline').val(),
        status = $('#status').val(),
        inputArr = [tTInput, cNInput, tDInput, dR, dD, status];
    //console.log(count_task); fix localhost overwrite rows
    /*▼▼▼TODO extract function.▼▼▼*/
    if (inputArr[0] == null || inputArr[0] == '' || typeof inputArr[0] == 'undefined') {
        return $('#errorMessage').show().text('title is required');
    }
    else if (inputArr[1] == null || inputArr[1] == '' || typeof inputArr[1] == 'undefined') {
        return $('#errorMessage').show().text('client is required');
    }
    else if (inputArr[2] == null || inputArr[2] == '' || typeof inputArr[2] == 'undefined') {
        return $('#errorMessage').text('description is required').show();
    }
    else if (inputArr[4] == null || inputArr[4] == '' || typeof inputArr[4] == 'undefined') {
        return $('#errorMessage').text('deadline is required').show();
    }
    else if (inputArr[5] == null || inputArr[5] == '' || typeof inputArr[5] == 'undefined') {
        return $('#errorMessage').text('status is required').show();
    } else if (inputArr[3] == null || inputArr[3] == '' || typeof inputArr[3] == 'undefined') {
        addRow(count_task, tTInput, cNInput, tDInput, dR, dD, status, inputArr);
    }
    else {
        addRow(count_task, tTInput, cNInput, tDInput, dR, dD, status, inputArr);
    }
    emptyInput();
}
function addRow(cnt, i1, i2, i3, i4, i5, i6, arr) {
    /*HIDE ERROR MESSAGE*/
    $('#errorMessage').hide();
    /*ADD ROW*/
    $('#TaskList').append(
        "<div class='row d-flex align-items-center justify-content-between taskrow border p-1 mx-1 my-2' id='taskrow_" + cnt + "' data-key='"+cnt+"'>" +
        /* "<div class='form-group mr-1'>"+
         "<input type='text' class='form-control form-control-sm text-capitalize rounded-0 border-0 listnr' id='listNr"+cnt+"' placeholder='Enter Client Title' value='"+cnt+"' disabled>"+
         "</div>"+*/
        "<div class='form-group mr-1'>" +
        "<input type='text' class='form-control form-control-sm text-capitalize rounded-0' id='taskTitleInput" + cnt + "' placeholder='Enter Client Title' value='" + i1 + "' param='"+cnt+"'>" +
        "</div>" +
        "<div class='form-group mr-1'>" +
        "<input type='text' class='form-control form-control-sm text-capitalize rounded-0' id='clientNameInput" + cnt + "' placeholder='Enter Client Name' value='" + i2 + "' param='"+cnt+"'>" +
        "</div>" +
        "<div class='form-group mr-1'>" +
        "<input type='text' class='form-control form-control-sm rounded-0' id='taskDescInput" + cnt + "' placeholder='Enter Task Description' value='" + i3 + "' param='"+cnt+"'>" +
        "</div>" +
        "<div class='form-group mr-1 postition-relative'>" +
        "<input type='text' class='form-control form-control-sm rounded-0' id='dateRequest" + cnt + "' placeholder='Enter date requested' value='" + i4 + "' onfocus='(this.type=\"date\")'param='"+cnt+"'>" +
        "</div>" +
        "<div class='form-group mr-1'>" +
        "<input type='text' class='form-control form-control-sm rounded-0' id='dateDeadline" + cnt + "' placeholder='Enter date deadline' value='" + i5 + "' onfocus='(this.type=\"date\")' param='"+cnt+"'>" +
        "</div>" +
        "<div class='form-group mr-1'>" +
        "<select class='form-control form-control-sm rounded-0' id='status" + cnt + "' param='"+cnt+"'>" +
        "<option value='1' >Urgent</option>" +
        "<option value='2' >In Progress</option>" +
        "<option value='3' >On Hold</option>" +
        "<option value='4' >Finished</option>" +
        "</select>" +
        "</div>" +
        "</div>"
    );
    /*SET SELECT VALUE*/
    $("#status" + cnt + " option[value=" + i6 + "]").attr('selected', 'selected');
    UpdateSColour(cnt);
    /*CHECK PARAMS*/
    /*if param 'L' ->loaded from storage*/
    /*else if !null&& array add to localstorage*/
    /*else return error*/
    if (arr === 'L') {
        console.info('Loaded row ' + cnt);
    } else if (arr != null || arr != '' && arr instanceof Array) {
        window.localStorage.setItem('row' + cnt, JSON.stringify(arr));
    } else {
        console.error('Expected array got ' + typeof arr);//if arr is not an array
    }

}
/*EMPTY INPUT FIELDS*/
function emptyInput() {
    $('#taskTitleInput').val('');
    $('#clientNameInput').val('');
    $('#taskDescInput').val('');
    $('#dateRequest').val('');
    $('#dateDeadline').val('');
    $('#status').val('');
    $('#errorMessage').val('');
}
/*GET TODAY IN YYYY-MM-DD FORMAT*/
function getToday() {
    var tDate = new Date(),
        d = tDate.getDate(),
        m = tDate.getMonth(),
        y = tDate.getFullYear();
    m += 1;
    return y + '-' + m + '-' + d;
}
/*RETRIEVE ROWS FROM LOCAL STORAGE*/
function rRow() {
    $('#TaskList').empty();
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substr(0, 3) === 'row') {
            var sArr = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            //console.log(sArr[0],sArr[1],sArr[2],sArr[3],sArr[4],sArr[5]);
            addRow(parseInt(localStorage.key(i).substr(3)), sArr[0], sArr[1], sArr[2], sArr[3], sArr[4], sArr[5], 'L');
            UpdateSColour(sArr[5]);
        }
    }
}
/*UPDATE TASKS*/
function updateTask(){
$('.taskrow').change(function(e){
    var tKey = $(this).attr('data-key'),
        tArr = new Array;

        $('#taskrow_'+tKey+' :input').map(function(){
            var type = $(this).prop("type");
            /* limit values picked up */
            if (type == "text"||type=="select-one"||type=="date") {
                return tArr.push($(this).val());
            }
        });

    for(i=0;i<tArr.length;i++){
        if(tArr[i]==null || tArr[i]=='' || tArr[i]==' ') return $('#errorMessage').text('all field are required').show();
        if(i==tArr.length-1){
            window.localStorage.setItem('row'+tKey,JSON.stringify(tArr));
            $('#errorMessage').hide();
            console.info('Task '+tKey+' was updated');
        }
    }
    //TODO confirm if updated

    //update status colour
    UpdateSColour(tKey);
   });
}
function UpdateSColour(cnt){
    /*Remove existing status color*/
    $('#taskrow_'+cnt).removeClass('border-warning border-primary border-info border-success border-white');
     /*Set status colour*/
     switch (parseInt($("#status" + cnt).val())) {
        case 1:
            $('#taskrow_' + cnt).addClass('border-warning');
            break;
        case 2:
            $('#taskrow_' + cnt).addClass('border-primary');
            break;
        case 3:
            $('#taskrow_' + cnt).addClass('border-info');
            break;
        case 4:
            $('#taskrow_' + cnt).addClass('border-success');
            break;
        default:
            $('#taskrow_' + cnt).addClass('border-white');
    }
}
/*TODO BACKUP TASKS*/
function save(){
    var tData;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substr(0, 3) === 'row') {
            tData += (localStorage.getItem(localStorage.key(i)));
            //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            //console.log(sArr[0],sArr[1],sArr[2],sArr[3],sArr[4],sArr[5]);
           
        }
    }
    console.log(typeof tData+' '+tData);
}
//$('#saveTasks').click(function(){ window.location = "data:text/plain, My Data" });