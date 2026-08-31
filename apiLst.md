# DevTinder
# Using different router for understanding purpose
## authRouter
    - POST/auth/signup
    - POST/auth/login
    - POST/auth/logout
    - POST/auth/forgot-password(this cannot be done because there must be a verification to identify the user except emailId, the reset password link must sent to user email and after verification reset-password request must be done)//not done beacs
    - POST/auth/reset-password(same reason as above)

## profileRouter
    - GET/profile/view
    - PATCH/profile/edit(used for name change, no change for email)

## connectionRequestRouter
    -POST/request/send/:status/:userId
        - POST/request/send/interested/:toUserId
        - POST/request/send/ignored/:toUserId
    -POST/request/send/:status/:userId--including the status as parameter to reduce api end points
        - POST/request/review/accepted/:fromUserId
        - POST/request/review/rejected/:fromUserId

## userRouter
    -GET/user/connections
    -GET/user/requests/
    -GET/user/feed -get yhr profile of users in the platform
status: ignore,interested,accepted,rejected