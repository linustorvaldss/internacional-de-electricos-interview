import jwt from 'jsonwebtoken'

export class JwtGenerator {

  static async generateToken ( payload: any, duration: jwt.SignOptions['expiresIn'] = '6h' ) {
    const secret = process.env.JWT_SEED;

    if (!secret) {
      return null;
    }

    const options: jwt.SignOptions = { expiresIn: duration };

    return new Promise(( resolve ) => {
      jwt.sign(payload, secret, options, ( err, token ) => {
        if ( err ) return resolve(null);

        resolve(token)
      })
    })
  }

  static validateToken<T> ( token : string ): Promise<T|null> {
    const secret = process.env.JWT_SEED;

    if (!secret) {
      return Promise.resolve(null);
    }

    return new Promise(( resolve ) => {

      jwt.verify(token, secret, ( err, decode ) => {
          if ( err ) return resolve(null);

          resolve( decode as T )
      })
    })
  }

}