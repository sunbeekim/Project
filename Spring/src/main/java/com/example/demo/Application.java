package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import com.example.demo.controller.PostController;
import com.example.demo.model.Post;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        //SpringApplication.run(Application.class, args);
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        
        // 컨트롤러를 통한 테스트
        testPostController(context);
    }
    
    private static void testPostController(ConfigurableApplicationContext context) {
        PostController postController = context.getBean(PostController.class);
        
        try {
            // 테스트용 게시글 데이터 생성
            Post testPost = new Post();
            testPost.setPostId("test");
            testPost.setTitle("테스트 게시글");
            testPost.setContent("이것은 테스트 게시글입니다.");
            testPost.setForename("테스터");
            
            // 컨트롤러를 통한 게시글 생성 및 조회 테스트
            postController.createPost(testPost);
            
        } catch (Exception e) {
            System.err.println("컨트롤러 테스트 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
