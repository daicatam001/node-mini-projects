# Authenticated front

Basic flow of sigup, login, reset password

 - Sign in/ sign up
   - hashed password before saving to database
   - return token and refresh token after sign in or sign up
   - access token expires after 5 minutes and refresh token expires after 24 hours
   - using refresh token to refresh access token when expired and expanding expire time of refresh token
 - Forgot password
   - using email to reset password
   - sending reset password link to the email
   - reset password link expire after 30 minutes
