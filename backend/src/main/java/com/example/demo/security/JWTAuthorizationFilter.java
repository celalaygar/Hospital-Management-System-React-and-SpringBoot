package com.example.demo.security;

//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter /* extends BasicAuthenticationFilter */{

//    private JwtTokenProvider jwtTokenProvider;
//
//    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,
//                                  JwtTokenProvider tokenProvider) {
//        super(authenticationManager);
//        jwtTokenProvider = tokenProvider;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//        Authentication authentication = jwtTokenProvider.getAuthentication(request);
//
//        if(authentication !=null && jwtTokenProvider.validateToken(request)){
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//        chain.doFilter(request, response);
//    }
}
