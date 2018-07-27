package com.f.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.f.dao.UserDAO;
import com.f.entity.UserEntity;

@Service
public class UserService {
	
	@Autowired
	private UserDAO userDao;
	
	/**
	 * @author: WangYong 
	 * @return 
	 * @date:   2018年7月27日
	 * @Description:根据id查询用户
	 */
	public UserEntity getUserById(Integer id) {
		return userDao.selectByPrimaryKey(id);
	}
	
	/**
	 * @author: WangYong 
	 * @date:   2018年7月27日
	 * @Description:根据用户类型标识查询用户列表
	 * 0 为用户   1为伙伴员工  2为管理员
	 */
	public List<UserEntity> ListUser(Integer type) {
		return userDao.ListUserByType(type);
	}
	
	
	
}
