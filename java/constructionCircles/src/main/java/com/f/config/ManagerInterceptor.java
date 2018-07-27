package com.f.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.f.utils.Constants;

@Component
public class ManagerInterceptor implements HandlerInterceptor{
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
//		SimpleDateFormat format = new SimpleDateFormat("dd HH:mm:ss");
//		 if (handler instanceof HandlerMethod) {
//	              StringBuilder sb = new StringBuilder(1000);
//	              HandlerMethod h = (HandlerMethod) handler;
//	              sb.append("time: ").append(format.format(new Date())).append("\n");
//	              sb.append("Controller: ").append(h.getBean().getClass().getName()).append("\n");
//	              sb.append("Method    : ").append(h.getMethod().getName()).append("\n");
//	              sb.append("Params    : ").append(getParamString(request.getParameterMap())).append("\n");
//	              sb.append("URI       : ").append(request.getRequestURI()).append("\n");
//	              System.out.println(sb.toString());
//	          }
		if(session.getAttribute(Constants.LOGIN_SYS) ==null) {
			response.sendRedirect("/manager/login.ws");
			return false;
		}
			return true;
	}
	
//    private String getParamString(Map<String, String[]> map) {
//         StringBuilder sb = new StringBuilder();
//         for(Entry<String,String[]> e:map.entrySet()){
//             sb.append(e.getKey()).append("=");
//             String[] value = e.getValue();
//             if(value != null && value.length == 1){
//                sb.append(value[0]).append("\t");
//            }else{
//                 sb.append(Arrays.toString(value)).append("\t");
//             }
//         }
//        return sb.toString();
//     }

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}
	
}
