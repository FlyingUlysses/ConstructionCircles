package com.f.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
	
	@RequestMapping("/index")
	public ModelAndView index(ModelAndView mav) {
		mav.setViewName("/index");
		return mav;
	}
	
}
