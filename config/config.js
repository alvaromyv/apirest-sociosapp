module.exports = {
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 60*60*60, // Tiempo que la sesión está activa, al acabar perderemos nuestro token de acceso y deberemos loguearnos una vez (POR DEFECTO = 60*60 : 1h)
    roles: {
        USUARIO: 'usuario',
        ADMIN: 'administrador'
    },
    categorias: {
        INFANTIL: 'infantil',
        JUVENIL: 'juvenil',
        ADULTO: 'adulto',
        SENIOR: 'senior'
    }
}