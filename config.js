module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 1440 * 2, // Tiempo que la sesión está activa, al acabar perderemos nuestro token de acceso y deberemos loguearnos una vez (POR DEFECTO = 60*60 : 1h) ahora mismo son 2 semanas
    roles: {
        USER: 'usuario',
        ADMIN: 'admin'
    },
    categorias: {
        ADULTO: 'ADULTO',
        INFANTIL: 'INFANTIL'
    }
}