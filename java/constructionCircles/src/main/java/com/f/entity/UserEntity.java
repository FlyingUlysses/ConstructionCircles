package com.f.entity;

import java.io.Serializable;

/**
 * user
 * @author 
 */
public class UserEntity implements Serializable {
    private Integer id;

    /**
     * 名称
     */
    private String name;

    /**
     * 性别 1为男，0为女
     */
    private Integer gender;

    /**
     * 微信id
     */
    private String wechatId;

    /**
     * 手机号码
     */
    private Integer phone;

    /**
     * 用户类型  0为客户 1为工作人员 2为管理员
     */
    private Integer type;

    /**
     * 职业
     */
    private String profession;

    /**
     * 技能
     */
    private String skill;

    /**
     * 状态 0为异常 1为正常
     */
    private Integer state;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getWechatId() {
        return wechatId;
    }

    public void setWechatId(String wechatId) {
        this.wechatId = wechatId;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}