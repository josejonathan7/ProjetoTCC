import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUser {
    
    async handleAuthenticate(){
        const authenticareService = new AuthenticateUser
        const authenticate = await authenticareService.handleAuthenticate()
    }
}

export { AuthenticateUser }