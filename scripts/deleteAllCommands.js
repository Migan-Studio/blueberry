/* eslint-disable @typescript-eslint/no-require-imports */
const { REST, Routes } = require('discord.js')
const readline = require('readline/promises')
require('dotenv/config')

const argv = require('minimist')(process.argv.slice(2), {
  string: ['id'],
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

;(async () => {
  if (!argv.y) {
    const answer = await rl.question(
      'Do you want to delete all commands? [y/N]: ',
    )

    if (answer.toLowerCase() !== 'y') {
      rl.close()
      process.exit(1)
    }
  }

  if (!process.env.BOT_TOKEN)
    throw new Error('You need a BOT_TOKEN environment.')

  if (!argv.id) throw new Error('You need a --id flag value.')

  const rest = new REST().setToken(process.env.BOT_TOKEN)

  rest.put(Routes.applicationCommands(argv.id), {
    body: {},
  })

  rl.close()
})()
