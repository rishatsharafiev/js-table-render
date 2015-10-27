// data for putting
var data = {
    "Alphabetic" : ['abc', 'dba', 'ecd', 'cut', '001', 'eof'],
    "Numeric" : [20, 8, 6, 4.2, 0, 2],
    "date" : ['2008-11-24', '2004-03-01', '1979-07-23', '1492-12-08', '1601-08-13', '1979-07-23'],
    "Unsortable": ['This', 'Column', 'Cannot', 'be', 'sorted', 'never']
}

Object.defineProperty(data, 'unsortable', {
    value: ['Unsortable'], 
    enumerable: false
});

Object.defineProperty(data, 'sorted', { 
    value: {},
    enumerable: false
});

// &#8595;
// &#8593;

// stuff
var maxColumns = getMaxColumns(data) + 1;
var maxRows = data.length;



// functions
function createTag(type, parent, content, id, sorted) {
    content = (content === undefined) ? '' : content;
    var element =  document.createElement(type);
    element.innerHTML = content;
    if(id) element.id = id;
    parent.appendChild(element);
    return element;
}

/*
function addIcon(elem, sorted) {
    if(sorted[elem.id] == 'down') elem.value = elem.value + ' &#8595';
    else elem.value = elem.value + ' &#8593';
}
*/

function addIcon(elem, list, sorted) {
    if(isSortable(elem.id, list)) {
        if(sorted === 'down') elem.innerHTML = elem.innerHTML + ' &#8593';
        else elem.innerHTML = elem.innerHTML + ' &#8595';
    }
}

function getMaxColumns(list) {
    var maxColumns = 0;

    for(var i in data) {
        if (maxColumns < list[i].length) {
            maxColumns = list[i].length;
        }
    }

    return maxColumns; 
}

function fillTable(table , list) {
    for(var i = 0; i < maxColumns; i++) {
        var tr = createTag('tr', table, '');
        for(var j in list) {
            if(i === 0) {
                createTag('td', tr, j, j);
                continue;
            }
            createTag('td', tr, list[j][i-1]);
        }
    }
}

function isSortable(member, list) {
    for(var i = 0, len = list.length; i < len; i++) {
        if(member == list[i]) return false;
    }
    
    return true;
}

// calls
window.onload = function () {

    fillTable(createTag('table', document.body), data);

    var first_tr = document.getElementsByTagName('tr')[0];

    first_tr.addEventListener('click', boot);
    function boot(e) {
        var e = e || window.e,
            target = e.target || e.srcElement,
            sortable = isSortable(target.id, data.unsortable),
            table = document.getElementsByTagName('table')[0],
            sorted = data.sorted[target.id];

        if(sorted !== 'up' && sortable) {
            data[target.id].sort(function(a, b) {
                if(a > b) return true;
                else return false;
            });
            data.sorted[target.id] = 'up';
        } else if (sorted === 'up' && sortable) {
            data[target.id].sort(function(a, b){
                if(a < b) return true;
                else return false;
            });
            data.sorted[target.id] = 'down';
        }

        table.parentNode.removeChild(table);

        fillTable(createTag('table', document.body), data);
        //addIcon(target, data.sorted);
        var table =  document.getElementsByTagName('table')[0];
        var first_tr = document.getElementsByTagName('tr')[0];

        var elem = document.getElementById(target.id);

        addIcon(elem, data.unsortable, data.sorted[target.id]);
        first_tr.addEventListener('click', boot);
    }
}