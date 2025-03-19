import 'dotenv/config'

export class Config {
  public readonly bot = {
    token: process.env.BOT_TOKEN!,
    owner_ID: process.env.BOT_OWNER_ID!,
  }

  public readonly api = {
    opendict: process.env.API_OPENDICT!,
  }

  public database_url = process.env.DATABASE_URL!
}
