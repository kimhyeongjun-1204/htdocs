<?php
// 데이터베이스 연결 정보 설정
$servername = "localhost";
$username = "username"; // 데이터베이스 사용자 이름
$password = "password"; // 데이터베이스 암호
$dbname = "database_name"; // 사용할 데이터베이스 이름

// POST 요청에서 사용자 입력 가져오기
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

// 데이터베이스 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 데이터베이스에 삽입할 쿼리 생성
$sql = "INSERT INTO users (firstName, lastName) VALUES ('$firstName', '$lastName')";

// 쿼리 실행 및 결과 확인
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 데이터베이스 연결 종료
$conn->close();
?>
