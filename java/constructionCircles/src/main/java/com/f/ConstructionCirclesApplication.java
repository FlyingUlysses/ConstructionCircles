package com.f;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@MapperScan("com.f.dao")
@SpringBootApplication
@EnableWebMvc
public class ConstructionCirclesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConstructionCirclesApplication.class, args);
	}
}
