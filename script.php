<?php
// 데이터베이스 연결 설정
$host = 'localhost';
$dbname = 'mydatabase';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 데이터베이스에서 데이터 가져오기
    $stmt = $pdo->query('SELECT * FROM my_table');
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // JSON 형식으로 데이터 출력
    header('Content-Type: application/json');
    echo json_encode($data);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>
