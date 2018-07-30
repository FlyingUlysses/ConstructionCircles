package com.f.controller.manager;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.f.pojo.CommonResponsePojo;
import com.f.service.UserService;
import com.f.utils.Constants;

@Controller("ManagerController")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/manager/login.ws")
	public ModelAndView login(ModelAndView mav) {
		mav.setViewName("/manager/index");
		return mav;
	}
	
	@ResponseBody
	@RequestMapping("/manager/index.ws")
	public CommonResponsePojo login(HttpSession session,Integer id) {
		session.setAttribute(Constants.LOGIN_SYS, 1);
		CommonResponsePojo res = new CommonResponsePojo();
		res.setObj(userService.getUserById(1));
		res.setMsg("查询成功!");
		res.setResult(true);
		return res;
	}
	
	@ResponseBody
	@RequestMapping("/manager/aaa")
	public String aaa() {
		return "aaa";
	}
	
}
