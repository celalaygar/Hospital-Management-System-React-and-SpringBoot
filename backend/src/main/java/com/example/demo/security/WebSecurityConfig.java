package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//@EnableWebSecurity
public class WebSecurityConfig /* extends WebSecurityConfigurerAdapter */{
//
//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        //Cross-origin-resource-sharing: localhost:8080, localhost:4200(allow for it.)
//        http.cors().and()
//                .authorizeRequests()
//                //These are public paths
//                .antMatchers("/resources/**",  "/error", "/api/user/**").permitAll()
//                //These can be reachable for just have admin role.
//                .antMatchers("/api/admin/**").hasRole("ADMIN")
//                //All remaining paths should need authentication.
//                .anyRequest().fullyAuthenticated()
//                .and()
//                //logout will log the user out by invalidated session.
//                .logout().permitAll()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST"))
//                .and()
//                //login form and path
//                .formLogin().loginPage("/api/user/login").and()
//                //enable basic authentication
//                .httpBasic().and()
//                //We will handle it later.
//                //Cross side request forgery
//                .csrf().disable();
//
//        //jwt filter
//        http.addFilter(new JWTAuthorizationFilter(authenticationManager(),jwtTokenProvider));
//    }
//
//
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//    }
//
//    //Cross origin resource sharing.
//    @Bean
//    public WebMvcConfigurer corsConfigurer(){
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
//            }
//        };
//    }
}