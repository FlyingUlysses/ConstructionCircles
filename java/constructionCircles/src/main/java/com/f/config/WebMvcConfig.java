package com.f.config;

import javax.annotation.Resource;

import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * @ClassName:  WebMvcConfig   
 * @author: WangYong 
 * @date:   2018年7月27日
 * @Description:TODO
 */
@EnableWebMvc
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
	
	@Resource
	private ManagerInterceptor managerInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//自定义拦截器，添加拦截路径和排除拦截路径 
		registry.addInterceptor(managerInterceptor).addPathPatterns("/api/**").excludePathPatterns("/manager/login.ws");
	}
	
	/**
	 * @author: WangYong 
	 * @date:   2018年7月27日
	 * @Description:静态资源配置
	 */
	@Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX+"/static/");
	    registry.addResourceHandler("/templates/**").addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX+"/templates/");
	    super.addResourceHandlers(registry);  
    }

	
}
