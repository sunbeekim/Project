package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Post;
import com.example.demo.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping
	public ResponseEntity<String> createPost(@RequestBody Post post) {
		try {
			postService.createPost(post);
			return ResponseEntity.ok("게시글이 성공적으로 생성되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("게시글 생성 실패: " + e.getMessage());
		}
	}

//	@GetMapping("/delete/{id}")
//	public ResponseEntity<String> deletePost(@PathVariable int id) {
//		try {
//			postService.deletePost(id);
//			return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body("게시글 삭제 실패: " + e.getMessage());
//		}
//	}

//	@GetMapping("/select/{postId}")
//	public ResponseEntity<?> getPost(@PathVariable String postId){
//		try {
//			Post post = postService.selectPost(postId);
//			if(post != null) {
//				return ResponseEntity.ok(post);
//			}else {
//				return ResponseEntity.notFound().build();//게시글을 찾을 수 없을 때
//			}
//		}catch(Exception e){
//			return ResponseEntity.badRequest().body("게시글 조회 실패: " + e.getMessage());
//
//		}
//		
//     }
}

