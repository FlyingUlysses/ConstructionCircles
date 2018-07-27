package com.f.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.f.dao.UserDAO;
import com.f.entity.PageResultEntity;
import com.f.entity.UserEntity;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

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
	public PageResultEntity<UserEntity> ListUser(Integer type) {
		PageHelper.startPage(1, 10, "id desc");
		List<UserEntity> listUserByType = userDao.ListUserByType(type);
		PageResultEntity<UserEntity> pageResultEntity = new PageResultEntity<UserEntity>(listUserByType);
		return pageResultEntity;
	}
	
	
	
}
