# DNA: Doctors Nexus Amity Web app
The Official repo of DNA web app designed and developed by Dr. Aghosh

## Features
- Authentication: JWT Http-only cookie
- Design System: 2 Tier
- User registration & OTP verification

## Frontend
- React Ts Vite with Shadcn components
- Dark mode available
- Auto login: uses localstorage to trigger JWT authentication if user has signed in with same client before and not signed out
- User profile and Dashboard - user edit some data.
- OTP verification via email (phone available in backend but not enabled since twilio is not free)

<img src="assets/sm_1.png" alt="Image 1" width="200"/><img src="assets/sm_2.png" alt="Image 1" width="200"/>
<img src="assets/sm_3.png" alt="Image 1" width="200"/><img src="assets/sm_5.png" alt="Image 1" width="200"/>
<img src="assets/sm_1d.png" alt="Image 1" width="200"/><img src="assets/sm_2d.png" alt="Image 1" width="200"/>
<img src="assets/sm_3d.png" alt="Image 1" width="200"/><img src="assets/sm_5d.png" alt="Image 1" width="200"/>
<img src="assets/md_2.png" alt="Image 1" width="800"/>


## Backend
- Django with DRF, corsheaders, simplejwt, (twilio, razerpay - disabled because its not free)
- Middleware to get HTTP-Only cookies and set it as bearer token for DRF
- Signals to assign unique DNA ID for every new registration and setup user profile
- Apps
-   accounts - AbstractUser & UserProfile model with user validation logic and REST APIs
-   programs - Program & Event models with REST APIs
-   registration - Registration model with REST APIs
-   verification - OTP model with otp generation, sending, validation logic and REST APIs

### Schema of the backend:
<img src="assets/models.png" alt="Image 1" width="800"/>
