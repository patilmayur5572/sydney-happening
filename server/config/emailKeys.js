module.exports = {
    /**
     * ###Important###
     * The keys here has been hidden for security purpose
     * ###############
     * 
     * Keys for using the email services. 
     * host: the smtp server providing email service 
     * port: the port number to be used for the service, 465 for secured email services with OAuth2 authentication
     * secure: boolean, true for port 465, else false. 
     * type: denotes the type of authentication used.
     * user: the email address which wouold be used to send the email. 
     * clientId: The id of the email address generated for authentication
     * clientSecret: client secret generated for authentication
     * accessToken: used to access the email services, if using OAuth2 for gmail smtp then accessToken is needed. 
     * refreshToken: This is used to update the accessToken once it has been expired.
     * expires: time in seconds when the accessToken expires. 
     */    
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,   
    type: 'OAuth2',
    user: 'sydneyhappening@gmail.com',
    clientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', //This is commented for security purpose
    clientSecret: 'XXXXXXXXXXXXXXXXXX', //This has been commented for security reasons
    refreshToken: '1/Ddmr-o82-cia431t1bCXFVuA9EcEgEXOl5TT4D9gjHQ',
    accessToken: 'ya29.GlswBlvQ82Q6fWz3glirdBSRfOOKGx6PFC5aMA9w1Hx9Vclu0MTsd1r16M9xeWcf2ZrEr8ii_aEYAWJuc0fld0rnaaHo6SFAX-5WwxLTmxL5ciOhoOEfrSMZbllz',
    expires: 3600
}