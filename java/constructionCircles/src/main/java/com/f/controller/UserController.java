package com.f.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.f.entity.UserEntity;
import com.f.service.UserService;

/**
 * @ClassName:  UserController   
 * @author: WangYong 
 * @date:   2018年7月27日
 * @Description:用户类入口
 */
@RequestMapping("user")
@Controller
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/**
	 * @author: WangYong 
	 * @date:   2018年7月27日
	 * @Description:获取从业人员列表
	 */
	@ResponseBody
	@RequestMapping("listEmployee")
	public List<UserEntity> ListEmployee() {
		return userService.ListUser(1);
	}
	
}
