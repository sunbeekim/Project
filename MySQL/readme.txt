DB접근을 위한 포트포워딩 해야합니다.
공인IP주소 :
DB 이름:
DB ID:
DB PW:


DB 정규화.excel

DB Query.sql
(DB작업하신 뒤 항상 저장하고 여기에 복사본 넣기)
(TALBE 생성 쿼리문)
(SPRING에서 사용할
select * 
from T      

insert into T (C1, C2...)
values(C1data, C2data...)...; 

update T 
set C O C*1.0
where C O n; -- 조건없이는 where절 미사용 

delete from T
where C O n; 

create table T (
C1 int,
C2 varchar(50)
);  

alter table T-- 데이터타입변경
modify C V(); 

drop table T 

truncate table T 

등 사용예시 만들어야 합니다.
예를 들어

클라이언트(리액트)에서 Spring으로 조회요청이
오는데 userid가 가지고 있는 휴대폰의 번호를 출력해야 한다고 합니다.

그럼 userid가 가지고 있는 휴대폰번호를 찾기위해
휴대폰 번호가 있는 테이블과 조인해서 쿼리를 만들어서
Spring 담당자에게 알려줘야 합니다.

userid가 primary key로 있는 테이블 users
userid가 foregin key로 있는 테이블 userdata

users 테이블 어트리뷰트(속성)
id / userid / userpw / username 
userdata 테이블 어트리뷰트(속성)
id / userid / phone / email

나중에는 테이블이 어느정도 많아지면
DB 테이블 구조도 만들어야합니다.
(table 들이 생성되면 구조도)

