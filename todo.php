<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

// MySQL 연결 설정
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $date = $_GET['date'];// 2024-11-19
    $dateTime = new DateTime($date); 

    $dateTime->modify('+1 day'); 

    $newDate = $dateTime->format('Y-m-d'); 
    $checkbox = isset($_GET['checkbox']) ? $_GET['checkbox'] : array(); // 체크박스값 배열로 받기 
    $todo = isset($_GET['list']) ? $_GET['list'] : array(); // 할일 배열로 받기 

    // 배열 크기 확인 및 처리
    for ($i = 0; $i < 7; $i++) {
        if (isset($checkbox[$i]) && $checkbox[$i]) {
            $todo[$i] = null; 
        } else if (!isset($todo[$i])) {
            $todo[$i] = null; // 없는 값은 null로 설정
        }
    }
    
    // SQL 구문 생성
    $sql = "INSERT INTO todolist (date,todo0,todo1,todo2,todo3,todo4,todo5,todo6) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssss", $newDate, $todo[0], $todo[1], $todo[2], $todo[3], $todo[4], $todo[5], $todo[6]);

    // SQL 문 실행
    if ($stmt->execute() === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

// 헤더 리다이렉션
header("Location: index.html");
exit();
?>
