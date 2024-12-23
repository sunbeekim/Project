<!-- Spring/src/main/resources/mapper/UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.demo.mapper.UserMapper">

    <!-- ID로 사용자 조회 -->
    <select id="findById" parameterType="long" resultType="com.example.demo.model.User">
        SELECT id, user_id, password, created_at 
        FROM users_login 
        WHERE id = #{id}
    </select>

    <!-- users_login 테이블에 사용자 삽입 -->
    <insert id="insertUser" parameterType="com.example.demo.model.User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO users_login (user_id, password)
        VALUES (#{user_id}, #{password})
    </insert>

    <!-- users_data 테이블에 사용자 데이터 삽입 -->
    <insert id="insertUserData" parameterType="com.example.demo.model.UserData">
        INSERT INTO users_data (id, forename, email, phone_number)
        VALUES (#{id}, #{forename}, #{email}, #{phone_number})
    </insert>

    <!-- 추가 가능: user_id 또는 email 중복 여부 확인 -->
    <select id="isUserIdExists" parameterType="string" resultType="boolean">
        SELECT EXISTS (
            SELECT 1 
            FROM users_login 
            WHERE user_id = #{user_id}
        )
    </select>

    <select id="isEmailExists" parameterType="string" resultType="boolean">
        SELECT EXISTS (
            SELECT 1 
            FROM users_data 
            WHERE email = #{email}
        )
    </select>

</mapper>
