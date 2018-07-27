package com.f.pojo;

/**
 * @ClassName:  MessagePojo   
 * @author: WangYong 
 * @date:   2018年7月27日
 * @Description: 常用返回结果类
 */
public class CommonResponsePojo {
	
	private Boolean result;
	
	private String msg;
	
	private Object obj;

	public Boolean getResult() {
		return result;
	}

	public void setResult(Boolean result) {
		this.result = result;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}
	
}
