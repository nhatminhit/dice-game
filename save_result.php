<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $name = $data['name'];
    $dice = $data['dice'];

    $file = 'results.json';
    $jsonData = [];
    $newId = 1;

    if (file_exists($file)) {
        $jsonData = json_decode(file_get_contents($file), true);
        if (!empty($jsonData)) {
            $lastEntry = end($jsonData);
            $newId = $lastEntry['id'] + 1;
        }
    }

    $result = [
        'id' => $newId,
        'name' => $name,
        'dice' => $dice
    ];

    $jsonData[] = $result;

    if (file_put_contents($file, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>