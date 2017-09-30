# Promisify

This is only a study project, if yoy want a promisify function, you can use the *util.promisify* available in nodejs 8.0+ or the polyfill [util.promisify](https://www.npmjs.com/package/util.promisify).

## Install

    npm install


## Running tests

To execute tests, run:

    npm test
    
To execute tests and watch the files, run:

    npm run test:watch
    

## Usage

    const promisify = require('./promisify')
    const myMethodAsync = promisify(myMethodSync)

    myMethodAsync()
        .then(...)
        .catch(...)
        

## License

This project is licensed under the terms of the [WTFPL license](LICENSE.md).