package com.f.controller.weChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.f.entity.UserEntity;
import com.f.service.UserService;

/**
 * @ClassName:  LoginController   
 * @author: WangYong 
 * @date:   2018年7月27日
 * @Description:登录
 */
@Controller("weChat_Controller")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@ResponseBody
	@RequestMapping("/index")
	public UserEntity index() {
		UserEntity userById = userService.getUserById(1);
		return userById;
	}
	
}
