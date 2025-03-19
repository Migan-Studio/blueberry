import 'dotenv/config'

function getConfigValue(
  value: 'BOT_TOKEN' | 'BOT_OWNER_ID' | 'API_OPENDICT',
) {
  const configValue = process.env[value]
  if (!configValue)
    throw new Error(`.env 파일에서 ${value}값을 찾을 수 없어요.`)
  return configValue
}

export class Config {
  public readonly bot = {
    token: getConfigValue('BOT_TOKEN'),
    owner_ID: getConfigValue('BOT_OWNER_ID'),
  }

  public readonly api = {
    opendict: getConfigValue('API_OPENDICT')
  }

  public readonly database_url = process.env.DATABASE_URL!
}
