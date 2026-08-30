# DevTinder
# Using different router for understanding purpose
## authRouter
    - POST/auth/signup
    - POST/auth/login
    - POST/auth/logout
    - POST/auth/forgot-password
    - POST/auth/reset-password

## profileRouter
    - GET/profile/view
    - PATCH/profile/edit(used for name change, no change for email)

## connectionRequestRouter
    - POST/request/send/interested/:userId
    - POST/request/send/ignored/:userId
    - POST/request/review/accepted/:requestId
    - POST/request/review/rejected/:requestId

## userRouter
    -GET/user/connections
    -GET/user/requests/
    -GET/user/feed -get yhr profile of users in the platform
status: ignore,interested,accepted,rejected