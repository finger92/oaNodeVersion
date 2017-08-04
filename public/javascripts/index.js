function searchReset(){
    event.preventDefault();
    var inputs = document.getElementsByTagName('input');
    for(var i in inputs){
        inputs[i].value = '';
    }
    var selects = document.getElementsByTagName('select');
    for(var i in selects){
        selects[i].selectedIndex = 0;
    }
}