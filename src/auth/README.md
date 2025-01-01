# Authentication Flow

## Overview
이 프로젝트는 JWT(JSON Web Token)를 사용한 인증 시스템을 구현하고 있습니다. Passport.js를 기반으로 Local Strategy(로그인)와 JWT Strategy(인증)를 사용합니다.

## 인증 흐름

### 1. 로그인 프로세스
1. 클라이언트가 `/auth/login`에 email과 password를 전송
2. `LocalAuthGuard`가 요청을 가로채서 `LocalStrategy`의 validate 메서드 실행
3. `LocalStrategy`는 `AuthService.validateUser()`를 통해 사용자 검증
   - DB에서 email로 사용자 조회
   - bcrypt를 사용하여 비밀번호 검증
4. 검증 성공 시 `AuthService.login()`에서 JWT 토큰 생성
   - Payload에 `{ userId, email }` 포함
5. 생성된 JWT 토큰을 클라이언트에 반환

### 2. 인증이 필요한 요청 처리
1. 클라이언트가 Authorization 헤더에 Bearer 토큰을 포함하여 요청
2. `JwtAuthGuard`가 요청을 가로채서 `JwtStrategy`의 validate 메서드 실행
3. `JwtStrategy`가 토큰 검증 및 디코딩
4. 검증된 payload로부터 사용자 정보를 추출하여 `req.user`에 저장
5. 컨트롤러에서 `req.user`를 통해 인증된 사용자 정보 접근 가능

### 3. 권한 처리
- `@Public()` 데코레이터: 인증이 필요없는 라우트 표시
- `@Roles()` 데코레이터: 특정 역할이 필요한 라우트 표시

## 주요 컴포넌트

### Guards
- `LocalAuthGuard`: 로그인 시 사용되는 가드
- `JwtAuthGuard`: 보호된 라우트에 대한 접근을 제어하는 가드

### Strategies
- `LocalStrategy`: 사용자 이메일/비밀번호 검증
- `JwtStrategy`: JWT 토큰 검증

### Services
- `AuthService`: 사용자 검증 및 JWT 토큰 생성/관리

## 보안 특징
1. 비밀번호는 bcrypt로 해시하여 저장
2. JWT 토큰에는 민감한 정보(비밀번호 등) 미포함
3. 토큰 만료 시간 설정으로 보안 강화
4. Authorization 헤더를 통한 토큰 전송

## 사용 예시

```typescript
// 로그인이 필요한 라우트
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}

// 공개 라우트
@Public()
@Get('public')
getPublic() {
  return 'This is public';
}

// 특정 역할이 필요한 라우트
@Roles(UserRole.ADMIN)
@Get('admin')
getAdminOnly() {
  return 'Admin only';
}
```
