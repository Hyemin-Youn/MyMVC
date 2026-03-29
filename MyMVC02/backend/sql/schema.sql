-- 1. 데이터베이스 초기화
CREATE DATABASE IF NOT EXISTS mymvc02;
USE mymvc02;

-- 2. 기존 테이블 삭제 (초기화를 위해 자식 테이블부터 삭제)
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS users;

-- 3. 사용자 테이블 생성 (비밀번호 길이를 100으로 설정하여 잘림 방지)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userid VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 주소록 테이블 생성
CREATE TABLE address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  addr VARCHAR(255) NOT NULL,
  tel VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 테스트 사용자 데이터 삽입 (비밀번호: 1234)
-- 아래 값은 bcryptjs로 생성된 정확히 60글자의 해시값입니다.
INSERT INTO users (userid, password, username) 
VALUES ('admin', '$2a$10$lI5F7wsIjOTwTpeZU0nzEOFzi2zTncILa9zJ87CKQreK1s7mD0IGG', '관리자');

-- 6. 주소록 테스트 데이터 삽입
INSERT INTO address (name, addr, tel) VALUES
('홍길동', '서울시 강남구', '010-1111-1111'),
('정길동', '부산시 해운대구', '010-2222-2222'),
('박길동', '대구시 수성구', '010-3333-3333');

-- 7. 데이터 검증 (결과가 1행이 나오고, hash_length가 60이어야 정상입니다)
SELECT userid, password, CHAR_LENGTH(password) as hash_length 
FROM users 
WHERE userid = 'admin';

COMMIT;