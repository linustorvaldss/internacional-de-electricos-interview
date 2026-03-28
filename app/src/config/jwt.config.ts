import jwt from 'jsonwebtoken'

export class JwtGenerator {

  static async generateToken ( payload: any, duration : string = '6h' ) {

    return new Promise(( resolve ) => {
      jwt.sign(payload, process.env.JWT_SEED, { expiresIn: duration }, ( err, token ) => {
        if ( err ) return resolve(null);

        resolve(token)
      })
    })
  }

  static validateToken<T> ( token : string ): Promise<T|null> {

    return new Promise(( resolve ) => {

      jwt.verify(token, process.env.JWT_SEED, ( err, decode ) => {
          if ( err ) return resolve(null);

          resolve( decode as T )
      })
    })
  }

}