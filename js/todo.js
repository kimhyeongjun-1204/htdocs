const today = new Date();
const year = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
const todayDay = String(today.getDate()).padStart(2, '0');
let dateValue = `${year}-${todayMonth}-${todayDay}`;


window.onload = function () {
    var date = document.querySelector("#select_day");
    /* 자동으로 Date 태그에 일자 적기 */
    var month = document.querySelector("#month");
    var dayofmonth = document.querySelector("#dayofmonth");
    date.value = dateValue;

    var dateTransfer = new Date(date.value);
    const getMonth = dateTransfer.getMonth() + 1;
    const getDate = dateTransfer.getDate();
    month.textContent = getMonth;
    dayofmonth.textContent = getDate;

    /* 사용자 입력 값 불러들이기 */
    const url = 'http://localhost:1103/pracs';

    /* 할일 리스트 저장  */
    axios.get(url)
        .then(response => {
            const datas = response.data;
            let finds = 0; 
            const listArray = document.querySelectorAll(".list"); 

            datas.forEach((data, index) => {
                const date = (data.date).toString();
                const month = Number(date.slice(5, 7));
                const day = Number(date.slice(8, 10));

                if (month === getMonth && day === getDate) {
                    listArray.forEach((list, index) => {
                        list.value = data[`todo` + index]; 
                    })
                    finds = 1; 
                }
            });
            if(finds === 0) {
                for(list of listArray) {
                    list.value = ""; 
                }
            }
        })
        .catch(error => {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
            }
            else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

    var day = dateTransfer.getDay(); /* 요일 표시 */

    // 요일부분에 동그라미 이미지 넣기 
    for (var i = 0; i < 7; i++) {
        var getDayTagAll = document.querySelector("#week" + i);
        getDayTagAll.style.border = "none";
        getDayTagAll.style.backgroundImage = "none";
    }
    var getDayTag = document.querySelector("#week" + day);
    getDayTag.style.backgroundImage = "url('/img/dayselect.png')";
    getDayTag.style.backgroundSize = "cover";
    getDayTag.style.backgroundPosition = "center";

    getDayTag.style.opacity = "0.7";
}

/* 체크 여부에 따라 사용자 입력 값(id = todo + i)에 줄 긋기  */
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var textTags = document.querySelectorAll('input[type="text"]');

checkboxes.forEach((checkbox, idx) => {
    checkbox.addEventListener('change', function (event) {
        if (event.target.checked) {
            textTags[idx].style.textDecoration = 'line-through';
        } else {
            textTags[idx].style.textDecoration = 'none';
        }
    });
});


/* ----------2. 이벤트 추가 코드 -------------- */

/* 행 추가*삭제  */
var index = 4; /* 추가될 인덱스 */

var btnAdd = document.querySelector("#add");
var btnDelete = document.querySelector("#delete");
var btnSend = document.querySelector("#send");

var month = document.querySelector("#month");
var dayofmonth = document.querySelector("#dayofmonth");
var select = document.querySelector("#select_day");

var selectValue = select.value;
var selectDays = new Date(selectValue);

function addTodo() {
    if (index === 7) {
        alert('더이상 추가할 수 없습니다.');
        return;
    }
    var obj = document.querySelector("#todo" + index);
    obj.style.display = "flex";
    index++;
}

function deleteTodo() {
    if (index === 1) {
        alert('더이상 삭제할 수 없습니다.');
        return;
    }
    index--;
    var obj = document.querySelector("#todo" + index);
    obj.style.display = "none";
}

/* 일자 선택 변경되면 같이 변경되게  */
function dayChange() {
    dateValue = select.value;
    window.onload();
}

function save() {
    alert('저장되었습니다.'); 
}

btnAdd.addEventListener('click', addTodo);
btnDelete.addEventListener('click', deleteTodo);
select.addEventListener('change', dayChange);
btnSend.addEventListener('click', save); 



