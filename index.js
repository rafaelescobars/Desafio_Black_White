const yargs = require('yargs')
// Paso 1
const child = require('child_process')

// Paso 2
const key = 123
const argv = yargs
  .command(
    // Paso 3
    'Acceso',
    // Paso 4
    'Comando para acceder', {
      // Paso 6
      key: {
        describe: 'Contraseña',
        demand: true,
        alias: 'k',
      },
    },
    (args) => {
      // Paso 7
      args.key == key ? // Paso 8
        child.exec('node server.js', (err, stdout) => {
          err ? console.log(err) : console.log(stdout)
        }) : // Paso 9
        console.log('Key incorrecta')
    }
  )
  .help().argv